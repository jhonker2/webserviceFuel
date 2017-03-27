<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Vendedor.php');
require_once('../modelo/Dato.php');

class VendedorController {
    private $connect;
    private $vendedores;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->vendedores=array();
    } 
    
    public function Get($empresa)
    {
         $query = "SELECT nombre,codigo from in_vendedor where empresa='".$empresa."' order by nombre";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $nombre = utf8_encode(odbc_result($result, 1));
             $codigo = odbc_result($result, 2);
             
             $v=new Vendedor($codigo, $nombre);
             
             $this->vendedores[]=$v->getJsonData();
         }
         
         
         $resultado=new Dato($this->vendedores);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
}

$vendedor=new VendedorController($connect);
$vendedor->Get($_GET["empresa"]);