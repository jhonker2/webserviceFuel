<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Empresa.php');
require_once('../modelo/Dato.php');

class EmpresaController {
    
    private $connect;
    private $empresas;

    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->empresas=array();
    }
    
    public function Get()
    {
         $query = "SELECT e.codigo,e.empresa,e.periodo  from ge_empresa as e";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $codigo = odbc_result($result, 1);
             $empresa =utf8_encode( odbc_result($result, 2));
             $periodo = odbc_result($result, 3);
             
             $e=new Empresa($codigo, $empresa, $periodo);
             
             $this->empresas[]=$e->getJsonData();
         }
         
         $resultado=new Dato($this->empresas);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
    

    
}

$empresa=new EmpresaController($connect);
$empresa->Get();


