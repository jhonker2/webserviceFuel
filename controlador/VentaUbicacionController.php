<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/VentaUbicacion.php');
require_once('../modelo/Dato.php');

class VentaUbicacionController {
 

    private $connect;
    private $ventas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->ventas=array();
    } 
    
    public function Informe($empresa,$inicio,$fin) // de las ventas Informe de Ventas
    {
         $query = "call documentos_ubicacion('".$empresa."','FC','".$inicio."','".$fin."')";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {  
             //$grupo,$cantidad,$subtotal,$descuento,$iva,$total
             
             $ubicacion = utf8_encode(odbc_result($result, 7));
             $subtotal = utf8_encode(odbc_result($result, 8));
             $descuento= utf8_encode(odbc_result($result, 9));
             $iva= utf8_encode(odbc_result($result, 14));
             $total= utf8_encode(odbc_result($result, 15));
             
             
             $p=new VentaUbicacion($ubicacion ,$subtotal ,$descuento,$iva,$total);
             $this->ventas[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->ventas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
    
    
}
$existencia=new VentaUbicacionController($connect);
$existencia->Informe($_GET["empresa"],$_GET["inicio"],$_GET["fin"]);
 