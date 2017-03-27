<?php

class IngresoCaja {
   private $factura;
   private $emision;
   private $vencimiento;
   private $recibo;
   private $banco;
   private $cuenta;
   private $numero;
   private $cliente;
   private $valor;
   private $descuento;
   private $r_f;
   private $r_iva;
   private $formapago;
   private $vendedor;
   private $caja;
   
    public function __construct($factura,$emision,$vencimiento,$recibo,$banco,$cuenta,$numero,$cliente,$valor,$descuento,$r_f,$r_iva,$formapago,$vendedor,$caja) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->factura=$factura;
     $this->emision=$emision;
     $this->vencimiento=$vencimiento;
     $this->recibo=$recibo;
     $this->banco=$banco;
     $this->cuenta=$cuenta;
     
     $this->numero=$numero;
     $this->cliente=$cliente;
     $this->valor=$valor;
     $this->descuento=$descuento;
     $this->r_f=$r_f;
     $this->r_iva=$r_iva;
     
     $this->formapago=$formapago;
     $this->vendedor=$vendedor;
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
