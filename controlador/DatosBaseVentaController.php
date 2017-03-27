<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/DatosBaseProforma.php');
require_once('../modelo/Dato.php');

class DatosBaseVentaController 
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
         $query = "call web_in_cabecera('".$empresa."','".$tipo."','".$documento."')";
         $result = odbc_exec($this->connect, $query);
         
         while(odbc_fetch_row($result))
         {
             $documento = odbc_result($result, 1);
             $fecha = odbc_result($result, 2);
             $pro_cli= utf8_encode(odbc_result($result, 3));
             $fechaV= utf8_encode(odbc_result($result, 4));
             $transporte= utf8_encode(odbc_result($result, 5));
             $descuento= utf8_encode(odbc_result($result, 6));
             $impuesto= utf8_encode(odbc_result($result, 7));
             $tipo= utf8_encode(odbc_result($result, 8));
             $vendedor= utf8_encode(odbc_result($result, 9));
             $caja= utf8_encode(odbc_result($result, 12));
             $comentario= utf8_encode(odbc_result($result, 13));
             $nombre= utf8_encode(odbc_result($result, 14));
             $cedula_ruc= utf8_encode(odbc_result($result, 15));
             $direccion1= utf8_encode(odbc_result($result, 16));
             $telefono= utf8_encode(odbc_result($result, 17));
             $estado= utf8_encode(odbc_result($result, 18));
             
             $p=new DatosBaseProforma($documento,$fecha,$pro_cli,$fechaV,$transporte,$descuento,$impuesto,$tipo,$vendedor,$caja,$comentario,$nombre,$cedula_ruc,$direccion1,$telefono,$estado);
             
             $this->datos[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->datos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
    
}

$d=new DatosBaseVentaController($connect);
$d->Buscar($_GET["empresa"],$_GET["tipo"],$_GET["documento"]);