<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Producto.php');
require_once('../modelo/Dato.php');

class ProductoController
{
    private $connect;
    private $productos;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->productos=array();
    } 
    
    public function Buscar($empresa,$filtro,$criterio,$ubicacion) // de las ventas
    {
         $query = "call web_in_item_l_nefasa('".$filtro."','".$empresa."','".$criterio."','".$ubicacion."')";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $descripcion1 = utf8_encode(odbc_result($result, 3));
             $codigo = odbc_result($result, 1);
             $pvp1 = odbc_result($result, 7);
             $pvp2 = odbc_result($result, 8);
             $pvp3 = odbc_result($result, 9);
             $pvp4 = odbc_result($result, 21);
             $existencia = odbc_result($result, 4);
             
             $costo = odbc_result($result, 10);
             $codGrupo = odbc_result($result, 12);
             $codLinea = odbc_result($result, 13);
             $marca = odbc_result($result, 14);
             $medida = odbc_result($result, 15);
             $iva = odbc_result($result, 16);
             $por1 = odbc_result($result, 17);
             $por2 = odbc_result($result, 18);
             $por3 = odbc_result($result, 19);
             $por4 = odbc_result($result, 22);
             $codigo_barra = odbc_result($result, 20);
             
             $referencia = odbc_result($result, 6);
             $aplicacion = odbc_result($result, 24);
             
           
             $p=new Producto($codigo, $descripcion1,$pvp1,$pvp2,$pvp3,$existencia,$costo,$codGrupo,$codLinea,$marca,$medida,$iva,$por1,$por2,$por3,$codigo_barra);
             $p->setPvp4($pvp4);
             $p->setPor4($por4);
             $p->setReferencia($referencia);
             $p->setAplicacion($aplicacion);
             $this->productos[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->productos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
}

$producto=new ProductoController($connect);
$producto->Buscar($_GET["empresa"],$_GET["filtro"],$_GET["criterio"],$_GET["ubicacion"]);
