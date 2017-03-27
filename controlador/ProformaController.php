<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Proforma.php');
require_once('../modelo/Dato.php');

class ProformaController 
{
    private $connect;
    private $proformas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->proformas=array();
    } 
    
    public function InformeProformas($empresa,$tipo,$inicio,$fin) // de las ventas Informe de Ventas
    {
         $query = "call in_fact_rep_proformas('".$empresa."','".$tipo."','".$inicio."','".$fin."')";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $docu = odbc_result($result, 3);
             $ubicacion = odbc_result($result, 4);
             $cliente = odbc_result($result, 5);
             $vendedor = utf8_encode(odbc_result($result, 6));
             $emision = odbc_result($result, 7);
             $vence = odbc_result($result, 8);
             $subtotal = odbc_result($result, 9);
             $descuento1 = odbc_result($result, 10);
             $total1 = odbc_result($result, 11);
             $descuento2 = odbc_result($result, 12);
             $total2 = odbc_result($result, 13);
             $piva = odbc_result($result, 14);
             $iva=odbc_result($result, 15);
             
            $TOTAL=odbc_result($result, 16);
            $referencia=odbc_result($result, 17);
            $caja=odbc_result($result, 18);
                      
             
             $p=new Proforma($docu,$ubicacion,$cliente,$vendedor,$emision,$vence,$subtotal,$descuento1,$total1,$descuento2,$total2,$piva,$iva,$TOTAL,$referencia,$caja);
             
             $this->proformas[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->proformas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }    
}
$proforma=new ProformaController($connect);
$proforma->InformeProformas($_GET["empresa"],$_GET["tipo"],$_GET["inicio"],$_GET["fin"]);