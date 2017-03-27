<?php
session_start();
if (!isset($_SESSION["user"]))// pregunta si existe
   header('Location: login.html');
