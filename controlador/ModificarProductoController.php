<?php

require_once('../index.php'); 

class ModificarProductoController 
{
     private $connect;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
    } 
    
    
  
    public function Modificar($cod_pro,$empresa,$descripcion,$codgrupo,$codLinea,$codMedida,$codigoBarra,$codMarca,$costo,$pvp1,$pvp2,$pvp3,$por1,$por2,$por3,$iva,$pvp4,$por4,$referencia,$aplicacion)
    {
        $query ="update in_item set descripcion1='".$descripcion."', grupo='".$codgrupo."', linea='".$codLinea."',medida='".$codMedida."',codigo_barra='".$codigoBarra."',Marca='".$codMarca."',Stock='S',costo=".$costo.",pvp1=".$pvp1.",pvp2=".$pvp2.",pvp3=".$pvp3.",por1=".$por1.",por2=".$por2.",por3=".$por3.",iva='".$iva."',pvp4=".$pvp4.",por4=".$por4.",referencia='".$referencia."',aplicaccion='".$aplicacion."' where codigo='".$cod_pro."' and empresa='".$empresa."';";
         odbc_exec($this->connect, $query);
         odbc_close($this->connect);  
    }
    
   
}
$c=new ModificarProductoController($connect);
$c->Modificar($_POST["cod_pro"],$_POST["empresa"],$_POST["descripcion"],$_POST["codgrupo"],$_POST["codLinea"],$_POST["codMedida"],$_POST["codigoBarra"],$_POST["codMarca"],$_POST["costo"],$_POST["pvp1"],$_POST["pvp2"],$_POST["pvp3"],$_POST["por1"],$_POST["por2"],$_POST["por3"],$_POST["iva"],$_POST["pvp4"],$_POST["por4"],$_POST["referencia"],$_POST["aplicacion"]);