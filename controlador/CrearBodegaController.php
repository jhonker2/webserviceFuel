<?php

require_once('../index.php');

class CrearBodegaController {
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
    public function NuevoCodigoCompra($empresa)
    {
        $query ="select count(*),max(cast(documento as integer)) from in_cabecera where empresa='".$empresa."' and tipo='NC'";
        $result = odbc_exec($this->connect, $query);

         while(odbc_fetch_row($result))
         {
             if(odbc_result($result, 1)>0)
                     return odbc_result($result, 2)+1;
             else
                 return 1;
         } 
         
    }
    
    public function InsertarCuerpo($cod_proforma,$empresa,$data)
    {
        $decoded = json_decode($data,true);
        foreach ($decoded as $value)
        {
         $cantidad=$value["cantidad"];
         $valor=$value["valor"];
         
         
         $codproducto=$value["codproducto"];
         $valor1=$value["valor1"];
         $ubicacion=$value["ubicacion"];
         
               
         $query ="insert into in_movimiento(empresa,tipo,documento,cantidad,valor,descuento,impuesto,producto,bonificacion,valor1,promedio,costo,ubicacion,serie,cajas,unidades)
                              values('".$empresa."','NC','".$cod_proforma."',".$cantidad.",".$valor.",0,0,'".$codproducto."',0,".$valor1.",0,".$valor.",'".$ubicacion."','',0,0)";
          odbc_exec($this->connect, $query);
       //  echo $query;
        }
    }    
    
    public function InsertarCabecera($cod_proforma,$empresa,$f_i)
    {
        $query ="insert into in_cabecera(tipo,documento,empresa,fecha,descuento,impuesto,transporte)"
                . " values('NC','".$cod_proforma."','".$empresa."','".$f_i."',0,0,0)";
         odbc_exec($this->connect, $query);
    }
    
    public function Crear($empresa,$f_i,$data)//de las ventas
    {
      $cod_nuevo=$this->NuevoCodigoCompra($empresa);
      
       $this->InsertarCabecera($cod_nuevo,$empresa,$f_i);
       $this->InsertarCuerpo($cod_nuevo, $empresa, $data);
      
      odbc_close($this->connect);   
    }
}
$c=new CrearBodegaController ($connect);
$c->Crear($_POST["empresa"],$_POST["f_i"],$_POST["data"]);