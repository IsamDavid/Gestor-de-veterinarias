<?php
$host = "LocalHost";
$correo = "root";
$contraseña = "";
$bd = "patitaspets";

$conexion = mysqli_connect($host,$correo,$contraseña,$bd);

if($conexion){
    echo "conectado correctamente";
}
else {
    echo "conexion fallida";
}

?>