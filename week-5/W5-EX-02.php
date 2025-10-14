<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tạo mã QR thông tin sinh viên</title>
</head>
<body>

<form method="post">
    <h2>Tạo mã QR thông tin sinh viên</h2>
    <label>Họ và tên:</label>
    <input type="text" name="hoten" required><br><br>

    <label>MSSV:</label>
    <input type="text" name="mssv" required><br><br>

    <label>Số mũi vaccine Covid đã tiêm:</label>
    <input type="number" name="somui" min="0" required><br><br>

    <input type="submit" name="submit" value="Tạo mã QR">
</form>

<?php
if (isset($_POST['submit'])) {
    include('phpqrcode-master/qrlib.php');

    $hoten = $_POST['hoten'];
    $mssv = $_POST['mssv'];
    $somui = $_POST['somui'];

    // Nội dung QR
    $noidung = "Họ tên: $hoten\nMSSV: $mssv\nSố mũi vắc-xin: $somui";

    // Thư mục lưu ảnh QR
    $dir = "qr_images/";
    if (!file_exists($dir)) {
        mkdir($dir);
    }

    // Tên file QR dựa trên MSSV
    $file_name = $dir . $mssv . ".png";

    // Sinh mã QR
    QRcode::png($noidung, $file_name, 'H', 10, 4);

    echo "<div class='qr'>";
    echo "<h3>Mã QR của bạn:</h3>";
    echo "<img src='$file_name' alt='QR Code'>";
    echo "</div>";
}
?>

</body>
</html>
