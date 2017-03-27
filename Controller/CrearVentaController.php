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
    public function NuevaReferencia($empresa){
        $query ="select count(*),max(cast(referencia as integer)) from in_cabecera where empresa='".$empresa."' and tipo='FC'";
        $result = odbc_exec($this->connect, $query);

         while(odbc_fetch_row($result))
         {
             if(odbc_result($result, 1)>0)
                     return odbc_result($result, 2)+1;
             else
                 return 1;
         } 
    }
    
    public function InsertarCuerpo($cod_proforma,$empresa,$movimiento)
    {
        $decoded = json_decode($movimiento,true);
        foreach ($decoded as $value)
        {
         $cantidad  =$value["cantidad"];
         $producto  =$value["producto"];
         $impuesto  =$value["impuesto"];
         $valor1    =$value["valor1"];
         $costo     =$value["Costo"];
         $valor     =$value["valor"];
               
         $query ="insert into in_movimiento(empresa,tipo,documento,cantidad,valor,descuento,impuesto,lista,producto,bonificacion,valor1,promedio,costo,ubicacion,ice,subsidio) values('".$empresa."','FC','".$cod_proforma."',".$cantidad.",".$valor.",0,".$impuesto.",0,'".$producto."',0,".$valor1.",0,".$costo.",1,0,0)";
         odbc_exec($this->connect, $query);
        }
    }    
    
    public function InsertarCabecera($cod_proforma,$empresa,$cabecera, $referencia)
    {
        $decoded2 = json_decode($cabecera,true);
        foreach ($decoded2 as $value) {
            $fecha          =$value["fecha"];
            $fechav         =$value["fechav"];
            $cod_cliente    =$value["cod_cliente"];
            $vendedor       =$value["vendedor"];
            $caja           =$value["caja"];
            $estado         =$value["estado"];
            $surtidor       =$value["surtidor"];
            $usuario        =$value["usuario"];
            $nombretrans    =$value["nombretrans"];
            $cedulatrans    =$value["cedulatrans"];
            $direcciontrans =$value["direciontrans"];
            $punto          =$value["punto"];
            $estacion       =$value["estacion"];
            $codsurtidor    =$value["Codsurtidor"];

            $query ="insert into in_cabecera(tipo,documento,empresa,fecha,fechav,pro_cli,vendedor,caja,descuento,impuesto,stado,usuario,nombre_trans,cedula_trans,direccion_dest,referencia,punto,estacion,surtidor)"
                . " values('FC','".$cod_proforma."','".$empresa."','".$fecha."','".$fechav."','".$cod_cliente."','".$vendedor."','".$caja."',0,0,'".$estado."','".$usuario."','".$nombretrans."','".$cedulatrans."','".$direcciontrans."','".$referencia."','".$punto."','".$estacion."','".$codsurtidor."')";
            odbc_exec($this->connect, $query);    
        }
        
    }
    public function InsertarCxCAuxiliar($cod_proforma,$empresa,$cxc,$refe){
        $decoded3 = json_decode($cxc,true);
        foreach ($decoded3 as $value) {
            $fechae     =$value["fechae"];
            $fechav     =$value["fechav"];
            $valor      =$value["valor"];
            $entidad    =$value["entidad"];
            $estacion   =$value["estacion"];
            $punto      =$value["punto"];

            $referencia=$estacion.' - '.$punto.' - '.$refe;

            $query ="insert into cxc_auxiliar(tipo,documento,empresa,fechae,fechav,valor,forma_pago,entidad,referencia)"
                . " values('FC','".$cod_proforma."','".$empresa."','".$fechae."','".$fechav."','".$valor."',1,'".$entidad."','".$referencia."')";
            odbc_exec($this->connect, $query);   
            
        }
    }
    
    public function Crear($empresa,$cabecera,$movimiento,$cxc_auxiliar)//de las ventas
    {
      $cod_nuevo=$this->NuevoCodigoVenta($empresa);
      $new_reference=$this->NuevaReferencia($empresa);
      
       $this->InsertarCabecera($cod_nuevo, $empresa, $cabecera,$new_reference);
       $this->InsertarCuerpo($cod_nuevo, $empresa, $movimiento);
       $this->InsertarCxCAuxiliar($cod_nuevo,$empresa,$cxc_auxiliar,$new_reference);
      
      odbc_close($this->connect);   
    }
}
$c=new CrearVentaController($connect);
$c->Crear($_POST["empresa"],$_POST["cabecera"],$_POST["movimiento"],$_POST["cxcAux"]);