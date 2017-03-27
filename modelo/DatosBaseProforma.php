<?php


 
class DatosBaseProforma {
    
  private $documento;
  private $fecha;
  private $pro_cli;
  private $fechaV;
  private $transporte;
  private $descuento;
  private $impuesto;
  private $tipo;
  private $vendedor;
  private $caja;
  private $comentario;
  private $nombre;
  private $cedula_ruc;
  private $direccion1;
  private $telefono;
  private $estado;
  
    public function __construct($documento,$fecha,$pro_cli,$fechaV,$transporte,$descuento,$impuesto,$tipo,$vendedor,$caja,$comentario,$nombre,$cedula_ruc,$direccion1,$telefono,$estado) //funcion que se autoejecuta cuando defines un objeto, le puedes poner argumentos de inicialización, por defecto todo es vacio
    {
       $this->documento=$documento;
       $this->fecha=$fecha;
       $this->pro_cli=$pro_cli;
       $this->fechaV=$fechaV;
       $this->transporte=$transporte;
       $this->descuento=$descuento;
       $this->impuesto=$impuesto;
       $this->tipo=$tipo;
       $this->vendedor=$vendedor;
       $this->caja=$caja;
       $this->comentario=$comentario;
       $this->nombre=$nombre;
       $this->cedula_ruc=$cedula_ruc;
       $this->direccion1=$direccion1;
       $this->telefono=$telefono;
       $this->estado=$estado;
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
