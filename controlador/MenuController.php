<?php
require_once('../index.php');  //incluir archivo de conexion
require_once('../modelo/Menu.php');
require_once('../modelo/Campo.php');
require_once('../modelo/Dato.php');

class MenuController {
    private $connect;
    private $menus;
    
    public function __construct($connect) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->connect=$connect;
     $this->menus=array();
    }
    
    public function get($usuario,$empresa)
    {
         $query = "select m.codigo,M.NOMBRE from mo_menus as m ,mo_restriccion as r where m.codigo=r.menu and r.usuario='".$usuario."' and r.empresa='".$empresa."'";
         $result = odbc_exec($this->connect, $query);


         while(odbc_fetch_row($result))
         {
             $codigo = odbc_result($result, 1);
             $nombre = utf8_encode(odbc_result($result, 2));
             $m=new Menu($codigo, $nombre);
             
             $query="select h.codigo,h.campo,h.habilitado from mo_habilitaciones as h  where h.usuario='".$usuario."' and h.menu='".$codigo."' and h.empresa='".$empresa."' and h.habilitado=1";
             $result2=odbc_exec($this->connect, $query);
             while(odbc_fetch_row($result2))
             {
                $codigo = odbc_result($result2, 1);
                $nombre = utf8_encode(odbc_result($result2, 2));
                
                
                $c=new Campo($codigo, $nombre);
                $m->InsertarCampo($c);
             }
            
             $this->menus[]=$m->getJsonData();
         }
         
         $resultado=new Dato($this->menus);
         echo json_encode($resultado->getJsonData());
         odbc_close($this->connect);   
    }
}


$login=new MenuController($connect);
$login->get($_GET["usuario"],$_GET["empresa"]);