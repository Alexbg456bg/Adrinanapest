<?php
/**
 * Приема запитванията от контактната форма на сайта на "АДРИНА ООД" и ги
 * праща по имейл до фирмената поща. Без база данни — само mail().
 * Използва се при cPanel хостинг (билд с `npm run build:cpanel`).
 */

declare(strict_types=1);

date_default_timezone_set('Europe/Sofia');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

// Получател и подател. Подателят е реален адрес на същия домейн — така SPF/DKIM
// на хостинга важат и писмата не отиват в спам.
const TO_EMAIL = 'office@adrinapest.com';
const FROM_EMAIL = 'office@adrinapest.com';
const FROM_NAME = 'Сайт АДРИНА';

const MAX_BODY_BYTES = 20000;
const MAX_MESSAGE_LENGTH = 3000;
const MAX_PER_HOUR = 5;

function respond(int $code, array $payload): void
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(int $code, string $error): void
{
    respond($code, ['success' => false, 'error' => $error]);
}

function cut(string $value, int $max): string
{
    return function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
}

// Едноредово поле (влиза в имейл хедъри и тема): маха нови редове и управляващи знаци.
function cleanLine($value, int $max): string
{
    $value = is_string($value) ? $value : '';
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
    return cut(trim($value), $max);
}

// Свободен текст (съобщение): пази новите редове, маха останалите управляващи знаци.
function cleanText($value, int $max): string
{
    $value = is_string($value) ? $value : '';
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/u', '', $value) ?? '';
    return cut(trim($value), $max);
}

function bareHost(string $host): string
{
    $host = strtolower(trim(explode(':', $host)[0]));
    return preg_replace('/^www\./', '', $host) ?? $host;
}

// Не повече от MAX_PER_HOUR успешни запитвания на час от един IP адрес.
function tooManyRequests(string $ip): bool
{
    $file = sys_get_temp_dir() . '/adrina_contact_' . hash('sha256', $ip) . '.json';
    $now = time();
    $hits = [];
    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            foreach ($decoded as $t) {
                if (is_int($t) && $t > $now - 3600) {
                    $hits[] = $t;
                }
            }
        }
    }
    if (count($hits) >= MAX_PER_HOUR) {
        return true;
    }
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return false;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail(405, 'method_not_allowed');
}

// Заявката трябва да идва от самия сайт.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = (string) (parse_url($origin, PHP_URL_HOST) ?? '');
    if (bareHost($originHost) !== bareHost($_SERVER['HTTP_HOST'] ?? '')) {
        fail(403, 'forbidden_origin');
    }
}

$raw = (string) file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if (strlen($raw) > MAX_BODY_BYTES) {
    fail(413, 'payload_too_large');
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    fail(400, 'invalid_payload');
}

// Honeypot — скритото поле се попълва само от ботове; на тях връщаме "успех" и не пращаме нищо.
if (!empty($data['_gotcha']) || !empty($data['company'])) {
    respond(200, ['success' => true]);
}

$name = cleanLine($data['name'] ?? '', 150);
$organization = cleanLine($data['organization'] ?? '', 150);
$phone = cleanLine($data['phone'] ?? '', 60);
$email = cleanLine($data['email'] ?? '', 150);
$service = cleanLine($data['service'] ?? '', 100);
$message = cleanText($data['message'] ?? '', MAX_MESSAGE_LENGTH);

if ($name === '' || $phone === '' || $message === '') {
    fail(422, 'missing_required_fields');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'invalid_email');
}

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (tooManyRequests($ip)) {
    fail(429, 'too_many_requests');
}

$subject = '=?UTF-8?B?' . base64_encode('Ново запитване от сайта — ' . ($service !== '' ? $service : 'ДДД услуга')) . '?=';

$body = implode("\n", [
    'Ново запитване от сайта adrinapest.com',
    '',
    'Име: ' . $name,
    'Организация: ' . ($organization !== '' ? $organization : '—'),
    'Телефон: ' . $phone,
    'Имейл: ' . ($email !== '' ? $email : '—'),
    'Услуга: ' . ($service !== '' ? $service : '—'),
    'Получено: ' . date('d.m.Y H:i'),
    '',
    'Съобщение:',
    $message,
]);

$headers = [
    'From: =?UTF-8?B?' . base64_encode(FROM_NAME) . '?= <' . FROM_EMAIL . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$sent = mail(TO_EMAIL, $subject, $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);

if (!$sent) {
    error_log('contact.php: mail() не успя да изпрати запитване.');
    fail(500, 'mail_failed');
}

respond(200, ['success' => true]);
