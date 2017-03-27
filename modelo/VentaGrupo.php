<?php

class VentaGrupo
{
   private $grupo;
   private $cantidad;
   private $subtotal;
   private $descuento;
   private $iva;
   private $total;
   private $nombre_grupo;




   public function __construct($grupo,$cantidad,$subtotal,$descuento,$iva,$total,$nombre_grupo) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
      $this->grupo=$grupo;
      $this->cantidad=$cantidad;
      $this->subtotal=$subtotal;
      $this->descuento=$descuento;
      $this->iva=$iva;
      $this->total=$total;
      $this->nombre_grupo=$nombre_grupo;
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
