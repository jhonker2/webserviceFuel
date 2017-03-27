<?php

require_once('../index.php');

class UltimoClienteController {
    private $connect;
    

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    
    } 
    
    public function Buscar($empresa)//de las ventas
    {    
         $query = "select count(*),max(cast(codigo as integer)) from in_cliente where empresa='".$empresa."'";
         
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
$c=new UltimoClienteController($connect);
$c->Buscar($_POST["empresa"]);