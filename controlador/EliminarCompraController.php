<?php

require_once('../index.php');

class EliminarCompraController {
    private $connect;
    

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    
    } 
    
    public function Eliminar($empresa,$documento)//de las ventas
    {
         $query = "delete from in_cabecera where empresa='".$empresa."' and tipo='CP' and documento='".$documento."'";
         odbc_exec($this->connect, $query);
         odbc_close($this->connect);   
    }   
}
$c=new EliminarCompraController($connect);
$c->Eliminar($_POST["empresa"],$_POST["documento"]);