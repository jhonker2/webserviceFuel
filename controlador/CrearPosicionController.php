<?php

require_once('../index.php');

class CrearPosicionController {
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    }
    public function Insertar($empresa,$vendedor,$cliente,$latitud,$longitud)
    {
        $query ="insert into mo_recorrido(empresa,vendedor,cliente,longitud,latitud) values('".$empresa."','".$vendedor."','".$cliente."','".$longitud."','".$latitud."');";
        odbc_exec($this->connect, $query);
    }
    
    public function Crear($empresa,$vendedor,$cliente,$latitud,$longitud)//de las ventas
    {
      $this->Insertar($empresa,$vendedor,$cliente,$latitud,$longitud);
      odbc_close($this->connect);   
    }
}
$c=new CrearPosicionController ($connect);
$c->Crear($_POST["empresa"],$_POST["vendedor"],$_POST["cliente"],$_POST["latitud"],$_POST["longitud"]);