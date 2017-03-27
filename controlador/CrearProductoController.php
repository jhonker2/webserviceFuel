<?php
require_once('../index.php');

class CrearProductoController {
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
    public function NuevoCodigoProducto($empresa)
    {
        $query ="select count(*),max(cast(codigo as integer)) from in_item where empresa='".$empresa."'";
        $result = odbc_exec($this->connect, $query);

         while(odbc_fetch_row($result))
         {
             if(odbc_result($result, 1)>0)
                     return odbc_result($result, 2)+1;
             else
                 return 1;
         } 
         
    }  
    public function Insertar($cod_pro,$empresa,$descripcion,$codgrupo,$codLinea,$codMedida,$codigoBarra,$codMarca,$costo,$pvp1,$pvp2,$pvp3,$por1,$por2,$por3,$iva,$pvp4,$por4,$referencia,$aplicacion)
    {
        $query ="insert into  in_item(codigo,empresa,descripcion1,grupo,linea,medida,codigo_barra,Marca,Stock,costo,pvp1,pvp2,pvp3,por1,por2,por3,iva,pvp4,por4,referencia,aplicaccion) "
                . "values('".$cod_pro."','".$empresa."','".$descripcion."','".$codgrupo."','".$codLinea."','".$codMedida."','".$codigoBarra."','".$codMarca."','S',".$costo.",".$pvp1.",".$pvp2.",".$pvp3.",".$por1.",".$por2.",".$por3.",'".$iva."',".$pvp4.",".$por4.",'".$referencia."','".$aplicacion."');";
         odbc_exec($this->connect, $query);
    }
    
    public function Crear($empresa,$descripcion,$codgrupo,$codLinea,$codMedida,$codigoBarra,$codMarca,$costo,$pvp1,$pvp2,$pvp3,$por1,$por2,$por3,$iva,$pvp4,$por4,$referencia,$aplicacion)//de las ventas
    {
      $cod_nuevo=$this->NuevoCodigoProducto($empresa);
      $this->Insertar($cod_nuevo,$empresa,$descripcion,$codgrupo,$codLinea,$codMedida,$codigoBarra,$codMarca,$costo,$pvp1,$pvp2,$pvp3,$por1,$por2,$por3,$iva,$pvp4,$por4,$referencia,$aplicacion);
      odbc_close($this->connect);   
    }
}
$c=new CrearProductoController($connect);
$c->Crear($_POST["empresa"],$_POST["descripcion"],$_POST["codgrupo"],$_POST["codLinea"],$_POST["codMedida"],$_POST["codigoBarra"],$_POST["codMarca"],$_POST["costo"],$_POST["pvp1"],$_POST["pvp2"],$_POST["pvp3"],$_POST["por1"],$_POST["por2"],$_POST["por3"],$_POST["iva"],$_POST["pvp4"],$_POST["por4"],$_POST["referencia"],$_POST["aplicacion"]);