<?php

class FacturaCobrar {
   private $documento;
   private $tipo;
   private $ubicacion;
   private $r_iva;
   private $iva;
   private $piva;
   private $emision;
   private $vence;
   private $dias;
   private $total;
   private $devolucion;
   private $abono;
   private $saldo;
   private $retencion;
   private $val_ret;
   
    public function __construct($documento, $tipo, $ubicacion,$r_iva,$emision,$vence,$dias, $total,$devolucion,$abono, $saldo,$iva,$piva,$retencion,$val_ret) 
    {
   $this->documento= $documento;
   $this->tipo=$tipo;
   $this->ubicacion=$ubicacion;
   $this->r_iva=$r_iva;
   $this->emision=$emision;
   $this->vence=$vence;
   $this->dias=$dias;
   $this->total=$total;
   $this->devolucion=$devolucion;
   $this->abono=$abono;
   $this->saldo=$saldo;
   $this->iva=$iva;
   $this->piva=$piva;
   $this->retencion=$retencion;
   $this->val_ret=$val_ret;
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
