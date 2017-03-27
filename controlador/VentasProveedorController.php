<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/PedidosProveedor.php');
require_once('../modelo/Dato.php');

class VentasProveedorController 
{
    private $connect;
    private $datos;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->datos=array();
    } 
    
    public function Buscar($empresa,$desde,$hasta)//de las ventas
    {
         $query = "call web_rep_ventas_vendedor('".$empresa."','FC','".$desde."','".$hasta."')";
         $result = odbc_exec($this->connect, $query);
         
         while(odbc_fetch_row($result))
         {
             $nombre =utf8_encode(odbc_result($result, 1));
             $cantidad = odbc_result($result, 2);
             $total= odbc_result($result, 3);
             $porcentaje= odbc_result($result, 4);
             
             $p=new PedidosProveeedor($nombre,$cantidad,$total,$porcentaje);
             $p->SetCod_Vendedor(odbc_result($result, 5));
             $this->datos[]=$p->getJsonData();
         }
         
         $resultado=new Dato($this->datos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
    
}

$d=new VentasProveedorController($connect);
$d->Buscar($_GET["empresa"],$_GET["desde"],$_GET["hasta"]);