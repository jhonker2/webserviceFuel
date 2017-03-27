<?php
require_once('../index.php');

class ComprobarFacturaVencidaController 
{
   private $connect;
    

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    
    } 
    
    public function Buscar($empresa,$cod_cliente)//de las ventas
    {    
         $query = "SELECT web_factura_vencida('".$empresa."','".$cod_cliente."')";  
         $result= odbc_exec($this->connect, $query); 
         while(odbc_fetch_row($result))
         {
             echo utf8_encode(odbc_result($result, 1));
         }
         odbc_close($this->connect);   
    }   
}
$c=new ComprobarFacturaVencidaController($connect);
$c->Buscar($_GET["empresa"],$_GET["cod_cliente"]);