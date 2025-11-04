<?php
header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('Asia/Ho_Chi_Minh');

$user = $_POST['user'] ?? 'Ẩn danh';
$text = $_POST['text'] ?? '';

if (trim($text) === '') {
    echo json_encode(['error' => 'Tin nhắn trống']);
    exit;
}

$file = 'messages.json';
$messages = [];

if (file_exists($file)) {
    $messages = json_decode(file_get_contents($file), true);
}

$messages[] = [
    'user' => htmlspecialchars($user),
    'text' => htmlspecialchars($text),
    'time' => date('H:i:s')
];

file_put_contents($file, json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true]);
?>
