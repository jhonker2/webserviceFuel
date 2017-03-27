<?php

require_once('../index.php');

class CrearClienteController {
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
    public function NuevoCodigoCliente($empresa)
    {
        $query ="select count(*),max(cast(codigo as integer)) from in_cliente where empresa='".$empresa."'";
        $result = odbc_exec($this->connect, $query);

         while(odbc_fetch_row($result))
         {
             if(odbc_result($result, 1)>0)
                return odbc_result($result, 2)+1;
             else
                return 1;
         } 
         
    }  
    public function Insertar($cod_cliente,$empresa,$cedula_ruc,$nombre,$direccion1,$telefono,$vendedor,$zona)
    {
        $query ="INSERT INTO in_cliente(codigo,empresa,cedula_ruc,nombre,direccion1,telefono,vendedor,zona) VALUES('".$cod_cliente."','".$empresa."','".$cedula_ruc."','".$nombre."','".$direccion1."','".$telefono."','".$vendedor."','".$zona."')";
         odbc_exec($this->connect, $query);
    }
    
    public function Crear($empresa,$cedula_ruc,$nombre,$direccion1,$telefono,$vendedor,$zona)//de las ventas
    {
      $cod_nuevo=$this->NuevoCodigoCliente($empresa);
      $this->Insertar($cod_nuevo, $empresa, $cedula_ruc, $nombre, $direccion1, $telefono,$vendedor,$zona);
      odbc_close($this->connect);

         
    }
}
$c=new CrearClienteController($connect);
$c->Crear($_POST["empresa"],$_POST["cedula_ruc"],$_POST["nombre"],$_POST["direccion1"],$_POST["telefono"],$_POST["vendedor"],$_POST["zona"]);