<?php

class Productos
{
   private $codigo;
   private $descripcion1;
   private $empresa;
   private $pvp1;
   private $iva;
   private $ivaValor;
   private $costo;
    public function __construct($codigo,$empresa,$descripcion1,$pvp1,$iva,$ivaValor,$costo) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->codigo=$codigo;
     $this->empresa=$empresa;
     $this->descripcion1=$descripcion1;
     $this->pvp1=$pvp1;
     $this->iva=$iva;
     $this->ivaValor=$ivaValor;
     $this->costo=$costo;
    }
    
    public function setPvp4($pvp4)
    {
        $this->pvp4=$pvp4;
    }

    public function setPor4($por4)
    {
        $this->por4=$por4;
    }
    
    public function setReferencia($referencia)
    {
        $this->referencia=$referencia;
    }

    public function setAplicacion($aplicacion)
    {
        $this->aplicacion=$aplicacion;
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
