<?php

class Usuario 
{
   private $usuario;
   private $empresa;   
   private $vendedor;   
   
    public function __construct($usuario, $empresa,$vendedor) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->usuario=$usuario;
     $this->empresa=$empresa;
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

?>
