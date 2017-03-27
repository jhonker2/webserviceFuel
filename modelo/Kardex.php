<?php

class Kardex {
   private $codigo;
   private $documento;
   private $fechae;
   private $fechav;
   private $concepto;
   private $tipo;
   private $valor;
   private $saldo;
   private $observacion;
   private $saldoanterior;
   
    public function __construct($codigo,$documento,$fechae,$fechav,$concepto,$tipo,$valor,$saldo,$observacion,$saldoanterior) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->codigo=$codigo;
     $this->documento=$documento;
     $this->fechae=$fechae;
     $this->fechav=$fechav;
     $this->concepto=$concepto;
     $this->tipo=$tipo;
     $this->valor=$valor;
     $this->saldo=$saldo;
     $this->observacion=$observacion;
     $this->saldoanterior=$saldoanterior;
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
