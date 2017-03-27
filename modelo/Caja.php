<?php

class Caja {
     private $codigo;
   private $caja;   
   private $estacion;   
   private $punto;   
   
    public function __construct($codigo,$caja,$estacion,$punto) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->codigo=$codigo;
     $this->caja=$caja;
     $this->estacion=$estacion;
     $this->punto=$punto;
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
