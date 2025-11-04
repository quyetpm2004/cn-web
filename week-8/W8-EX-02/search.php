<?php
header('Content-Type: application/json; charset=utf-8');

$students = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Phạm Văn C",
    "Lê Văn C",
    "Hoàng Thị D",
    "Đặng Văn E"
];

$q = isset($_GET['q']) ? strtolower(trim($_GET['q'])) : '';

$result = [];
if ($q !== '') {
    foreach ($students as $name) {
        if (strpos(strtolower($name), $q) !== false) {
            $result[] = $name;
        }
    }
}

echo json_encode($result);
?>
