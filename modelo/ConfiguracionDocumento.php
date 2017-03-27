<?php

class ConfiguracionDocumento {
     private $documento;
     private $fecha;   
     private $codigo_ubicacion;
     private $ubicacion;
   
    public function __construct($documento,$fecha,$codigo_ubicacion,$ubicacion) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->documento=$documento;
     $this->fecha=$fecha;
     $this->codigo_ubicacion=$codigo_ubicacion;
     $this->ubicacion=$ubicacion;
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
