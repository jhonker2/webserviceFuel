<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/VentaDia.php');
require_once('../modelo/Dato.php');

class VentaDiaController {
 

    private $connect;
    private $ventas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->ventas=array();
    } 
    
    public function Informe($empresa,$inicio,$fin) // de las ventas Informe de Ventas
    {
         $query = "call documentos_dia('".$empresa."','FC','".$inicio."','".$fin."')";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {  
             //$grupo,$cantidad,$subtotal,$descuento,$iva,$total
             
             $fecha = utf8_encode(odbc_result($result, 7));
             $subtotal = utf8_encode(odbc_result($result, 8));
             $descuento= utf8_encode(odbc_result($result, 9));
             $iva= utf8_encode(odbc_result($result, 14));
             $total= utf8_encode(odbc_result($result, 15));
             
             
             $p=new VentaDia($fecha ,$subtotal ,$descuento,$iva,$total);
             $this->ventas[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->ventas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
    
    
}
$existencia=new VentaDiaController($connect);
$existencia->Informe($_GET["empresa"],$_GET["inicio"],$_GET["fin"]);
 