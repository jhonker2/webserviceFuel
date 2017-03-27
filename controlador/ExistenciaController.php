<?php


require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Existencia.php');
require_once('../modelo/Dato.php');

class ExistenciaController 
{
     private $connect;
    private $existencias;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->existencias=array();
    } 
    
    public function InformeVentas($empresa,$filtro) // de las ventas
    {
         $query = "call web_in_existencia_bodega('".$filtro."','".$empresa."')";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $producto = odbc_result($result, 1);
             $descripcion1 = utf8_encode(odbc_result($result, 2));
             $ubicacion = utf8_encode(odbc_result($result, 3));
             $cajas = odbc_result($result, 4);
             $unidades= odbc_result($result, 5);
             $codigo_ubicacion= odbc_result($result, 6);
             
             $p=new Existencia($producto,$descripcion1,$ubicacion,$cajas,$unidades,$codigo_ubicacion);
             $p->setExistencia(odbc_result($result, 7));
             
             $this->existencias[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->existencias);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
}




$existencia=new ExistenciaController($connect);
$existencia->InformeVentas($_GET["empresa"],$_GET["filtro"]);
 