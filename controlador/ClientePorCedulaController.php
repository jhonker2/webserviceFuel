<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Cliente.php');
require_once('../modelo/Dato.php');
class ClientePorCedulaController {
    private $connect;
    private $clientes;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->clientes=array();
    } 
    
    public function Buscar($empresa,$cedula)//de las ventas
    {    
         
         if(strlen($cedula)>10){
            $cedula=substr($cedula, 0, -3);   
           
         }
         $query = "SELECT codigo,cedula_ruc,nombre,direccion1,telefono from in_cliente where empresa='".$empresa."' and cedula_ruc='".$cedula."001' or codigo='".$cedula."' or cedula_ruc='".$cedula."' order by nombre";
         
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             
             $codigo = odbc_result($result, 1);
             $cedula_ruc = odbc_result($result, 2);
             $nombre= utf8_encode(odbc_result($result, 3));
             $direccion1= utf8_encode(odbc_result($result, 4));
             $telefono= utf8_encode(odbc_result($result, 5));
            
             
             $p=new Cliente($codigo, $cedula_ruc,$nombre,$direccion1,$telefono);
             
             $this->clientes[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->clientes);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
}
$cliente=new ClientePorCedulaController($connect);
$cliente->Buscar($_GET["empresa"],$_GET["cedula"]);