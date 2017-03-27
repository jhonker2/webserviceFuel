<?php

class Surtidor {
   private $codigo;
   private $surtidor;   
   private $producto;   
   private $caja;   
   private $identificador;   
   
    public function __construct($codigo,$surtidor,$producto,$caja,$identificador) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->codigo=$codigo;
     $this->surtidor=$surtidor;
     $this->producto=$producto;
     $this->caja=$caja;
     $this->identificador=$identificador;
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
