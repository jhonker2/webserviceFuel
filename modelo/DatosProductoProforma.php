<?php

class DatosProductoProforma {
    
   private $producto;
   private $cantidad;   
   private $bonificacion;
   private $descripcion1;
   private $valor;
   private $valor1;
   private $descuento;
   private $impuesto;
   private $secuencia;
   private $iva_v;
   private $promedio;
   private $costo;
   private $ubicacion;
   private $numprecio;
   private $serie;
   private $cajas;
   private $unidades;
   private $fraccion;
   private $iva;
   private $pvp1,$pvp2,$pvp3,$pvp4;
   
    public function __construct($producto,$cantidad,$bonificacion,$descripcion1,$valor,$valor1,$descuento,$impuesto,$secuencia,$iva_v,$promedio,$costo,$ubicacion,$numprecio,$serie,$cajas,$unidades,$fraccion,$iva,$pvp1,$pvp2,$pvp3) 
    {
     $this->producto=$producto;
     $this->cantidad=$cantidad;
     $this->bonificacion=$bonificacion;
     $this->descripcion1=$descripcion1;
     $this->valor=$valor;
     $this->valor1=$valor1;
     $this->descuento=$descuento;
     $this->impuesto=$impuesto;
     $this->secuencia=$secuencia;
     $this->iva_v=$iva_v;
     $this->promedio=$promedio;
     $this->costo=$costo;
     $this->ubicacion=$ubicacion;
     $this->numprecio=$numprecio;
     $this->serie=$serie;
     $this->cajas=$cajas;
     $this->unidades=$unidades;
     $this->fraccion=$fraccion;
     $this->iva=$iva;
     $this->pvp1=$pvp1;
     $this->pvp2=$pvp2;
     $this->pvp3=$pvp3;
    }
   
    public function setPvp4($pvp4)
    {
        $this->pvp4=$pvp4;
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
