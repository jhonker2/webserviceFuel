<?php

class PedidosProveeedor {
     private $vendedor;
     private $num_pedidos;
     private $total;
     private $porcentaje;
     private $cod_vendedor;
   
    public function __construct($vendedor,$num_pedidos,$total,$porcentaje) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->vendedor=$vendedor;
     $this->num_pedidos=$num_pedidos;
     $this->total=$total;
     $this->porcentaje=$porcentaje;
    }
    
    public function SetCod_Vendedor($cod_vendedor)
    {
       $this->cod_vendedor=$cod_vendedor;
    }
   
   public function getJsonData(){
        $var = get_object_vars($this);
        foreach($var as &$value){
           if(is_object($value) && method_exists($value,'getJsonData')){
              $value = $value->getJsonData();
           }
        }
        return $var;
   }
}
