<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Medida.php');
require_once('../modelo/Dato.php');

class MedidaController 
{
    
    private $connect;
    private $medidas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->medidas=array();
    } 
    
    public function Get($empresa)
    {
         $query = "select codigo,medida from in_medida where empresa='".$empresa."'";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $medida = utf8_encode(odbc_result($result, 2));
             $codigo = odbc_result($result, 1);
             
             $c=new Medida($codigo, $medida);
             
             $this->medidas[]=$c->getJsonData();
         }
         
         
         $resultado=new Dato($this->medidas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
    
    
}
$caja=new MedidaController($connect);
$caja->Get($_GET["empresa"]);