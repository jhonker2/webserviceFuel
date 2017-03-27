<?php


class Proveedor {
     private $codigo;
   private $cedula_ruc;   
   private $nombre;
   private $direccion1;   
   
   private $ciudad,$telefono,$e_mail,$fax,$fuente,$iva;
    public function __construct($codigo,$cedula_ruc,$nombre,$direccion1,$ciudad,$telefono,$e_mail,$fax,$fuente,$iva) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
     $this->codigo=$codigo;
     $this->cedula_ruc=$cedula_ruc;
     $this->nombre=$nombre;
     $this->direccion1=$direccion1;
     
     $this->ciudad=$ciudad;
     $this->telefono=$telefono;
     $this->e_mail=$e_mail;
     $this->fax=$fax;
     $this->fuente=$fuente;
     $this->iva=$iva;
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
