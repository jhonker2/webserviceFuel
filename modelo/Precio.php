<?php

class Precio 
{
   private $codigo;
   private $descripcion1;
   private $referencia;
   private $aplicacion;   
   private $pvp1;
   private $pvp2;
   private $pvp3;
   private $marca;
   private $codigo_barra;
   
   
    public function __construct($codigo,$descripcion1,$referencia,$aplicacion,$pvp1,$pvp2,$pvp3,$marca,$codigo_barra) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->codigo=$codigo;
     $this->descripcion1=$descripcion1;
     $this->referencia=$referencia;
     $this->aplicacion=$aplicacion;
     $this->pvp1=$pvp1;
     $this->pvp2=$pvp2;
     $this->pvp3=$pvp3;
     $this->marca=$marca;
     $this->codigo_barra=$codigo_barra;
     
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
