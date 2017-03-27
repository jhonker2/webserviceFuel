<?php

require_once('../index.php');

class CrearVentaController {
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
    public function NuevoCodigoVenta($empresa)
    {
        $query ="select count(*),max(cast(documento as integer)) from in_cabecera where empresa='".$empresa."' and tipo='FC'";
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
               
         $query ="insert into in_movimiento(empresa,tipo,documento,cantidad,valor,descuento,impuesto,lista,producto,bonificacion,valor1,promedio,costo,ubicacion,numprecio,serie,cajas,unidades)
                                              values('".$empresa."','FC','".$cod_proforma."',".$cantidad.",".$valor.",".$descuento.",".$impuesto.",'".$lista."','".$codproducto."',0,".$valor1.",0,0,'".$ubicacion."','".$lista."','',0,0)";
         odbc_exec($this->connect, $query);
        }
    }    
    
    public function InsertarCabecera($cod_proforma,$empresa,$f_i,$f_f,$cod_cliente,$cod_vendedor,$cod_caja,$estado_factura)
    {
        $query ="insert into in_cabecera(tipo,documento,empresa,fecha,fechav,pro_cli,vendedor,caja,descuento,impuesto,transporte,stado)"
                . " values('FC','".$cod_proforma."','".$empresa."','".$f_i."','".$f_f."','".$cod_cliente."','".$cod_vendedor."','".$cod_caja."',0,0,0,'".$estado_factura."')";
         odbc_exec($this->connect, $query);
    }
    
    public function Crear($empresa,$f_i,$f_f,$cod_cliente,$cod_vendedor,$cod_caja,$data,$estado_factura)//de las ventas
    {
      $cod_nuevo=$this->NuevoCodigoVenta($empresa);
      
       $this->InsertarCabecera($cod_nuevo, $empresa, $f_i, $f_f, $cod_cliente, $cod_vendedor, $cod_caja,$estado_factura);
       $this->InsertarCuerpo($cod_nuevo, $empresa, $data);
      
      odbc_close($this->connect);   
    }
}
$c=new CrearVentaController($connect);
$c->Crear($_POST["empresa"],$_POST["f_i"],$_POST["f_f"],$_POST["cod_cliente"],$_POST["cod_vendedor"],$_POST["cod_caja"],$_POST["data"],$_POST["estado_factura"]);