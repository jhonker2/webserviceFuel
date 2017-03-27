<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Proveedor.php');
require_once('../modelo/Dato.php');

class ProveedorController 
{
    private $connect;
    private $proveedores;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->proveedores=array();
    } 
    
    public function InformeProovedores($empresa,$filtro)//de las ventas
    {
        $query ;
         if($filtro!="vacio")
         $query = "SELECT codigo,cedula,nombre,direccion1,ciudad,telefono,e_mail,fax,fuente,iva from in_proveedor where empresa='".$empresa."' and nombre like '%".$filtro."%'";
         else
          $query = "SELECT codigo,cedula,nombre,direccion1,ciudad,telefono,e_mail,fax,fuente,iva from in_proveedor where empresa='".$empresa."'";
             
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $codigo = odbc_result($result, 1);
             $cedula = odbc_result($result, 2);
             $nombre= utf8_encode(odbc_result($result, 3));
             $direccion1= utf8_encode(odbc_result($result, 4));
             
             $ciudad = odbc_result($result, 5);
             $telefono = odbc_result($result, 6);
             $e_mail= utf8_encode(odbc_result($result, 7));
             $fax= utf8_encode(odbc_result($result, 8));
             $fuente= utf8_encode(odbc_result($result, 9));
             $iva= utf8_encode(odbc_result($result, 10));
             
             $p=new Proveedor($codigo, $cedula,$nombre,$direccion1,$ciudad,$telefono,$e_mail,$fax,$fuente,$iva);
             
             $this->proveedores[]=$p->getJsonData();
         }
         
         
         $resultado=new Dato($this->proveedores);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }       
}
$proovedor=new ProveedorController($connect);
$proovedor->InformeProovedores($_GET["empresa"],$_GET["filtro"]);