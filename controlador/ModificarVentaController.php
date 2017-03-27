<?php

require_once('../index.php');

class ModificarVentaController 
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
         $lista=$value["lista"];
         $valor1=$value["valor1"];
         $ubicacion=$value["ubicacion"];
         $secuencia=$value["secuencia"];
         $descuento=$value["descuento"];
         
             
         $query;
         if($secuencia=="")
         {
            $query ="insert into in_movimiento(empresa,tipo,documento,cantidad,valor,descuento,impuesto,lista,producto,bonificacion,valor1,promedio,costo,ubicacion,numprecio,serie,cajas,unidades)
                                            values('".$empresa."','FC','".$cod_proforma."',".$cantidad.",".$valor.",".$descuento.",".$impuesto.",'".$lista."','".$value["codproducto"]."',0,".$valor1.",0,0,'".$ubicacion."','".$lista."','',0,0)";
         }
         else
         {
             $query ="UPDATE in_movimiento SET cantidad=".$cantidad.",valor=".$valor.",impuesto=".$impuesto.",lista='".$lista."',valor1=".$valor1.",ubicacion='".$ubicacion."',numprecio='".$lista."',descuento=".$descuento." WHERE empresa='".$empresa."' and secuencia=".$secuencia;
             
         }
         odbc_exec($this->connect, $query);
         
        
        }
    }    
    
    public function ModificarCabecera($cod_proforma,$empresa,$f_i,$f_f,$cod_cliente,$cod_vendedor,$cod_caja)
    {
        $query ="UPDATE in_cabecera set fecha='".$f_i."',fechav='".$f_f."',pro_cli='".$cod_cliente."',vendedor='".$cod_vendedor."',caja='".$cod_caja."' WHERE empresa='".$empresa."' and tipo='FC' and documento='".$cod_proforma."'";
        $result = odbc_exec($this->connect, $query);
    }
    
    public function Modificar($cod_proforma,$empresa,$f_i,$f_f,$cod_cliente,$cod_vendedor,$cod_caja,$data)//de las ventas
    {
       $this->ModificarCabecera($cod_proforma, $empresa, $f_i, $f_f, $cod_cliente, $cod_vendedor, $cod_caja);
       $this->ModificarCuerpo($cod_proforma, $empresa, $data);
      
      odbc_close($this->connect);   
    }
}
$c=new ModificarVentaController ($connect);
$c->Modificar($_POST["cod_proforma"],$_POST["empresa"],$_POST["f_i"],$_POST["f_f"],$_POST["cod_cliente"],$_POST["cod_vendedor"],$_POST["cod_caja"],$_POST["data"]);