<?php


 
class DatosBaseBodega {
    
    private $documento;
    private $fecha;
 
    public function __construct($documento,$fecha) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
       $this->documento=$documento;
       $this->fecha=$fecha;
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
