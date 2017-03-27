<?php
require_once('../index.php');
class UltimoProveedorController {
   private $connect;
    

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    
    } 
    
   public function UltimoCodigoProveedor($empresa)
    {
        $query ="select count(*),max(cast(codigo as integer)) from in_proveedor where empresa='".$empresa."'";
        $result = odbc_exec($this->connect, $query);

         while(odbc_fetch_row($result))
         {
             if(odbc_result($result, 1)>0)
                     echo odbc_result($result, 2)+1;
             else
                 echo 1;
         } 
         odbc_close($this->connect); 
    }  
}
$c=new UltimoProveedorController($connect);
$c->UltimoCodigoProveedor($_POST["empresa"]);