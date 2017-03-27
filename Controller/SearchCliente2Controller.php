<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Cliente2.php');
require_once('../modelo/Dato.php');
class ClientePorCedulaController {
    private $connect;
    private $clientes;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->clientes=array();
    } 
    
    public function Buscar($cedula)//de las ventas
    {    
         $query = "SELECT cedula_ruc,razon_social,calle from cliente2 where cedula_ruc='".$cedula."'";
         
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             
             $cedula_ruc = odbc_result($result, 1);
             $nombre= utf8_encode(odbc_result($result, 2));
             $direccion1= utf8_encode(odbc_result($result, 3));
            
             
             $p=new Cliente2($cedula_ruc,$nombre,$direccion1);
             
             $this->clientes[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->clientes);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
}
$cliente=new ClientePorCedulaController($connect);
$cliente->Buscar($_GET["cedula"]);