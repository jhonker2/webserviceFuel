<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/CXC.php');
require_once('../modelo/Dato.php');

class CXCController 
{
    
    private $connect;
    private $documentos;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->documentos=array();
    } 
    
    public function Get($empresa)
    {
         $query = "call web_cxc_clientes('".$empresa."')";
         $result = odbc_exec($this->connect, $query);

         while(odbc_fetch_row($result))
         {    
             $cod_cliente = utf8_encode(odbc_result($result, 2));
             $nombre = utf8_encode(odbc_result($result, 3));
             $saldo = odbc_result($result, 4);
             $fecha = odbc_result($result, 5);
             
             $c=new CXC($cod_cliente,$nombre,$saldo,$fecha);
             
             $this->documentos[]=$c->getJsonData();
         }
         
         $resultado=new Dato($this->documentos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
   
}
$caja=new CXCController($connect);
$caja->Get($_GET["empresa"]);