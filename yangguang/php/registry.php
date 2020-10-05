<?php
include "conn.php";


//检测用户名是否重名
if (isset($_POST['username'])|| isset($_POST['submit'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from registry where username='$user'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}else{
    exit('非法操作');//退出，并显示内部的文字
}

//接收前端表单提交的数据
if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = sha1($_POST['password']);
    $email = $_POST['email'];
    $conn->query("insert registry values(null,'$username','$password','$email',NOW())");
    header('location:http://192.168.13.7/yangguang/tian/yangguang/src/login.html');
}
