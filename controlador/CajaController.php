<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Caja.php');
require_once('../modelo/Dato.php');

class CajaController 
{
    
    private $connect;
    private $cajas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->cajas=array();
    } 
    
    public function Get($empresa)
    {
         $query = "SELECT caja,codigo,estacion,punto from in_caja where empresa='".$empresa."'and combustible='S' order by caja";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $caja = utf8_encode(odbc_result($result, 1));
             $codigo = odbc_result($result, 2);
             $estacion = odbc_result($result, 3);
             $punto = odbc_result($result, 4);
             
             $c=new Caja($codigo, $caja, $estacion, $punto);
             
             $this->cajas[]=$c->getJsonData();
         }
         
         
         $resultado=new Dato($this->cajas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
    
    
}
$caja=new CajaController($connect);
$caja->Get($_GET["empresa"]);