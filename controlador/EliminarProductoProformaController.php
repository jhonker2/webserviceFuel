<?php

require_once('../index.php');

class EliminarProductoProformaController
{
   private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    public function Eliminar($secuencia,$empresa)
    {
        $query ="delete from in_movimiento_proforma WHERE empresa='".$empresa."' and secuencia=".$secuencia;
        odbc_exec($this->connect, $query);
      
        odbc_close($this->connect);   
    } 
}
$c=new EliminarProductoProformaController ($connect);
$c->Eliminar($_POST["secuencia"],$_POST["empresa"]);