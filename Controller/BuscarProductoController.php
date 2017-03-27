<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Productos.php');
require_once('../modelo/Dato.php');

class BuscarProductoController
{
    private $connect;
    private $productos;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->productos=array();
    } 
    

     public function Buscar($empresa, $codigo){
        $query = "SELECT codigo,empresa,descripcion1,pvp1,iva,costo from in_item  where empresa='".$empresa."' and codigo=".$codigo;
         $result = odbc_exec($this->connect, $query);
        
        while(odbc_fetch_row($result))
         {
             $codigo2  = odbc_result($result, 1);
             $empresa2  = odbc_result($result, 2);
             $descripcion = odbc_result($result, 3);
             $pvp = odbc_result($result, 4);
             $iva = odbc_result($result, 5);
             $costo = odbc_result($result, 6);

             if($iva=="S"){
                $iva2=$this->buscar_iva($empresa);
                $v=new Productos($codigo2, $empresa2,$descripcion,$pvp,$iva,$iva2,$costo);
                $this->productos[]=$v->getJsonData();
                }
             else{
                $v=new Productos($codigo2, $empresa2,$descripcion,$pvp,$iva,"0.00",$costo);
                $this->productos[]=$v->getJsonData();
             }
             
         }
         
         $resultado=new Dato($this->productos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }


    public function buscar_iva($empresa){
        $query = "SELECT p.parametro from ge_parametros as p  where p.empresa ='".$empresa."'and p.codigo=17";
            $result = odbc_exec($this->connect, $query);
                while(odbc_fetch_row($result))
                    {
                    $parametro = odbc_result($result, 1);
                    }
        return $parametro;
    } 
}

$producto=new BuscarProductoController($connect);
$producto->Buscar($_GET["empresa"],$_GET["codigo"]);
