<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Location.php');
require_once('../modelo/Dato.php');

class LocationMultipleController 
{
    
    private $connect;
    private $locations;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->locations=array();
    } 
    
    public function Get($empresa,$fecha)
    {
         $query = "select v.nombre,cab.latitud,cab.longitud,cab.hora from in_cabecera_proforma as cab,in_vendedor as v where cab.vendedor=v.codigo and cab.empresa=v.empresa and cab.empresa='".$empresa."' and cab.tipo='fc' and cab.documento in (select max(cast(c.documento as integer)) from in_cabecera_proforma as c where c.empresa=cab.empresa and c.tipo='fc' and not c.hora is null and c.fecha='".$fecha."' group by c.vendedor)";
         $result = odbc_exec($this->connect, $query);
         while(odbc_fetch_row($result))
         {
             $vendedor =  utf8_encode(odbc_result($result, 1));
             $lat =  odbc_result($result, 2);
             $lon = odbc_result($result, 3);
             $hora = odbc_result($result, 4);
             
             $c=new Location($lat, $lon,$hora,"","");
             $c->SetVendedor($vendedor);
             
             $this->locations[]=$c->getJsonData();
         }
         $resultado=new Dato($this->locations);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
}
$caja=new LocationMultipleController ($connect);
$caja->Get($_GET["empresa"],$_GET["fecha"]);