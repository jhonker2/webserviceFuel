<?php

require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Kardex.php');
require_once('../modelo/Dato.php');

class KardexController {
    private $connect;
    private $kardex;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->kardex=array();
    } 
    
    public function Buscar($empresa,$cod_cliente,$fechae,$fechaev,$tipo)//de las ventas
    {
       $query = "call web_kardex_cliente('".$empresa."','".$cod_cliente."','".$fechae."','".$fechaev."','".$tipo."')";
       $result = odbc_exec($this->connect, $query);

       $saldo=0;
       
       $i=0;
       
         while(odbc_fetch_row($result))
         { 
             $codigo = odbc_result($result, 1);
             $documento = odbc_result($result, 2);
             $fechae= utf8_encode(odbc_result($result, 3));
             $fechav= utf8_encode(odbc_result($result, 4));
             
             $concepto= utf8_encode(odbc_result($result, 5));
             $tipo= utf8_encode(odbc_result($result, 6));
             $valor= odbc_result($result, 7);
       
             $saldoanterior= odbc_result($result, 10);
             
             if($i==0)
                 $saldo=$saldoanterior;
             
             if($tipo=='D')
                 $saldo+=$valor;
             else
                 $saldo-=$valor;
             
             $observacion= odbc_result($result, 9);
            
             
             //$codigo,$documento,$fechae,$fechav,$concepto,$tipo,$valor,$saldo,$observacion,$saldoanterior
             
             $p=new Kardex($codigo, $documento,$fechae,$fechav,$concepto,$tipo,$valor,$saldo,$observacion,$saldoanterior);
             
             $this->kardex[]=$p->getJsonData();
             
             $i++;
         }
         $resultado=new Dato($this->kardex);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }   
}

$cliente=new KardexController($connect);
$cliente->Buscar($_GET["empresa"],$_GET["cod_cliente"],$_GET["fechae"],$_GET["fechav"],$_GET["tipo"]);