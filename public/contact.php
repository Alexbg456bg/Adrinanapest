<?php
/**
 * Обработва заявките от контактната форма на сайта на "Адрина ООД".
 * Статичен хостинг (SuperHosting) без база данни — само изпраща имейл чрез mail().
 * Файлът се качва на хостинга в същата папка като build-натия сайт (dist/).
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

// Получателят на заявките.
const TO_EMAIL = 'adrinapest@gmail.com';
const MAX_FIELD_LENGTH = 800;

function fail(int $code, string $error): void
{
    http_response_code($code);
    echo json_encode(['success' => false, 'error' => $error], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'method_not_allowed');
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    fail(400, 'invalid_payload');
}

// Honeypot — ако е попълнено скритото поле, значи е бот. Връщаме "успех", без да пращаме имейл.
if (!empty($data['company'])) {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

// Маха нови редове (за да не може някой да инжектира допълнителни mail хедъри) и подрязва дължината.
function cleanField($value, int $max = MAX_FIELD_LENGTH): string
{
    $value = is_string($value) ? $value : '';
    $value = trim(preg_replace('/[\r\n]+/', ' ', $value));
    return mb_substr($value, 0, $max);
}

$name = cleanField($data['name'] ?? '', 150);
$phone = cleanField($data['phone'] ?? '', 60);
$email = cleanField($data['email'] ?? '', 150);
$service = cleanField($data['service'] ?? '', 100);
$message = cleanField($data['message'] ?? '', MAX_FIELD_LENGTH);

if ($name === '' || $phone === '' || $message === '') {
    fail(422, 'missing_required_fields');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'invalid_email');
}

$host = preg_replace('/[^a-zA-Z0-9.-]/', '', $_SERVER['HTTP_HOST'] ?? 'adrinapest.com');
$fromEmail = 'noreply@' . $host;

$subject = '=?UTF-8?B?' . base64_encode('Ново запитване от сайта — ' . ($service ?: 'ДДД услуга')) . '?=';

$bodyLines = [
    'Име: ' . $name,
    'Телефон: ' . $phone,
    'Имейл: ' . ($email !== '' ? $email : '—'),
    'Услуга: ' . ($service !== '' ? $service : '—'),
    '',
    'Съобщение:',
    $message,
];
$body = implode("\n", $bodyLines);

$headers = [
    'From: Сайт Адрина ООД <' . $fromEmail . '>',
    'Content-Type: text/plain; charset=UTF-8',
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$sent = mail(TO_EMAIL, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    fail(500, 'mail_failed');
}

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
