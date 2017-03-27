<?php

require_once('../index.php');

class CrearCompraController {
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
    public function NuevoCodigoCompra($empresa)
    {
        $query ="select count(*),max(cast(documento as integer)) from in_cabecera where empresa='".$empresa."' and tipo='CP'";
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
         $impuesto=$value["impuesto"];
         $lista=$value["lista"];
         $codproducto=$value["codproducto"];
         $valor1=$value["valor1"];
         $ubicacion=$value["ubicacion"];
         $descuento=$value["descuento"];
               
         $query ="insert into in_movimiento(empresa,tipo,documento,cantidad,valor,descuento,impuesto,producto,bonificacion,valor1,promedio,costo,ubicacion,serie,cajas,unidades)
                              values('".$empresa."','CP','".$cod_proforma."',".$cantidad.",".$valor.",".$descuento.",".$impuesto.",'".$codproducto."',0,".$valor1.",0,".$valor.",'".$ubicacion."','',0,0)";
          odbc_exec($this->connect, $query);
       //  echo $query;
        }
    }    
    
    public function InsertarCabecera($cod_proforma,$empresa,$f_i,$f_f,$cod_proveedor,$estacion,$punto,$referencia,$autorizacion,$r_iva,$r_fuente)
    {
        $query ="insert into in_cabecera(tipo,documento,empresa,fecha,fechav,pro_cli,estacion,punto,descuento,impuesto,transporte,referencia,accion_usuario,contabilidad,contabiliza_tran)"
                . " values('CP','".$cod_proforma."','".$empresa."','".$f_i."','".$f_f."','".$cod_proveedor."','".$estacion."','".$punto."',0,0,0,'".$referencia."','".$autorizacion."','".$r_iva."','".$r_fuente."')";
         odbc_exec($this->connect, $query);
    }
    
    public function Crear($empresa,$f_i,$f_f,$cod_proveedor,$estacion,$punto,$referencia,$autorizacion,$r_iva,$r_fuente,$data)//de las ventas
    {
      $cod_nuevo=$this->NuevoCodigoCompra($empresa);
      
       $this->InsertarCabecera($cod_nuevo,$empresa,$f_i,$f_f,$cod_proveedor,$estacion,$punto,$referencia,$autorizacion,$r_iva,$r_fuente);
       $this->InsertarCuerpo($cod_nuevo, $empresa, $data);
      
      odbc_close($this->connect);   
    }
}
$c=new CrearCompraController ($connect);
$c->Crear($_POST["empresa"],$_POST["f_i"],$_POST["f_f"],$_POST["cod_cliente"],$_POST["estacion"],$_POST["punto"],$_POST["referencia"],$_POST["autorizacion"],$_POST["r_iva"],$_POST["r_fuente"],$_POST["data"]);