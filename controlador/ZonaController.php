<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Zona.php');
require_once('../modelo/Dato.php');
class ZonaController {
    private $connect;
    private $zonas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->zonas=array();
    }
    
    public function Get($empresa)
    {
         $query = "SELECT codigo,zona from in_zona where empresa='".$empresa."'";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $codigo = odbc_result($result, 1);
             $zona =utf8_encode( odbc_result($result, 2));
             
             $e=new Zona($codigo, $zona);
             
             $this->zonas[]=$e->getJsonData();
         }
         
         $resultado=new Dato($this->zonas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
    

}
$empresa=new ZonaController($connect);
$empresa->Get($_GET["empresa"]);