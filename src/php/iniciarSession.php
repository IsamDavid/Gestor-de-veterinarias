<?php 
require 'conexion.php';
session_start();
$correo = $_POST["Correo"];
$contraseña = $_POST["Contraseña"];

$q = "SELECT COUNT(*) as contar from administrador where correo = '$correo' and contraseña = '$contraseña' ";
$consulta = mysqli_query($conexion,$q);
$array = mysqli_fetch_array($consulta);

if ($array ['contar']>0){
    $_SESSION['username'] = $correo;
    header("location: ../../vistas/administradorPaginaPrincipal.php");
   
}
else {
    echo "Datos Incorrectos";
}




?>