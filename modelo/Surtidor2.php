<?php

class Surtidor2 {
   private $codigo;
   private $producto;   
   private $nombre;   
   private $imagenAndroid;   
   
    public function __construct($codigo,$producto,$nombre,$imagenAndroid) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->codigo=$codigo;
     $this->producto=$producto;
     $this->nombre=$nombre;
     $this->imagenAndroid=$imagenAndroid;
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
