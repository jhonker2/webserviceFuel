<?php
require_once('../index.php'); 
class ModificarProveedorController {
    private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
  
    public function Modificar($nombre,$direccion1,$telefono,$cedula,$ciudad,$e_mail,$fax,$fuente,$iva,$empresa,$codigo)
    {
         $query ="update in_proveedor set nombre='".$nombre."', direccion1='".$direccion1."', telefono='".$telefono."', cedula='".$cedula."',ciudad='".$ciudad."',e_mail='".$e_mail."',fax='".$fax."',fuente='".$fuente."',iva='".$iva."' where empresa='".$empresa."' and codigo='".$codigo."'";
         odbc_exec($this->connect, $query);
         odbc_close($this->connect);  
    }
}
$c=new ModificarProveedorController($connect);
$c->Modificar($_POST["nombre"],$_POST["direccion1"],$_POST["telefono"],$_POST["cedula_ruc"],$_POST["ciudad"],$_POST["e_mail"],$_POST["fax"],$_POST["fuente"],$_POST["iva"],$_POST["empresa"],$_POST["cod_cliente"]);