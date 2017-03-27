<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Ubicacion.php');
require_once('../modelo/Dato.php');

class UbicacionController {
    private $connect;
    private $ubicaciones;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->ubicaciones=array();
    } 
    
    public function Get($empresa)
    {
         $query = "SELECT codigo,ubicacion from in_ubicacion where empresa='".$empresa."' order by ubicacion";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $ubicacion = utf8_encode(odbc_result($result, 2));
             $codigo = odbc_result($result, 1);
             
             
             $p=new Ubicacion($codigo, $ubicacion);
             
             $this->ubicaciones[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->ubicaciones);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
}

$ubicacion=new UbicacionController($connect);
$ubicacion->Get($_GET["empresa"]);
