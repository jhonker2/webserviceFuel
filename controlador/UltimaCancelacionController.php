<?php
require_once('../index.php');

class UltimaCancelacionController 
{
   private $connect;
    

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    
    } 
    
    public function Buscar($empresa)//de las ventas
    {    
         $query = "SELECT  MAX(cast(NUMERO_1 as decimal ))  FROM CXC_AUXILIAR WHERE EMPRESA='".$empresa."' and not NUMERO_1 is null and NUMERO_1 <> ''";
         
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
$c=new UltimaCancelacionController($connect);
$c->Buscar($_GET["empresa"]);