<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/FormaPago.php');
require_once('../modelo/Dato.php');

class FormaPagoController 
{
    
    private $connect;
    private $formas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->formas=array();
    } 
    
    public function Get($empresa)
    {
         $query = "SELECT secuencia,forma_pago FROM  cxc_forma_pago where empresa='".$empresa."'";
         $result = odbc_exec($this->connect, $query);

         while(odbc_fetch_row($result))
         {
             $forma_pago = utf8_encode(odbc_result($result, 2));
             $codigo = odbc_result($result, 1);
             
             $c=new FormaPago($codigo, $forma_pago);
             
             $this->formas[]=$c->getJsonData();
         }
         $resultado=new Dato($this->formas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
    
    
}
$caja=new FormaPagoController($connect);
$caja->Get($_GET["empresa"]);