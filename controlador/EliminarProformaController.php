<?php

require_once('../index.php');

class EliminarProformaController {
    private $connect;
    

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    
    } 
    
    public function Eliminar($empresa,$documento)//de las ventas
    {
         $query = "delete from in_cabecera_proforma where empresa='".$empresa."' and tipo='FC' and documento='".$documento."'";
         odbc_exec($this->connect, $query);
         odbc_close($this->connect);   
    }   
}
$c=new EliminarProformaController($connect);
$c->Eliminar($_POST["empresa"],$_POST["documento"]);