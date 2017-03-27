<?php

require_once('../index.php');

class CrearCancelacionController {
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    }
    
    public function NuevoCodigoCancelacion($empresa)
    {
        $query = "SELECT MAX(cast(NUMERO_1 as decimal )) FROM CXC_AUXILIAR WHERE EMPRESA='".$empresa."' and not NUMERO_1 is null and NUMERO_1 <> ''";
         $result = odbc_exec($this->connect, $query);
         while(odbc_fetch_row($result))
         {
             if(odbc_result($result, 1)>0)
                     return odbc_result($result, 1)+1;
             else
                 return 1;
         }
    }  
    
    public function  NuevoCodigoRecibo($empresa)
    {
         $query = "SELECT MAX(cast(recibo as decimal )) FROM CXC_AUXILIAR WHERE EMPRESA='".$empresa."' and not recibo is null and recibo <> ''";
         $result = odbc_exec($this->connect, $query);
         while(odbc_fetch_row($result))
         {
             if(odbc_result($result, 1)>0)
                     return odbc_result($result, 1)+1;
             else
                 return 1;
         }
         odbc_close($this->connect);   
    }


    public function Insertar($cod_cancelacion,$cod_recibo,$empresa,$tipo,$numero,$cuenta,$entidad,$cod_pago,$cod_banco,$emision,$vencimiento,$descuento,$data)
    {
        $decoded = json_decode($data,true);
        foreach ($decoded as $value)
        {
         $cod_factura=$value["cod_factura"];
         $valor=$value["valor"];
         $retencion_f=$value["retencion_f"];
         $retencion_i=$value["retencion_i"];
         $descuento=$value["descuento"];
         
         $query ="insert into Cxc_auxiliar (empresa,Tipo,documento,numero,numero_1,cuenta,valor,referencia,Entidad,forma_pago,Banco,fechae,fechav,retencion,ret_iva,recibo,DESCUENTO)
			values('".$empresa."','".$tipo."','".$cod_factura."','".$numero."','".$cod_cancelacion."','".$cuenta."',".$valor.",'','".$entidad."',".$cod_pago.",".$cod_banco.",'".$emision."','".$vencimiento."',".$retencion_f.",".$retencion_i.",".$cod_recibo.",".$descuento.")";  
         odbc_exec($this->connect, $query);
        } 
    }
    
    public function Crear($empresa,$tipo,$numero,$cuenta,$entidad,$cod_pago,$cod_banco,$emision,$vencimiento,$descuento,$data)//de las ventas
    {
      $cod_cancelacion=$this->NuevoCodigoCancelacion($empresa);
      $cod_recibo=$this->NuevoCodigoRecibo($empresa);
      
      $this->Insertar($cod_cancelacion,$cod_recibo,$empresa,$tipo,$numero,$cuenta,$entidad,$cod_pago,$cod_banco,$emision,$vencimiento,$descuento,$data);
      odbc_close($this->connect);   
    }
}
$c=new CrearCancelacionController ($connect);
$c->Crear($_POST["empresa"],$_POST["tipo"],$_POST["numero"],$_POST["cuenta"],$_POST["entidad"],$_POST["cod_pago"],$_POST["cod_banco"],$_POST["emision"],$_POST["vencimiento"],$_POST["descuento"],$_POST["data"]);