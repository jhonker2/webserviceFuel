<?php

class Dato {
  
    private $data;
    public function __construct($data)
    {
     $this->data=$data;
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
