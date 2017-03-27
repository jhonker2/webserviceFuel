<?php

class Menu {
    private $codigo,$nombre;
    private $campos;
    
     public function __construct($codigo,$nombre) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->codigo=$codigo;
     $this->nombre=$nombre;
     $this->campos= array();
    }
    
    public function InsertarCampo($campo)
    {
       $this->campos[]=$campo->getJsonData(); 
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
