<?php

class CXC {
    private $cod_cliente;
   private $nombre;
   private $saldo;
   private $fecha;
   
    public function __construct($cod_cliente,$nombre,$saldo,$fecha) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->cod_cliente=$cod_cliente;
     $this->nombre=$nombre;
     $this->saldo=$saldo;
     $this->fecha=$fecha;
     
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
