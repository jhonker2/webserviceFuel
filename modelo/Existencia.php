<?php

class Existencia 
{
   private $producto;
   private $descripcion1;   
   private $ubicacion;
   private $cajas;
   private $unidades;
   private $codigo_ubicacion;
   private $existencia;
   
    public function __construct($producto,$descripcion1,$ubicacion,$cajas,$unidades,$codigo_ubicacion) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->producto=$producto;
     $this->descripcion1=$descripcion1;
     $this->ubicacion=$ubicacion;
     $this->cajas=$cajas;
     $this->unidades=$unidades;
     $this->codigo_ubicacion=$codigo_ubicacion;
    }
   
    public function setExistencia($existencia)
    {
        $this->existencia=$existencia;
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
