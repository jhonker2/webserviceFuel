<?php

class Documento{
   private $codigo;
   private $descripcion;
   private $cantidad;
   private $valor;
   private $secuencia;
   private $ubicacion;
   private $existencia;
   private $barra;
   private $pvp1;
   private $linea;
   private $marca;
   private $grupo;
   
   
    public function __construct($codigo,$descripcion,$cantidad,$valor,$secuencia,$ubicacion,$existencia,$barra,$pvp1,$linea,$marca,$grupo) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->codigo=$codigo;
     $this->descripcion=$descripcion;
     $this->cantidad=$cantidad;
     $this->valor=$valor;
     $this->secuencia=$secuencia;
     $this->ubicacion=$ubicacion;
     $this->existencia=$existencia;
     $this->barra=$barra;
     $this->pvp1=$pvp1;
     $this->linea=$linea;
     $this->marca=$marca;
     $this->grupo=$grupo;
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
