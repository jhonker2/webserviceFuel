<?php
require_once('../index.php');

class UltimaVentaController 
{
   private $connect;
    

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    
    } 
    
    public function Buscar($empresa)//de las ventas
    {    
         $query = "select count(*),max(cast(documento as integer)) from in_cabecera where empresa='".$empresa."' and tipo='FC'";
         
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
$c=new UltimaVentaController($connect);
$c->Buscar($_POST["empresa"]);