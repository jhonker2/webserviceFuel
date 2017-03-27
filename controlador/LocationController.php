<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Location.php');
require_once('../modelo/Dato.php');

class LocationController 
{
    
    private $connect;
    private $locations;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->locations=array();
    } 
    
    public function Get($empresa,$vendedor,$fecha)
    {
         $query = "SELECT latitud,longitud,hora,documento,nombre from in_cabecera_proforma inner join in_cliente on in_cabecera_proforma.pro_cli=in_cliente.codigo and in_cabecera_proforma.empresa=in_cliente.empresa where in_cabecera_proforma.empresa='".$empresa."' and in_cabecera_proforma.vendedor='".$vendedor."' and fecha='".$fecha."' and latitud!='' and longitud!='' order by hora";
         $result = odbc_exec($this->connect, $query);
         while(odbc_fetch_row($result))
         {
             $lat =  odbc_result($result, 1);
             $lon = odbc_result($result, 2);
             $hora = odbc_result($result, 3);
             $documento = odbc_result($result, 4);
             $nombre = odbc_result($result, 5);
             
             $c=new Location($lat,$lon,$hora,$nombre,$documento);
             
             $this->locations[]=$c->getJsonData();
         }
         $resultado=new Dato($this->locations);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
}
$caja=new LocationController ($connect);
$caja->Get($_GET["empresa"],$_GET["vendedor"],$_GET["fecha"]);