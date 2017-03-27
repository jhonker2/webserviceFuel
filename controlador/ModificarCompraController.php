<?php

require_once('../index.php');

class ModificarCompraController 
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
            $query ="insert into in_movimiento(empresa,tipo,documento,cantidad,valor,descuento,impuesto,producto,bonificacion,valor1,promedio,costo,ubicacion,serie,cajas,unidades)
                              values('".$empresa."','CP','".$cod_proforma."',".$cantidad.",".$valor.",".$descuento.",".$impuesto.",'".$value["codproducto"]."',0,".$valor1.",0,".$valor.",'".$ubicacion."','',0,0)";
         }
         else
         {
             $query ="UPDATE in_movimiento SET cantidad=".$cantidad.",valor=".$valor.",impuesto=".$impuesto.",valor1=".$valor1.",ubicacion='".$ubicacion."',descuento=".$descuento." WHERE empresa='".$empresa."' and secuencia=".$secuencia;
             
         }
         odbc_exec($this->connect, $query);
         
        
        }
    }    
    
    public function ModificarCabecera($cod_proforma,$empresa,$f_i,$f_f,$cod_proveedor,$estacion,$punto,$referencia,$autorizacion,$r_iva,$r_fuente)
    {
        $query ="UPDATE in_cabecera set fecha='".$f_i."',fechav='".$f_f."',pro_cli='".$cod_proveedor."',estacion='".$estacion."',punto='".$punto."',referencia='".$referencia."',accion_usuario='".$autorizacion."',contabilidad='".$r_iva."',contabiliza_tran='".$r_fuente."' WHERE empresa='".$empresa."' and tipo='CP' and documento='".$cod_proforma."'";
         odbc_exec($this->connect, $query);
    }
    
    public function Modificar($cod_proforma,$empresa,$f_i,$f_f,$cod_proveedor,$estacion,$punto,$referencia,$autorizacion,$r_iva,$r_fuente,$data)//de las ventas
    {
       $this->ModificarCabecera($cod_proforma, $empresa,$f_i,$f_f,$cod_proveedor,$estacion,$punto,$referencia,$autorizacion,$r_iva,$r_fuente);
       $this->ModificarCuerpo($cod_proforma, $empresa, $data);
      
      odbc_close($this->connect);   
    }
}
$c=new ModificarCompraController ($connect);
$c->Modificar($_POST["cod_proforma"],$_POST["empresa"],$_POST["f_i"],$_POST["f_f"],$_POST["cod_cliente"],$_POST["estacion"],$_POST["punto"],$_POST["referencia"],$_POST["autorizacion"],$_POST["r_iva"],$_POST["r_fuente"],$_POST["data"]);