<?php

require_once('../index.php');

class ModificarBodegaController 
{
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
    public function ModificarCuerpo($cod_proforma,$empresa,$data)
    {
        $decoded = json_decode($data,true);
        foreach ($decoded as $value)
        {
         $cantidad=$value["cantidad"];
         $valor=$value["valor"];
         $impuesto=$value["impuesto"];
         
         $valor1=$value["valor1"];
         $ubicacion=$value["ubicacion"];
         $secuencia=$value["secuencia"];
         $descuento=$value["descuento"];
         
             
         $query;
         if($secuencia=="")
         {
          $query ="insert into in_movimiento(empresa,tipo,documento,cantidad,valor,descuento,impuesto,producto,bonificacion,valor1,promedio,costo,ubicacion,serie,cajas,unidades)
                              values('".$empresa."','NC','".$cod_proforma."',".$cantidad.",".$valor.",0,0,'".$value["codproducto"]."',0,".$valor1.",0,".$valor.",'".$ubicacion."','',0,0)";
         }
         else
         {
             $query ="UPDATE in_movimiento SET cantidad=".$cantidad.",valor=".$valor.",impuesto=".$impuesto.",valor1=".$valor1.",ubicacion='".$ubicacion."',descuento=".$descuento." WHERE empresa='".$empresa."' and secuencia=".$secuencia;
             
         }
         odbc_exec($this->connect, $query);
         
        
        }
    }    
    
    public function ModificarCabecera($cod_proforma,$empresa,$f_i)
    {
        $query ="UPDATE in_cabecera set fecha='".$f_i."' WHERE empresa='".$empresa."' and tipo='NC' and documento='".$cod_proforma."'";
         odbc_exec($this->connect, $query);
    }
    
    public function Modificar($cod_proforma,$empresa,$f_i,$data)//de las ventas
    {
       $this->ModificarCabecera($cod_proforma, $empresa,$f_i);
       $this->ModificarCuerpo($cod_proforma, $empresa, $data);
      
      odbc_close($this->connect);   
    }
}
$c=new ModificarBodegaController ($connect);
$c->Modificar($_POST["cod_proforma"],$_POST["empresa"],$_POST["f_i"],$_POST["data"]);