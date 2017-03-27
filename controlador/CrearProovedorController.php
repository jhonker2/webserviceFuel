<?php

require_once('../index.php');
class CrearProovedorController {
    private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
    public function NuevoCodigoProveedor($empresa)
    {
        $query ="select count(*),max(cast(codigo as integer)) from in_proveedor where empresa='".$empresa."'";
        $result = odbc_exec($this->connect, $query);

         while(odbc_fetch_row($result))
         {
             if(odbc_result($result, 1)>0)
                     return odbc_result($result, 2)+1;
             else
                 return 1;
         } 
         
    }  
    public function Insertar($cod_cliente,$empresa,$cedula_ruc,$nombre,$direccion1,$ciudad,$telefono,$fax,$e_mail,$fuente,$iva)
    {
        $query ="insert into in_proveedor(codigo,empresa,nombre,direccion1,telefono,cedula,ciudad,e_mail,fax,fuente,iva) 
                                    values('".$cod_cliente."','".$empresa."','".$nombre."','".$direccion1."','".$telefono."','".$cedula_ruc."','".$ciudad."','".$e_mail."','".$fax."','".$fuente."','".$iva."')";
         odbc_exec($this->connect, $query);
    }
    
    public function Crear($empresa,$cedula_ruc,$nombre,$direccion1,$ciudad,$telefono,$fax,$e_mail,$fuente,$iva)//de las ventas
    {
      $cod_nuevo=$this->NuevoCodigoProveedor($empresa);
      $this->Insertar($cod_nuevo,$empresa,$cedula_ruc,$nombre,$direccion1,$ciudad,$telefono,$fax,$e_mail,$fuente,$iva);
      odbc_close($this->connect);   
    }
}

$c=new CrearProovedorController($connect);
$c->Crear($_POST["empresa"],$_POST["cedula_ruc"],$_POST["nombre"],$_POST["direccion1"],$_POST["ciudad"],$_POST["telefono"],$_POST["fax"],$_POST["e_mail"],$_POST["fuente"],$_POST["iva"]);
