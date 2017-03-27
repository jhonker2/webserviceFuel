<?php

require_once('../index.php');

class ActualizarDocumentoController {
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    }
    public function Actualizar($empresa,$documento,$secuencia,$cantidad)
    {
        $query ="update in_mov_inv_fisico set cantidad=".$cantidad." where empresa='".$empresa."' and tipo='IF' and documento='".$documento."' and secuencia=".$secuencia;
        odbc_exec($this->connect, $query);
        odbc_close($this->connect);  
    }
    
 
}
$c=new ActualizarDocumentoController($connect);
$c->Actualizar($_GET["empresa"],$_GET["documento"],$_GET["secuencia"],$_GET["cantidad"]);