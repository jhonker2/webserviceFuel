<?php

class InformeCobro
{

 private $fecha ,$forma_pago ,$descuento,$total;

   public function __construct($fecha ,$forma_pago ,$descuento,$total) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
      $this->fecha=$fecha;
      $this->forma_pago=$forma_pago;
      $this->descuento=$descuento;
      $this->total=$total;
     
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
