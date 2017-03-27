<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Documento.php');
require_once('../modelo/Dato.php');

class DocumentoController 
{
    
    private $connect;
    private $documentos;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->documentos=array();
    } 
    
    public function Get($empresa,$documento,$codigo,$forma)
    {
         $query = "call web_in_cuerpo_inv_fisico_producto('".$empresa."','".$documento."','IF','".$codigo."','".$forma."')";
         $result = odbc_exec($this->connect, $query);

         while(odbc_fetch_row($result))
         {
            
             $codigo = utf8_encode(odbc_result($result, 1));
             $descripcion = utf8_encode(odbc_result($result, 2));
             $cantidad = odbc_result($result, 3);
             $valor = odbc_result($result, 4);
             
             $secuencia= utf8_encode(odbc_result($result, 7));
             $ubicacion = odbc_result($result, 9);
             $existencia = odbc_result($result, 11);
             $barra = odbc_result($result, 12);
             
             $pvp1= utf8_encode(odbc_result($result, 13));
             $linea =utf8_encode( odbc_result($result, 14));
             $marca = utf8_encode(odbc_result($result, 15));
             $grupo = utf8_encode(odbc_result($result, 16));
             
             
             $c=new Documento($codigo,$descripcion,$cantidad,$valor,$secuencia,$ubicacion,$existencia,$barra,$pvp1,$linea,$marca,$grupo);
             
             $this->documentos[]=$c->getJsonData();
         }
         
         $resultado=new Dato($this->documentos);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
    
    
}
$caja=new DocumentoController($connect);
$caja->Get($_GET["empresa"],$_GET["documento"],$_GET["codigo"],$_GET["forma"]);