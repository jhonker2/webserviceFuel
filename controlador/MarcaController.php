<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Marca.php');
require_once('../modelo/Dato.php');

class MarcaController 
{
    
    private $connect;
    private $marcas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->marcas=array();
    } 
    
    public function Get($empresa)
    {
         $query = "select codigo,marca from in_marca where empresa='".$empresa."'";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $marca = utf8_encode(odbc_result($result, 2));
             $codigo = odbc_result($result, 1);
             
             $c=new Marca($codigo, $marca);
             
             $this->marcas[]=$c->getJsonData();
         }
         
         
         $resultado=new Dato($this->marcas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
    
    
}
$caja=new MarcaController($connect);
$caja->Get($_GET["empresa"]);