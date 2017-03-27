<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Precio.php');
require_once('../modelo/Dato.php');

class PrecioController 
{
    
    private $connect;
    private $precios;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->precios=array();
    } 
    
    public function InformePrecio($empresa,$inicio,$fin) // de las ventas
    {
         $query = "call in_rep_informe_precios_g('".$empresa."','".$inicio."','".$fin."')";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $descripcion1 = utf8_encode(odbc_result($result, 2));
             $marca = utf8_encode(odbc_result($result, 8));
             $codigo = odbc_result($result, 1);
             $pvp1 = odbc_result($result, 5);
             $pvp2 = odbc_result($result, 6);
             $pvp3 = odbc_result($result, 7);
             $referencia = odbc_result($result, 3);
             $aplicacion = odbc_result($result, 4);
             $codigo_barra = odbc_result($result, 9);
             
             $p=new Precio($codigo,$descripcion1,$referencia,$aplicacion,$pvp1,$pvp2,$pvp3,$marca,$codigo_barra);
             
             $this->precios[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->precios);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }       
    
}
$precio=new PrecioController($connect);
$precio->InformePrecio($_GET["empresa"],$_GET["inicio"],$_GET["fin"]);