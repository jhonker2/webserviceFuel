<?php

class VentaDia
{
   private $fecha;
   private $subtotal ;
   private $descuento;
   private $iva;
   private $total;




   public function __construct($fecha ,$subtotal ,$descuento,$iva,$total) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
      $this->fecha=$fecha;
      $this->subtotal=$subtotal;
      $this->descuento=$descuento;
      $this->iva=$iva;
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
