<?php

require_once('../index.php'); 
class EliminarProveedorController {
    private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
    function Verificar($cod_proveedor,$empresa)
    {
        $query ="select count(in_cabecera.pro_cli) from in_cabecera where "
                . "'".$cod_proveedor."' = in_cabecera.pro_cli and in_cabecera.empresa = '".$empresa."' and in_cabecera.tipo = 'CP'";
         $result= odbc_exec($this->connect, $query);
         while(odbc_fetch_row($result))
         {
             return odbc_result($result, 1);
         }
         
    }
  
    public function Eliminar($cod_proveedor,$empresa)
    {
        if($this->Verificar($cod_proveedor, $empresa)==0)
        {
         $query ="delete from in_proveedor where empresa='".$empresa."' and codigo='".$cod_proveedor."';";
         odbc_exec($this->connect, $query);
        }
        else
           echo "NotEmpty"; 
        
         odbc_close($this->connect);  
    }
}
$c=new EliminarProveedorController ($connect);
$c->Eliminar($_POST["cod_proveedor"],$_POST["empresa"]);