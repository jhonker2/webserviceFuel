<?php


class Zona {
     private $codigo;
   private $zona;
   
   
    public function __construct($codigo,$zona) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->codigo=$codigo;
     $this->zona=$zona;
     
     
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
