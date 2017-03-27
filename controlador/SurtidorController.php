<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Surtidor.php');
require_once('../modelo/Dato.php');

class SurtidorController 
{
    
    private $connect;
    private $surtidores;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->surtidores=array();
    } 
    
    public function Get($empresa , $caja)
    {
         $query = "select codigo,surtidor,producto,caja,identificador from in_surtidor  where empresa='".$empresa."' and caja='".$caja."'";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $codigo = odbc_result($result, 1);
             $surtidor = utf8_encode(odbc_result($result, 2));
             $producto = odbc_result($result, 3);
             $caja = odbc_result($result, 4);
             $identificador = odbc_result($result, 5);
             
             $c=new Surtidor($codigo,$surtidor,$producto, $caja,$identificador);
             
             $this->surtidores[]=$c->getJsonData();
         }
         
         
         $resultado=new Dato($this->surtidores);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }

     
    
}
$surtidor=new SurtidorController($connect);
$surtidor->Get($_GET["empresa"],$_GET["caja"]);

