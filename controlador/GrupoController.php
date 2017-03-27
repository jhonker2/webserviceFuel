<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Grupo.php');
require_once('../modelo/Dato.php');

class GrupoController 
{
    
    private $connect;
    private $grupos;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->grupos=array();
    } 
    
    public function Get($empresa)
    {
         $query = "select codigo,grupo from in_grupo where empresa='".$empresa."' order by grupo";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {

             $grupo = utf8_encode(odbc_result($result, 2));
             $codigo = odbc_result($result, 1);
             
             $c=new Grupo($codigo, $grupo);
             
             $this->grupos[]=$c->getJsonData();
         }
         
         
         $resultado=new Dato($this->grupos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
    
    
}
$grupo=new GrupoController($connect);
$grupo->Get($_GET["empresa"]);