<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Venta.php');
require_once('../modelo/Dato.php');

class VentaController {
 

    private $connect;
    private $ventas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->ventas=array();
    } 
    
    public function InformeVentas($empresa,$inicio,$fin,$cliente,$codigos_vendedores,$tipo) // de las ventas Informe de Ventas
    {
         $query = "call web_documentos_cliente('".$empresa."','FC','".$inicio."','".$fin."','".$tipo."','".$cliente."','".$codigos_vendedores."')";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {  
             $REFER = utf8_encode(odbc_result($result, 20));
             $docu= utf8_encode(odbc_result($result, 3));
             $cliente= utf8_encode(odbc_result($result, 26));
             $sub_iva= utf8_encode(odbc_result($result, 22));
             $sub_siva= utf8_encode(odbc_result($result, 23));
             $descuento_iva= utf8_encode(odbc_result($result, 24));
             $descuento_siva= utf8_encode(odbc_result($result, 25));
             $iva= utf8_encode(odbc_result($result, 15));
             $total= utf8_encode(odbc_result($result, 16));
             $emision= utf8_encode(odbc_result($result, 7));
             $vence= utf8_encode(odbc_result($result, 8));
             $nombre= utf8_encode(odbc_result($result, 27));
             $caja= utf8_encode(odbc_result($result, 28));
             
             $p=new Venta($REFER,$docu,$cliente,$sub_iva,$sub_siva,$descuento_iva,$descuento_siva,$iva,$total,$emision,$vence,$nombre, $caja);
             $this->ventas[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->ventas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
    
    
}
$existencia=new VentaController($connect);
$existencia->InformeVentas($_GET["empresa"],$_GET["inicio"],$_GET["fin"],$_GET["cliente"],$_GET["codigos_vendedores"],$_GET["tipo"]);
 