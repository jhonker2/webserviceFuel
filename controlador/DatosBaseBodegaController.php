<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/DatosBaseBodega.php');
require_once('../modelo/Dato.php');

class DatosBaseBodegaController 
{
    private $connect;
    private $datos;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->datos=array();
    } 
    
    public function Buscar($empresa,$tipo,$documento)//de las ventas
    {
         $query = "call web_in_cabecera_ingr_egr('".$empresa."','".$tipo."','".$documento."')";
         $result = odbc_exec($this->connect, $query);
         
         while(odbc_fetch_row($result))
         {
             $documento = odbc_result($result, 1);
             $fecha = odbc_result($result, 2);
           
             $p=new DatosBaseBodega($documento,$fecha);
             
             $this->datos[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->datos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
    
}

$d=new DatosBaseBodegaController($connect);
$d->Buscar($_GET["empresa"],$_GET["tipo"],$_GET["documento"]);