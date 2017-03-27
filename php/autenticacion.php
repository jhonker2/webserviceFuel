<?php
session_start();
$_SESSION["user"]=$_GET["usuario"];
header('Location: ../work.php');