<?php

class Cliente2 {
   private $cedula_ruc;   
   private $nombre;
   private $direccion1;
   
   
    public function __construct($cedula_ruc,$nombre,$direccion1) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->cedula_ruc=$cedula_ruc;
     $this->nombre=$nombre;
     $this->direccion1=$direccion1;
     
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
