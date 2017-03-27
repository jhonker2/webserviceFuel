<?php

require_once('../index.php'); 
class EliminarProductoController {
    private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
  
    public function Eliminar($cod_pro,$empresa)
    {
         $query ="delete from in_item where codigo='".$cod_pro."' and empresa='".$empresa."'";
         odbc_exec($this->connect, $query);
         odbc_close($this->connect);  
    }
}
$c=new EliminarProductoController($connect);
$c->Eliminar($_POST["cod_pro"],$_POST["empresa"]);