<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Linea.php');
require_once('../modelo/Dato.php');

class LineaController 
{
    
    private $connect;
    private $lineas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->lineas=array();
    } 
    
    public function Get($empresa)
    {
         $query = "select codigo,linea from in_linea where empresa='".$empresa."'";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $linea = utf8_encode(odbc_result($result, 2));
             $codigo = odbc_result($result, 1);
             
             $c=new Linea($codigo, $linea);
             
             $this->lineas[]=$c->getJsonData();
         }
         
         
         $resultado=new Dato($this->lineas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
    
    
}
$linea=new LineaController($connect);
$linea->Get($_GET["empresa"]);