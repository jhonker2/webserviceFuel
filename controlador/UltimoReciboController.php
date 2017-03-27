<?php
require_once('../index.php');

class UltimaReciboController 
{
   private $connect;
    

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    
    } 
    
    public function Buscar($empresa)//de las ventas
    {    
         $query = "SELECT  MAX(cast(recibo as decimal ))   FROM CXC_AUXILIAR WHERE EMPRESA='".$empresa."' and not recibo is null and recibo <> ''";
         
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             if(odbc_result($result, 1)>0)
                     echo odbc_result($result, 1)+1;
             else
                 echo 1;
         }
         
        
         odbc_close($this->connect);   
    }   
}
$c=new UltimaReciboController($connect);
$c->Buscar($_GET["empresa"]);