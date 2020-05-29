<?php 
require 'conexion.php';
session_start();
$usuario = $_POST["Correo"];
$clave = $_POST["Contraseña"];

$q = "SELECT COUNT(*) as contar from correo where correo = '$usuario' and contraseña = '$clave' ";
$consulta = mysqli_query($conexion,$q);
$ array = mysqli_fetch_array($consulta);

if ($array ['contar']>0){
    $_SESSION['username'] = $usuario
    header ("location: ../../vistas/administradorPaginaPrincipal.php");
}
else {
    echo "Datos Incorrectos";
}




?>