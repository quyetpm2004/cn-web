<?php
header('Content-Type: application/json; charset=utf-8');

date_default_timezone_set('Asia/Ho_Chi_Minh');
echo json_encode([
    'time' => date('H:i:s')
]);
?>
