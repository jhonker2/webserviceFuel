<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/VentaGrupo.php');
require_once('../modelo/Dato.php');

class VentaGrupoController {
 

    private $connect;
    private $ventas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->ventas=array();
    } 
    
    public function Informe($empresa,$inicio,$fin,$tipo,$grupos) // de las ventas Informe de Ventas
    {
         $query = "call in_ventas_grupo('".$empresa."','".$tipo."','".$inicio."','".$fin."','".$grupos."')";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {  
             //$grupo,$cantidad,$subtotal,$descuento,$iva,$total
             
             $grupo = utf8_encode(odbc_result($result, 3));
             $nombre_grupo = utf8_encode(odbc_result($result, 2));
             $cantidad= utf8_encode(odbc_result($result, 6));
             $subtotal= utf8_encode(odbc_result($result, 13));
             $descuento= utf8_encode(odbc_result($result, 15));
             $iva= utf8_encode(odbc_result($result, 14));
             $total= utf8_encode(odbc_result($result, 9));
             
             
             $p=new VentaGrupo($grupo,$cantidad,$subtotal,$descuento,$iva,$total,$nombre_grupo);
             $this->ventas[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->ventas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
    
    
}
$existencia=new VentaGrupoController($connect);
$existencia->Informe($_GET["empresa"],$_GET["inicio"],$_GET["fin"],$_GET["tipo"],$_GET["grupos"]);
 