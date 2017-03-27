<?php

require_once('../index.php');

class EliminarDocumentoController {
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    }
    public function Eliminar($empresa,$documento,$secuencia)
    {
        $query ="delete from in_mov_inv_fisico where empresa='".$empresa."' and tipo='IF' and documento='".$documento."' and secuencia=".$secuencia;
        odbc_exec($this->connect, $query);
        odbc_close($this->connect);  
    }
    
 
}
$c=new EliminarDocumentoController($connect);
$c->Eliminar($_POST["empresa"],$_POST["documento"],$_POST["secuencia"]);