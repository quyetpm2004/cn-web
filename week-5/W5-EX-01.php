<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tính tuổi và chênh lệch ngày sinh</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 30px;
            background-color: #f4f6f8;
        }
        form {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 400px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        input {
            margin-bottom: 10px;
            padding: 8px;
            width: 95%;
        }
        button {
            padding: 8px 16px;
            border: none;
            background-color: #007bff;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
        .result {
            margin-top: 20px;
            background: #ccc;
            padding: 15px;
            border-radius: 8px;
        }
    </style>
</head>
<body>

<h2>Tính tuổi và số ngày chênh lệch giữa hai người</h2>

<form method="post">
    <h3>Người thứ nhất</h3>
    Họ tên: <br>
    <input type="text" name="name1" required><br>
    Ngày sinh: <br>
    <input type="date" name="dob1" required><br>

    <h3>Người thứ hai</h3>
    Họ tên: <br>
    <input type="text" name="name2" required><br>
    Ngày sinh: <br>
    <input type="date" name="dob2" required><br>

    <button type="submit" name="submit">Tính kết quả</button>
</form>

<?php
if (isset($_POST['submit'])) {
    $name1 = $_POST['name1'];
    $name2 = $_POST['name2'];
    $dob1 = new DateTime($_POST['dob1']);
    $dob2 = new DateTime($_POST['dob2']);
    $today = new DateTime();

    // Tính tuổi
    $age1 = $today->diff($dob1)->y;
    $age2 = $today->diff($dob2)->y;

    // Tính chênh lệch số ngày
    $diffDays = $dob1->diff($dob2)->days;

    echo "<div class='result'>";
    echo "<p><strong>$name1</strong> hiện tại: $age1 tuổi</p>";
    echo "<p><strong>$name2</strong> hiện tại: $age2 tuổi</p>";
    echo "<p>Chênh lệch số ngày giữa hai người là: <strong>$diffDays</strong> ngày</p>";
    echo "</div>";
}
?>

</body>
</html>
