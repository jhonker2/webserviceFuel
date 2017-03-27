<?php

require_once('../index.php'); 

class ModificarClienteController 
{
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
  
    public function Modificar($cod_cliente,$empresa,$cedula_ruc,$nombre,$direccion1,$telefono,$e_mail,$vendedor,$zona)
    {
        $query ="update in_cliente set cedula_ruc='".$cedula_ruc."',nombre='".$nombre."',direccion1='".$direccion1."',telefono='".$telefono."',e_mail='".$e_mail."',vendedor='".$vendedor."',zona='".$zona."' where empresa='".$empresa."' and codigo='".$cod_cliente."'";
         odbc_exec($this->connect, $query);
         odbc_close($this->connect);  
    }
    
   
}
$c=new ModificarClienteController($connect);
$c->Modificar($_POST["cod_cliente"],$_POST["empresa"],$_POST["cedula_ruc"],$_POST["nombre"],$_POST["direccion1"],$_POST["telefono"],$_POST["e_mail"],$_POST["vendedor"],$_POST["zona"]);