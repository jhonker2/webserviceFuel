<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/DatosProductoProforma.php');
require_once('../modelo/Dato.php');

class DatosProductosVentaController 
{
       
    private $connect;
    private $datos;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->datos=array();
    } 
    
    public function Buscar($empresa,$tipo,$documento)//de las ventas
    {
         $query = "call web_in_cuerpo_factura_venta_nefasa('".$empresa."','".$documento."','".$tipo."')";
         $result = odbc_exec($this->connect, $query);
         
         while(odbc_fetch_row($result))
         {      
             $producto= odbc_result($result, 1);
             $cantidad= odbc_result($result, 2);
             $bonificacion= utf8_encode(odbc_result($result, 3));
             $descripcion1= utf8_encode(odbc_result($result, 4));
             $valor= utf8_encode(odbc_result($result, 5));
             $valor1= utf8_encode(odbc_result($result, 6));
             
             $descuento= utf8_encode(odbc_result($result, 7));
             $impuesto= utf8_encode(odbc_result($result, 8));
             $secuencia= utf8_encode(odbc_result($result, 12));
             $iva_v= utf8_encode(odbc_result($result, 13));
             $promedio= utf8_encode(odbc_result($result, 15));
             $costo= utf8_encode(odbc_result($result, 16));
             $ubicacion= utf8_encode(odbc_result($result, 17));
             
             $numprecio= utf8_encode(odbc_result($result, 18));
             $serie= utf8_encode(odbc_result($result, 19));
             $cajas= utf8_encode(odbc_result($result, 21));
             $unidades= utf8_encode(odbc_result($result, 22));
             $fraccion= utf8_encode(odbc_result($result, 23));
             $iva= utf8_encode(odbc_result($result, 24));
             
             $pvp1= utf8_encode(odbc_result($result, 25));
             $pvp2= utf8_encode(odbc_result($result, 26));
             $pvp3= utf8_encode(odbc_result($result, 27));
             $pvp4= utf8_encode(odbc_result($result, 27));
             
             $p=new DatosProductoProforma($producto,$cantidad,$bonificacion,$descripcion1,$valor,$valor1,$descuento,$impuesto,$secuencia,$iva_v,$promedio,$costo,$ubicacion,$numprecio,$serie,$cajas,$unidades,$fraccion,$iva,$pvp1,$pvp2,$pvp3);
             $p->setPvp4($pvp4);
             $this->datos[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->datos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
}
$d=new DatosProductosVentaController($connect);
$d->Buscar($_GET["empresa"],$_GET["tipo"],$_GET["documento"]);