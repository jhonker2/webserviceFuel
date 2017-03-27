<?php

class Location {
   private $lat;
   private $lon;   
   private $hora;
   private $nombre;
   private $documento;
   
    public function __construct($lat,$lon,$hora,$nombre,$documento) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->lat=$lat;
     $this->lon=$lon;
     $this->hora=$hora;
     $this->vendedor="";
     $this->nombre=$nombre;
     $this->documento=$documento;
    }
   
    public function SetVendedor($vendedor)
    {
     $this->vendedor=$vendedor;
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
