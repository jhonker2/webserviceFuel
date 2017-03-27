<?php


class Proforma {
 private $docu;
 private $ubicacion;
   private $cliente;   
   private $vendedor;
   private $emision;
   private $vence;
   private $subtotal;
   private $descuento1;
   private $total1;
   private $descuento2;
   private $total2;
   private $piva;
   private $iva;
   private $TOTAL;
   private $referencia;
   private $caja;
  
   
    public function __construct($docu,$ubicacion,$cliente,$vendedor,$emision,$vence,$subtotal,$descuento1,$total1,$descuento2,$total2,$piva,$iva,$TOTAL,$referencia,$caja) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->docu=$docu;
     $this->ubicacion=$ubicacion;
     $this->cliente=$cliente;
     $this->vendedor=$vendedor;
     $this->emision=$emision;
     $this->vence=$vence;
     $this->subtotal=$subtotal;
     $this->descuento1=$descuento1;
     $this->total1=$total1;
     $this->descuento2=$descuento2;
     $this->total2=$total2;
     $this->piva=$piva;
     $this->iva=$iva;
     $this->TOTAL=$TOTAL;
     $this->referencia=$referencia;
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
