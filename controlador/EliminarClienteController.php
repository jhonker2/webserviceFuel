<?php

require_once('../index.php'); 
class EliminarClienteController {
    private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
  
    public function Eliminar($cod_cliente,$empresa)
    {
         $query ="delete from in_cliente where empresa='".$empresa."' and codigo='".$cod_cliente."';";
         odbc_exec($this->connect, $query);
         odbc_close($this->connect);  
    }
}
$c=new EliminarClienteController($connect);
$c->Eliminar($_POST["cod_cliente"],$_POST["empresa"]);