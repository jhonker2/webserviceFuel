<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/DetalleProducto.php');
require_once('../modelo/Dato.php');
class DetalleProductoController
{
   
    private $connect;
    private $detalles;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->detalles=array();
    } 
    
    public function Get($empresa,$codigo)
    {
         $query = "SELECT iva,costo from in_item where empresa='".$empresa."' and codigo='".$codigo."'";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $iva = utf8_encode(odbc_result($result, 1));
             $costo = odbc_result($result, 2);
             
             $c=new DetalleProducto($iva, $costo);
             
             $this->detalles[]=$c->getJsonData();
         }
         
         
         $resultado=new Dato($this->detalles);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
}
$detalle=new DetalleProductoController($connect);
$detalle->Get($_GET["empresa"],$_GET["codigo"]);