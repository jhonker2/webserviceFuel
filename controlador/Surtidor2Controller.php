<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Surtidor2.php');
require_once('../modelo/Dato.php');

class Surtidor2Controller 
{
    
    private $connect;
    private $surtidores;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->surtidores=array();
    } 
  

     public function Get2($empresa, $caja, $identificador)
    {
         $query = "select codigo,producto,nombre,imagenAndroid from in_surtidor  where empresa='".$empresa."' and caja='".$caja."' and identificador='".$identificador."'";
         $result = odbc_exec($this->connect, $query);
         while(odbc_fetch_row($result))
         {
             $codigo = odbc_result($result, 1);
             $producto = odbc_result($result, 2);
             $nombre = odbc_result($result, 3);
             $imagenAndroid = odbc_result($result, 4);
             
             $c=new Surtidor2($codigo,$producto, $nombre,$imagenAndroid);
             
             $this->surtidores[]=$c->getJsonData();
         }
         
         
         $resultado=new Dato($this->surtidores);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
    
    
}

$sur = new Surtidor2Controller($connect);
$sur->Get2($_GET["empresa"],$_GET["caja"],$_GET["identificador"]);