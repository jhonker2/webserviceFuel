<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/InformeCobro.php');
require_once('../modelo/Dato.php');

class InformeCobroController {
 

    private $connect;
    private $ventas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->ventas=array();
    } 
    
    public function Informe($empresa,$inicio,$fin) // de las ventas Informe de Ventas
    {
         $query = "call in_cxc_PAGOS('".$empresa."','".$inicio."','".$fin."')";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {  
             //$grupo,$cantidad,$subtotal,$descuento,$iva,$total
             
             $fecha = utf8_encode(odbc_result($result, 4));
             $forma_pago = utf8_encode(odbc_result($result, 3));
             $descuento= utf8_encode(odbc_result($result, 17));
             $total= utf8_encode(odbc_result($result, 7));
             
             
             $p=new InformeCobro($fecha ,$forma_pago ,$descuento,$total);
             $this->ventas[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->ventas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
    
    
}
$existencia=new InformeCobroController($connect);
$existencia->Informe($_GET["empresa"],$_GET["inicio"],$_GET["fin"]);
 