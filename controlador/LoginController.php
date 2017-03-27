<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Usuario.php');
require_once('../modelo/Dato.php');

class LoginController {
    private $connect;
    private $usuarios;
    
    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->usuarios=array();
    } 
    
    /*public function Login($usuario,$clave,$empresa)
    {
         $query = "SELECT p.parametro,P.codigo from ge_parametros as p inner join ge_usuarios as u on p.empresa=u.empresa"
                 . " where (p.codigo='4' or p.codigo='3' or p.codigo='2' or p.codigo='17' "
                 . "or p.codigo='20' or p.codigo='243' or p.codigo='39' or p.codigo='214' or p.codigo='66' or p.codigo='9000' or p.codigo='81' or p.codigo='79' or p.codigo='9002' or p.codigo='9006') and p.empresa='".$empresa."' and u.usuario='".$usuario."' and u.clave='".$clave."'";
         $result = odbc_exec($this->connect, $query);

         
        while(odbc_fetch_row($result))
         {
             $parametro = utf8_encode(odbc_result($result, 1));
             $codigo = odbc_result($result, 2);
             
             $v=new Parametro($codigo, $parametro);
             
             $this->parametros[]=$v->getJsonData();
         }
         
         $resultado=new Dato($this->parametros);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }*/

    public function Login($usuario, $clave, $empresa){
        $query = "SELECT u.usuario, u.empresa, u.vendedor from ge_usuarios as u  where u.usuario='".$usuario."' and u.clave='".$clave."' and u.empresa ='".$empresa."'";
         $result = odbc_exec($this->connect, $query);

         
        while(odbc_fetch_row($result))
         {
             $usuario  = odbc_result($result, 1);
             $empresa  = odbc_result($result, 2);
             $vendedor = odbc_result($result, 3);

             if($vendedor==""){
                $cod_nuevo=$this->buscar_vendedor($empresa);
                $v=new Usuario($usuario, $empresa,$cod_nuevo);
                $this->usuarios[]=$v->getJsonData();
                }
             else{
                $v=new Usuario($usuario, $empresa,$vendedor);
                $this->usuarios[]=$v->getJsonData();
             }
             
         }
         
         $resultado=new Dato($this->usuarios);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }

    public function buscar_vendedor($empresa){
            $query = "SELECT p.parametro from ge_parametros as p  where p.empresa ='".$empresa."'and p.codigo=66";
            $result = odbc_exec($this->connect, $query);
                while(odbc_fetch_row($result))
                    {
                    $parametro = odbc_result($result, 1);
                    }
        return $parametro;
    }
}


$login=new LoginController($connect);
$login->Login($_POST["usuario"],$_POST["clave"],$_POST["empresa"]);
//$login->buscar_vendedor($_POST["empresa"]);