<?php

class Producto 
{
   private $codigo;
   private $descripcion1;
   private $pvp1,$pvp2,$pvp3,$pvp4;
   private $existencia;
   private $costo,$codGrupo,$codLinea,$marca,$medida,$iva,$por1,$por2,$por3,$por4,$codigo_barra; 
   private $referencia,$aplicacion;
    public function __construct($codigo,$descripcion1,$pvp1,$pvp2,$pvp3,$existencia,$costo,$codGrupo,$codLinea,$marca,$medida,$iva,$por1,$por2,$por3,$codigo_barra) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->codigo=$codigo;
     $this->descripcion1=$descripcion1;
     $this->pvp1=$pvp1;
     $this->pvp2=$pvp2;
     $this->pvp3=$pvp3;
     $this->existencia=$existencia;
     
     $this->costo=$costo;
     $this->codGrupo=$codGrupo;
     $this->codLinea=$codLinea;
     $this->marca=$marca;
     $this->medida=$medida;
     $this->iva=$iva;
     $this->por1=$por1;
     $this->por2=$por2;
     $this->por3=$por3;
     $this->codigo_barra=$codigo_barra;
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
