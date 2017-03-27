<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Banco.php');
require_once('../modelo/Dato.php');

class BancoController 
{
    
    private $connect;
    private $bancos;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->bancos=array();
    } 
    
    public function Get($empresa)
    {
         $query = "SELECT secuencia, banco FROM ge_bancos where empresa='".$empresa."' order by banco";
         $result = odbc_exec($this->connect, $query);

         while(odbc_fetch_row($result))
         {
             $banco = utf8_encode(odbc_result($result, 2));
             $codigo = odbc_result($result, 1);
             
             $c=new Banco($codigo, $banco);
             
             $this->bancos[]=$c->getJsonData();
         }
         $resultado=new Dato($this->bancos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
    
    
}
$caja=new BancoController($connect);
$caja->Get($_GET["empresa"]);