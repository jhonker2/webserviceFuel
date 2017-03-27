<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Cliente.php');
require_once('../modelo/Dato.php');
class ClientePorCedulaCodigoController {
    private $connect;
    private $clientes;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->clientes=array();
    } 
    
  
    
    public function Buscar($empresa,$cedula)//de las ventas
    {    
         
       
         $query = "SELECT codigo,cedula_ruc,nombre,direccion1,telefono,e_mail,vendedor,zona,web_factura_vencida(in_cliente.empresa,in_cliente.codigo) as vencido from in_cliente where (substr(cedula_ruc,1,10)=substr('".$cedula."',1,10) or codigo='".$cedula."') and empresa='".$empresa."'";
         
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             
             $codigo = odbc_result($result, 1);
             $cedula_ruc = odbc_result($result, 2);
             $nombre= utf8_encode(odbc_result($result, 3));
             $direccion1= utf8_encode(odbc_result($result, 4));
             
             $telefono= utf8_encode(odbc_result($result, 5));
             $e_mail= utf8_encode(odbc_result($result, 6));
             $vendedor= odbc_result($result, 7);
             $zona= odbc_result($result, 8);
             
             $p=new Cliente($codigo, $cedula_ruc,$nombre,$direccion1,$telefono,$e_mail,$vendedor,$zona);
             $p->SetDeuda(odbc_result($result, 9));
             
             $this->clientes[]=$p->getJsonData();
         }   
      
         $resultado=new Dato($this->clientes);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
}
$cliente=new ClientePorCedulaCodigoController($connect);
$cliente->Buscar($_GET["empresa"],$_GET["cedula"]);