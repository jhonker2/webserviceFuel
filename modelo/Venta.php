<?php

class Venta 
{
   private $REFER;
   private $docu;
   private $cliente;   
   private $sub_iva;
   private $sub_siva;
   
   private $descuento_iva;
   private $descuento_siva;

   private $iva;
   private $total;
   private $emision;
   private $vence;
   private $nombre;
   private $caja;
   
   
    public function __construct($REFER,$docu,$cliente,$sub_iva,$sub_siva,$descuento_iva,$descuento_siva,$iva,$total,$emision,$vence,$nombre, $caja) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
   $this->REFER=$REFER;
   $this->docu=$docu;
   $this->cliente=$cliente;   
   $this->sub_iva=$sub_iva;
   $this->sub_siva=$sub_siva;
   
   $this->descuento_iva=$descuento_iva;
   $this->descuento_siva=$descuento_siva;

   $this->iva=$iva;
   $this->total=$total;
   $this->emision=$emision;
   $this->vence=$vence;
   $this->nombre=$nombre;
   $this->caja=$caja;
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
