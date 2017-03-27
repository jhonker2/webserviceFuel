<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/IngresoCaja.php');
require_once('../modelo/Dato.php');

class IngresoCajaController 
{
    private $connect;
    private $datos;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->datos=array();
    } 
    
    public function Buscar($empresa,$desde,$hasta,$caja,$vendedor)//de las ventas
    {
         $query = "call web_cxc_pagos('".$empresa."','".$desde."','".$hasta."','".$caja."','".$vendedor."')";
         $result = odbc_exec($this->connect, $query);
         
         while(odbc_fetch_row($result))
         {         
            $factura = utf8_encode(odbc_result($result, 3));
            $emision = utf8_encode(odbc_result($result, 4));    
            $vencimiento = utf8_encode(odbc_result($result, 5));
            $recibo = utf8_encode(odbc_result($result, 6));
            $banco = utf8_encode(odbc_result($result, 7));
            $cuenta = utf8_encode(odbc_result($result, 8));
            $numero = utf8_encode(odbc_result($result, 9));
            $cliente = utf8_encode(odbc_result($result, 10));
            $valor = utf8_encode(odbc_result($result, 11));
            $descuento = utf8_encode(odbc_result($result,12));
            $r_f = utf8_encode(odbc_result($result, 13));
            $r_iva = utf8_encode(odbc_result($result, 14));
            $formapago = utf8_encode(odbc_result($result, 15));
            $vendedor = utf8_encode(odbc_result($result, 16));
            $caja = utf8_encode(odbc_result($result, 17));

             $p=new IngresoCaja($factura,$emision,$vencimiento,$recibo,$banco,$cuenta,$numero,$cliente,$valor,$descuento,$r_f,$r_iva,$formapago,$vendedor,$caja);
             
             $this->datos[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->datos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
    
}

$d=new IngresoCajaController($connect);
$d->Buscar($_GET["empresa"],$_GET["desde"],$_GET["hasta"],$_GET["caja"],$_GET["vendedor"]);