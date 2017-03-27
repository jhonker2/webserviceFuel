<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/ConfiguracionDocumento.php');
require_once('../modelo/Dato.php');

class ConfiguracionDocumentoController {
    private $connect;
    private $cf;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->cf=array();
    } 
    
    public function Buscar($empresa)//de las ventas
    {
       $query = "call web_in_cab_inv_fisico('".$empresa."')";
       $result = odbc_exec($this->connect, $query);
       
         while(odbc_fetch_row($result))
         { 
             $documento = odbc_result($result, 2);
             $fecha = odbc_result($result, 3);
             $cod_ubicacion= utf8_encode(odbc_result($result, 5));
             $ubicacion= utf8_encode(odbc_result($result, 8));
             
             $p=new ConfiguracionDocumento($documento,$fecha,$cod_ubicacion,$ubicacion);
             
             $this->cf[]=$p->getJsonData();
         }
         $resultado=new Dato($this->cf);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
}

$cliente=new ConfiguracionDocumentoController($connect);
$cliente->Buscar($_GET["empresa"]);