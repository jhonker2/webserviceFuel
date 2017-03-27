<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/FacturaCobrar.php');
require_once('../modelo/Dato.php');

class FacturasCobrarController 
{
    private $connect;
    private $datos;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->datos=array();
    } 
    
    public function Buscar($empresa,$cliente)//de las ventas
    {
         $query = "call in_cxc_pagos_factura('".$empresa."','".$cliente."')";
         $result = odbc_exec($this->connect, $query);
         
         while(odbc_fetch_row($result))
         {   
             $documento = odbc_result($result, 3);
             $tipo = odbc_result($result, 2);
             $ubicacion= utf8_encode(odbc_result($result, 5));
             $r_iva= utf8_encode(odbc_result($result, 23));
             $emision= utf8_encode(odbc_result($result, 8));
             $vence= utf8_encode(odbc_result($result, 9));
             
             $iva=utf8_encode(odbc_result($result, 17));
             
              $piva=utf8_encode(odbc_result($result, 16));
              $retencion=utf8_encode(odbc_result($result, 19));
             
              $val_ret= utf8_encode(odbc_result($result, 24));
             $dias= utf8_encode(odbc_result($result, 25));
             
             $total= utf8_encode(odbc_result($result, 21));
             $transporte= utf8_encode(odbc_result($result, 10));
             $Total=$total+$transporte; 
             
             $devolucion= utf8_encode(odbc_result($result, 22));
             $abono= utf8_encode(odbc_result($result, 18));
             
             $saldo= $Total-$devolucion-$abono;
             
             if( number_format((float)$saldo, 2, '.', '')>0.00)
             {
             $p=new FacturaCobrar($documento, $tipo, $ubicacion,$r_iva,$emision,$vence,$dias, $Total,$devolucion,$abono, $saldo,$iva,$piva,$retencion,$val_ret);
             $this->datos[]=$p->getJsonData();
             
             }
         }
         
         
         $resultado=new Dato($this->datos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
    
}

$d=new FacturasCobrarController($connect);
$d->Buscar($_GET["empresa"],$_GET["cliente"]);