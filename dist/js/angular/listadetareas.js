angular.module('miAp', ['ngRoute','purplefox.numeric'])  
 .config(function($routeProvider) {
    $routeProvider
      .when('/', {
         //controller:'ControladorIngresoItems',  
         templateUrl: './pages/logo.html'
      })
      .when('/ingreso_clientes', {
         controller:'ControladorIngresoClientes',  
         templateUrl: './pages/ingreso_clientes.html'
      }) 
      .when('/proveedores', {
         controller:'ControladorProveedores',  
         templateUrl: './pages/ingreso_proveedores.html'
      }) 
      .when('/ingreso_items', {
         controller:'ControladorIngresoItems',  
         templateUrl: './pages/ingreso_items.html'
      })            
      .when('/ingreso_bodega', {
         controller:'ControladorIngresoBodega',  
         templateUrl: './pages/ingreso_bodega.html'
      })
      .when('/ingreso_bodegaTabular', {
         controller:'ControladorIngresoBodegaTabular',  
         templateUrl: './pages/ingreso_bodegaTabular.html'
      })
      .when('/registro_compra', {
         controller:'ControladorCompra',  
         templateUrl: './pages/ingreso_compra.html'
      })
       .when('/registro_compraTabular', {
         controller:'ControladorCompraTabular',  
         templateUrl: './pages/ingreso_compraTabular.html'
      })
      .when('/registro_ProformaVenta', {
         controller:'ControladorProformaVenta',  
         templateUrl: './pages/ProformaVenta.html'
      })
      .when('/registro_ProformaVentaTabular', {
         controller:'ControladorProformaVentaTabular',  
         templateUrl: './pages/ProformaVentaTabla.html'
      })
      .when('/informe_ventas_general', {
         controller:'ControladorInforme_ventas_general',  
         templateUrl: './pages/informe_ventas_general.html'
      }) 
      .when('/informe_Kardex_Cliente', {
         controller:'ControladorInforme_Kardex_Cliente',  
         templateUrl: './pages/informe_Kardex_Cliente.html'
      })
      .when('/informe_Ingreso_Diario_Caja', {
         controller:'ControladorInforme_ingreso_caja_diaria',  
         templateUrl: './pages/informe_Ingreso_Diario_Caja.html'
      })
      .when('/informe_ventas_vendedor', {
         controller:'ControladorInforme_ventas_vendedor',  
         templateUrl: './pages/informe_Ventas_Vendedor.html'
      })
      .when('/informe_pedidos_vendedor', {
         controller:'ControladorInforme_pedidos_vendedor',  
         templateUrl: './pages/informe_Pedidos_Vendedor.html'
      })
      .when('/informe_ventas_cliente', {
         controller:'ControladorInforme_Ventas_Cliente',  
         templateUrl: './pages/informe_Ventas_Cliente.html'
      })
      .when('/informe_existencias', {
         controller:'ControladorInforme_Existencia',  
         templateUrl: './pages/informe_Existencias.html'
      })
      .when('/informe_precios', {
         controller:'ControladorInforme_Precios',  
         templateUrl: './pages/informe_precios.html'
      })
      .when('/informe_proveedores', {
         controller:'ControladorInforme_Proveedores',  
         templateUrl: './pages/informe_proveedores.html'
      })
      .when('/inventario', {
         controller:'ControladorInventario',  
         templateUrl: './pages/inventario.html'
      })
      .when('/cobranza', {
         controller:'ControladorCobranza',  
         templateUrl: './pages/cobranza.html'
      })
      .when('/CXC', {
         controller:'ControladorCuentasxCobrar',  
         templateUrl: './pages/cxc.html'
      })
      .when('/inf_ventas_grupo', {
         controller:'ControladorInforme_Ventas_Grupo',  
         templateUrl: './pages/informe_ventas_grupo.html'
      })
      .when('/inf_ventas_caja', {
         controller:'ControladorInforme_Ventas_Caja',  
         templateUrl: './pages/informe_ventas_caja.html'
      })
      .when('/inf_ventas_ubicacion', {
         controller:'ControladorInforme_Ventas_Ubicacion',  
         templateUrl: './pages/informe_ventas_ubicacion.html'
      })
      .when('/inf_ventas_dia', {
         controller:'ControladorInforme_Ventas_dia',  
         templateUrl: './pages/informe_ventas_dia.html'
      })
      .when('/inf_cobros', {
         controller:'ControladorInforme_Cobros',  
         templateUrl: './pages/informe_ventas_cobros.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
 .directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
})
 .service('Herramientas',['$http','$location', function($http,$location){
    
    this.Notificar=function(mensaje)
    {
                    if (!("Notification" in window)) 
                        {
                            alert(mensaje);
                        }
                        else if (Notification.permission === "granted") 
                        {
                            // If it's okay let's create a notification
                            var notification = new Notification(mensaje,{icon:'./img/success.png' });
                            notification.onshow = function () 
                            { 
                                setTimeout(notification.close.bind(notification), 3000); 
                            }
                        }
                        else if (Notification.permission !== 'denied') 
                       {
                         Notification.requestPermission(function (permission) 
                        {
                        
                         if (permission === "granted") 
                         {
                            var notification = new Notification(mensaje,{icon:'./img/error.png' });
                            notification.onshow = function () 
                            { 
                                setTimeout(notification.close.bind(notification), 3000); 
                            }
                         }
                        });
                     }
    } 
    
 }])
 .controller('ControladorIngresoItems',['$scope','$http','Herramientas','$q',function($scope,$http,Herramientas,$q){
                  
     $scope.editando=false;
     $scope.peticionando=false;
     
     $scope.decimales=localStorage.getItem("Decimales").split(".")[1].length;
 
     $scope.medidas=[];          $scope.medida_seleccionada; 
     $scope.marcas=[];           $scope.marca_seleccionada;
     $scope.ubicaciones=[];      $scope.ubicacion_seleccionada;
     $scope.lineas=[];           $scope.linea_seleccionada;
     $scope.grupos_productos=[]; $scope.grupo_seleccionado;
     
     $scope.grupos=[{nombre:"Linea",codigo:"L"},{nombre:"Codigo de Barra",codigo:"B"},{nombre:"Grupo",codigo:"B"},{nombre:"Referencia",codigo:"B"},{nombre:"Codigo",codigo:"C"},{nombre:"Descripcion",codigo:"D"}];
    $scope.criterio_seleccionado='D';
    $scope.criterio=$scope.criterio_seleccionado;
     
     $scope.productos=[];
     $scope.nombre_busqueda="";
    
      $scope.Grupo_Productos=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/GrupoController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.grupos_productos=res.data;
               $scope.grupo_seleccionado=$scope.grupos_productos[0].codigo;
               $scope.grupo=$scope.grupo_seleccionado;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
      $scope.Medidas=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/MedidaController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0) 
             {
              $scope.medidas=res.data;
               $scope.medida_seleccionada=$scope.medidas[0].codigo;
               $scope.medida=$scope.medida_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
      $scope.Marcas=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/MarcaController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.marcas=res.data;
               $scope.marca_seleccionada=$scope.marcas[0].codigo;
               $scope.marca=$scope.marca_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
     $scope.Ubicaciones=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/UbicacionController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.ubicaciones=res.data;
               $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
               $scope.ubicacion=$scope.ubicacion_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
     $scope.Lineas=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/LineaController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.lineas=res.data;
               $scope.linea_seleccionada=$scope.lineas[0].codigo;
               $scope.linea=$scope.linea_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.Ultimo=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
       
     $.ajax({
             type: "POST",
             url: 'controlador/UltimoProductoController.php',
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                 if(res === parseInt(res, 10)) 
                    $scope.codigo=res;    
                 else
                    Herramientas.Notificar('Error al obtener codigo de producto');   
                $('#bloqueForm').css('visibility','hidden');
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
       
    };
     
     
     $scope.Grupo_Productos();
     $scope.Medidas();
     $scope.Marcas();
     $scope.Ubicaciones();
     $scope.Lineas(); 
     $scope.Ultimo(); 
    //-----------------------------------------------------------------------------------------------------------     
    $scope.codigo="";
    $scope.barra="";
    $scope.descripcion="";
    $scope.referencia="";
    $scope.aplicacion="";
    $scope.iva=false;
    
    $scope.costo=0.0;
    
    $scope.precio1=0.0;
    $scope.porciento1=0.0;
    
    $scope.precio2=0.0;
    $scope.porciento2=0.0;
    
    $scope.precio3=0.0;
    $scope.porciento3=0.0;
    
    $scope.precio4=0.0;
    $scope.porciento4=0.0;
    
    
    
    $scope.Establecer=function(t)
    {
     $scope.Limpiar();   
        
    $scope.codigo=t.codigo;
    $scope.barra=t.codigo_barra;
    $scope.descripcion=t.descripcion1;
    $scope.referencia=t.referencia;
    $scope.aplicacion=t.aplicacion;
    
    $scope.grupos_productos.forEach(function(a){
        if(a.codigo==t.codGrupo)
        {
           $scope.grupo_seleccionado=a.codigo;
          $scope.grupo=$scope.grupo_seleccionado;
        }
    });
    
   $scope.medidas.forEach(function(a){
        if(a.codigo==t.medida)
        {
          $scope.medida_seleccionada=a.codigo;
          $scope.medida=$scope.medida_seleccionada;
        }
   });
    
    $scope.marcas.forEach(function(a){
        if(a.codigo==t.marca)
        {
         $scope.marca_seleccionada=a.codigo;
         $scope.marca=$scope.marca_seleccionada;
        }
   });
    
    $scope.lineas.forEach(function(a){
        if(a.codigo==t.codLinea)
        {
            $scope.linea_seleccionada=a.codigo; 
            $scope.linea=$scope.linea_seleccionada;
        }
   });
    
    
    $scope.costo=parseFloat(t.costo);
    
    $scope.precio1=t.pvp1;
    $scope.porciento1=parseFloat(t.por1).toFixed($scope.decimales).toString();
   
    $scope.precio2=t.pvp2;
    $scope.porciento2=parseFloat(t.por2).toFixed($scope.decimales).toString();
    
    $scope.precio3=t.pvp3;
    $scope.porciento3=parseFloat(t.por3).toFixed($scope.decimales).toString();
    
    $scope.precio4=t.pvp4;
    $scope.porciento4=parseFloat(t.por4).toFixed($scope.decimales).toString(); 
    
    $scope.iva=t.iva=='S'?true:false;
    $scope.CambioIva();
    $scope.editando=true;
    $('#myModalBusqueda').modal('hide');
    };
    
    $scope.Limpiar=function()
    {
    $scope.codigo="";
    $scope.barra="";
    $scope.descripcion="";
    $scope.referencia="";
    $scope.aplicacion="";
    
    
    $scope.grupo_seleccionado=$scope.grupos_productos[0].codigo;
    $scope.grupo=$scope.grupo_seleccionado;
    $scope.medida_seleccionada=$scope.medidas[0].codigo;
    $scope.medida=$scope.medida_seleccionada;
    $scope.marca_seleccionada=$scope.marcas[0].codigo;
    $scope.marca=$scope.marca_seleccionada;
    $scope.linea_seleccionada=$scope.lineas[0].codigo; 
    $scope.linea=$scope.linea_seleccionada;
    
    $scope.valor_iva="0.0";
    $scope.iva=false;
    
    $scope.costo=0.0;
    
    $scope.precio1=0.0;
    $scope.porciento1=0.0;
    
    $scope.precio2=0.0;
    $scope.porciento2=0.0;
    
    $scope.precio3=0.0;
    $scope.porciento3=0.0;
    
    $scope.precio4=0.0;
    $scope.porciento4=0.0; 
    
    $scope.editando=false;
    };
    
    
    $scope.Porciento_Precio1= function()
    { 
      if($scope.porciento1!=""&&$scope.costo!="")
        {
            var costo = $scope.costo;

            var _iva = 0.0;
            if ($scope.iva)
                _iva =  localStorage.getItem("IVA")/100;

            costo = costo + (costo * _iva);

            var porcentaje = $scope.porciento1 / 100;

            var _final = costo + (costo * porcentaje);
            $scope.precio1= parseFloat(_final).toFixed($scope.decimales).toString();
            return true;
        }
        return false;
    };
    
    
    $scope.Precio_Porciento1=function()
    {
        if($scope.precio1!=""&&$scope.costo!="")
        {

            var costo = $scope.costo;

            var _iva = 0.0;
            if ($scope.iva)
                _iva =  localStorage.getItem("IVA")/100;

            var c = costo + (costo * _iva);

            var precio = $scope.precio1;

            var porcentaje = ((precio / c) * 100) - 100;

            $scope.porciento1=parseFloat(porcentaje).toFixed($scope.decimales).toString();
            return true;
        }
        return false;
    };
    
    
    $scope.Porciento_Precio2= function()
    { 
      if($scope.porciento2!=""&&$scope.costo!="")
        {
            var costo = $scope.costo;

            var _iva = 0.0;
            if ($scope.iva)
                _iva =  localStorage.getItem("IVA")/100;

            costo = costo + (costo * _iva);

            var porcentaje = $scope.porciento2 / 100;

            var _final = costo + (costo * porcentaje);
            $scope.precio2=parseFloat(_final).toFixed($scope.decimales).toString();
            return true;
        }
        return false;
    };
    
    
    $scope.Precio_Porciento2=function()
    {
        if($scope.precio2!=""&&$scope.costo!="")
        {

            var costo = $scope.costo;

            var _iva = 0.0;
            if ($scope.iva)
                _iva =  localStorage.getItem("IVA")/100;

            var c = costo + (costo * _iva);

            var precio = $scope.precio2;

            var porcentaje = ((precio / c) * 100) - 100;

            $scope.porciento2=parseFloat(porcentaje).toFixed($scope.decimales).toString();
            return true;
        }
        return false;
    };
    
    
    $scope.Porciento_Precio3= function()
    { 
      if($scope.porciento3!=""&&$scope.costo!="")
        {
            var costo = $scope.costo;

            var _iva = 0.0;
            if ($scope.iva)
                _iva =  localStorage.getItem("IVA")/100;

            costo = costo + (costo * _iva);

            var porcentaje = $scope.porciento3 / 100;

            var _final = costo + (costo * porcentaje);
            $scope.precio3=parseFloat(_final).toFixed($scope.decimales).toString();
            return true;
        }
        return false;
    };
    
    
    $scope.Precio_Porciento3=function()
    {
        if($scope.precio3!=""&&$scope.costo!="")
        {

            var costo = $scope.costo;

            var _iva = 0.0;
            if ($scope.iva)
                _iva =  localStorage.getItem("IVA")/100;

            var c = costo + (costo * _iva);

            var precio = $scope.precio3;

            var porcentaje = ((precio / c) * 100) - 100;

            $scope.porciento3=parseFloat(porcentaje).toFixed($scope.decimales).toString();
            return true;
        }
        return false;
    };
    
    
    $scope.Porciento_Precio4= function()
    { 
      if($scope.porciento4!=""&&$scope.costo!="")
        {
            var costo = $scope.costo;

            var _iva = 0.0;
            if ($scope.iva)
                _iva =  localStorage.getItem("IVA")/100;

            costo = costo + (costo * _iva);

            var porcentaje = $scope.porciento4 / 100;

            var _final = costo + (costo * porcentaje);
            $scope.precio4=parseFloat(_final).toFixed($scope.decimales).toString();
            return true;
        }
        return false;
    };
    
    
    $scope.Precio_Porciento4=function()
    {
        if($scope.precio4!=""&&$scope.costo!="")
        {

            var costo = $scope.costo;

            var _iva = 0.0;
            if ($scope.iva)
                _iva =  localStorage.getItem("IVA")/100;

            var c = costo + (costo * _iva);

            var precio = $scope.precio4;

            var porcentaje = ((precio / c) * 100) - 100;

            $scope.porciento4=parseFloat(porcentaje).toFixed($scope.decimales).toString();
            return true;
        }
        return false;
    };
    

    $scope.CambioCosto=function()
    {
        
        if($scope.costo!="")
        {
              if($scope.iva)
                {
                       var costo=$scope.costo;
                       var _iva= localStorage.getItem("IVA")/100;
                       $scope.valor_iva=(costo + (costo * _iva)).toFixed(4);
                }
                else 
                {
                    $scope.valor_iva="0.0";
                }
            
           if(!$scope.Porciento_Precio1())
                         $scope.Precio_Porciento1();

           if(!$scope.Porciento_Precio2())
                         $scope.Precio_Porciento2();
         
           if(!$scope.Porciento_Precio3())
                         $scope.Precio_Porciento3();
                     
          if(!$scope.Porciento_Precio4())
                         $scope.Precio_Porciento4();
        }
       
    };
              
    
    $scope.CambioIva=function()
    {
             if($scope.iva)
                {
                    if($scope.costo!="")
                    {
                       var costo=$scope.costo;
                       var _iva= localStorage.getItem("IVA")/100;
                       $scope.valor_iva=(costo + (costo * _iva)).toFixed(4);
                    }
                }
                else 
                {
                    $scope.valor_iva="0.0";
                }

               $scope.Porciento_Precio1();
               $scope.Porciento_Precio2();
               $scope.Porciento_Precio3();
               $scope.Porciento_Precio4();
    };
    
    
    $scope.Guardar=function()
    {
        
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         if($scope.editando)
             formData.append("cod_pro", $scope.codigo);
         
         formData.append("empresa", localStorage.getItem("empresa"));
         formData.append("descripcion", $scope.descripcion);
         formData.append("codgrupo", $scope.grupo);
         formData.append("codLinea", $scope.linea);
         formData.append("codMedida", $scope.medida);
         formData.append("codMarca", $scope.marca);
         formData.append("codigoBarra",$scope.barra);
         formData.append("costo", $scope.costo);
         formData.append("iva", $scope.iva?'S':'N');
         
         formData.append("pvp1", $scope.precio1);
         formData.append("pvp2", $scope.precio2);
         formData.append("pvp3", $scope.precio3);
         formData.append("pvp4", $scope.precio4);
         formData.append("por1", $scope.porciento1);
         formData.append("por2", $scope.porciento2);
         formData.append("por3", $scope.porciento3);
         formData.append("por4", $scope.porciento4);
         
         formData.append("referencia", $scope.referencia);
         formData.append("aplicacion", $scope.aplicacion);
  
    if($scope.editando)
        $.ajax({
             type: "POST",
             url: 'controlador/ModificarProductoController.php',
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Guardado');    
                 else
                    Herramientas.Notificar('Error al Guardar');   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
     else
     $.ajax({
             type: "POST",
             url: 'controlador/CrearProductoController.php',
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Guardado');    
                 else
                    Herramientas.Notificar('Error al Guardar');   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
         
      $scope.Limpiar();
          
    };
    
    $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda+"&criterio="+$scope.criterio+"&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.Eliminar=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
         formData.append("cod_pro", $scope.codigo);
       
     $.ajax({
             type: "POST",
             url: 'controlador/EliminarProductoController.php',
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Eliminado');    
                 else
                    Herramientas.Notificar('Error al eliminar');   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
         $scope.Limpiar();
         
    };
    
    
  } 
  ])
  .controller('ControladorIngresoBodega',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
     $scope.decimales=localStorage.getItem("Decimales").split(".")[1].length; 
    $scope.fecha=new Date().toISOString().split("T")[0];
    $scope.grupos=[{nombre:"Linea",codigo:"L"},{nombre:"Codigo de Barra",codigo:"B"},{nombre:"Grupo",codigo:"B"},{nombre:"Referencia",codigo:"B"},{nombre:"Codigo",codigo:"C"},{nombre:"Descripcion",codigo:"D"}];
    $scope.criterio_seleccionado='D';
    $scope.criterio=$scope.criterio_seleccionado;
    $scope.codigo_editado="";
    $scope.ptos=[];
   
    
    $scope.p=null;
    $scope.pp=null;
                  
      $scope.Eliminar=function()
    {
        if($scope.codigo=="")
        {
            Herramientas.Notificar("Debe seleccionar un codigo de producto");
            return;
        }
        
        $('#bloqueForm').css('visibility','visible');
        
           var formData = new FormData();
         
             formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("documento", $scope.codigo);
           var _url= localStorage.getItem("I_E")=="E"?"controlador/EliminarBodegaEController.php":"controlador/EliminarBodegaController.php";
       
            $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Eliminado');    
                 else
                    if(confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
         $scope.Limpiar();
       
    };             
                  
    $scope.EliminarProducto=function()
    {
            if($scope.pp.secuencia!="")
            {
            $('#bloqueForm').css('visibility','visible');
        
            var formData = new FormData();
         
            formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("secuencia", $scope.pp.secuencia);
         
       
            $.ajax({
             type: "POST",
             url: "controlador/EliminarProductoCompraController.php",
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                  {                             
                     Herramientas.Notificar('Eliminado');    
                  }
                 else
                   if (confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 

                
                 $('#bloqueForm').css('visibility','hidden');
                
             }
             });
            }
             var index = -1;
             $scope.ptos.forEach(function (entry) 
             {
                index++;
                if (entry.producto == $scope.pp.producto)
                  $scope.ptos.splice(index, 1);
             });    
             
             $scope.codigo_editado='';
             $scope.seleccionado=false;
             $('#edicion').removeClass('direct-chat-contacts-open'); 
    };     
     
    $scope.ProductoxCodigo=function()
    {
        $scope.seleccionado=false;
        
       if($scope.codigo_editado!="")
      {
            $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.codigo_editado+"&criterio=C&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)
             {
                $scope.p=res.data[0];
                $scope.codigo_editado=res.data[0].codigo;
                $scope.descripcion=res.data[0].descripcion1;
                $scope.cantidad=0;
                $scope.valor=res.data[0].costo;
             }
             else
             {
                $scope.codigo_editado="";
                $scope.descripcion="";
                $scope.cantidad="";
                $scope.valor="";
                $('#edicion').removeClass('direct-chat-contacts-open');
                Herramientas.Notificar('No hay resultados'); 
             }
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        }); 
      }   
    };
    
    $scope._Subtotal=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=a.cantidad*a.valor;
      });
      return suma.toFixed(2);
    };
    
    $scope.Ultimo=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
        var _url= localStorage.getItem("I_E")=="I"?"controlador/UltimaBodegaController.php":"controlador/UltimaBodegaEController.php";
       
         $.ajax({
             type: "POST",
             url: _url ,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                 if(res === parseInt(res, 10)) 
                    $('#titulo').html(localStorage.getItem("I_E")=="I"?"Ingreso: "+res:"Egreso: "+res);    
                 else
                    Herramientas.Notificar('Error al cargar');   
                $('#bloqueForm').css('visibility','hidden');
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
       
    };
    
    $scope.Ultimo();
    
    $scope.Codigo_Cambio=function()
    {
        
       $('#bloqueForm').css('visibility','visible');
       var tipo=localStorage.getItem("I_E")=="I"?"NC":"ND";     
       $http.get('controlador/DatosBaseBodegaController.php?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo="+tipo).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                 $scope.fecha=res.data[0].fecha;                 
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al obtener la cabecera');   
            
            $('#bloqueForm').css('visibility','hidden');   
       }).
       error(function (data, status, headers, config)
       {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
         $('#bloqueForm').css('visibility','hidden');
        });
        
        
        $scope.ptos=[];               
        $http.get('controlador/DatosProductosVentaController.php?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo="+tipo).success(function (res)
        {
            if(Object.prototype.toString.call(res.data) === '[object Array]')
            {
                if(res.data.length>0)  
                {
                  res.data.forEach(function(a){
                      a.valor=parseFloat(a.valor).toFixed($scope.decimales);
                      a.valor1=parseFloat(a.valor1).toFixed($scope.decimales);
                  });     
                    
                 $scope.ptos=res.data;
                }
                else
                   Herramientas.Notificar('No hay productos'); 
            }
            else
              Herramientas.Notificar('Error al obtener el cuerpo');                  
        }).
        error(function (data, status, headers, config)
        {
            if(status===404)
               Herramientas.Notificar('Servidor no encontrado');
        });
        
       $('#edicion').removeClass('direct-chat-contacts-open');
       $scope.editando=true;
    };
    
    $scope.Editar=function(t)
    {
        $scope.codigo_editado=t.producto;
        $scope.descripcion=t.descripcion1;
        $scope.cantidad=t.cantidad;
        $scope.valor=t.valor;
        
        $scope.ubicaciones.forEach(function(a)
        {
            if(a.codigo==t.ubicacion)
            {
             $scope.ubicacion_seleccionada=a.codigo;
             $scope.ubicacion=$scope.ubicacion_seleccionada;
            }
        });
        
        $scope.seleccionado=true; 
        $scope.pp=t;
        $('#edicion').addClass('direct-chat-contacts-open');
    };
    
    $scope.ManejarProducto=function()
    {
        if($scope.cantidad<=0)
        {
            Herramientas.Notificar("cantidad debe ser mayor que cero");
            return;
        }
        
        
        if($scope.seleccionado)
        {
                        /*String producto,String cantidad,String bonificacion,String descripcion1,String valor,String valor1,String descuento,
                            String impuesto,String secuencia,String iva_v,String promedio,String costo,String ubicacion,String numprecio,
                            String serie,String cajas,String unidades,String fraccion,String iva,String pvp1,String pvp2,String pvp3,String pvp4*/           
            
             $scope.ptos.forEach(function(d)
             {
                 if(d.producto==$scope.pp.producto)
                 {
                    d.cantidad=$scope.cantidad;
                    d.bonificacion=0;
                   
                    d.valor=$scope.valor;
                    d.valor1=$scope.valor;
                    d.descuento=0;
             
                    d.impuesto=0;
                   
                    d.iva_v="N";
                    d.promedio=0;
                    d.costo=0;
                    d.ubicacion=$scope.ubicacion;
            
                    d.serie="";
                    d.cajas=0;
                    d.unidades=0;
                    d.fraccion="";
                 }    
             });
                        
        }
        else
        {
             var d={};
             d.producto=$scope.codigo_editado;
             d.cantidad=$scope.cantidad;
             d.bonificacion=0;
             d.descripcion1=$scope.descripcion;
             d.valor=$scope.valor;
             d.valor1=$scope.valor;
             d.descuento=0;
             
             d.impuesto=0;
             d.secuencia="";
             d.iva_v="N";
             d.promedio=0;
             d.costo=0;
             d.ubicacion=$scope.ubicacion;
             d.numprecio=$scope.p.costo;
             
             d.serie="";
             d.cajas=0;
             d.unidades=0;
             d.fraccion="";
             d.iva=$scope.p.iva;
             
             d.pvp1=$scope.p.pvp1;
             d.pvp2=$scope.p.pvp2;
             d.pvp3=$scope.p.pvp3;
             d.pvp4=$scope.p.pvp4;
             $scope.ptos.push(d);
        }
        
        $scope.codigo_editado='';
        $('#edicion').removeClass('direct-chat-contacts-open');
        
    };
       
    $scope.Limpiar_Edicion=function()
    {
        $scope.codigo_editado="";
        $scope.descripcion="";
        $scope.cantidad=localStorage.getItem("Cantidad");
        $scope.valor="";
        
        $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
        $scope.ubicacion=$scope.ubicacion_seleccionada;
        
        $scope.seleccionado=false; 
    };
    
     $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda+"&criterio="+$scope.criterio+"&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
    
    $scope.Limpiar=function()
    {
    $scope.codigo="";
    $scope.fecha=new Date().toISOString().split("T")[0];
    
    $scope.ptos=[];
    $('#edicion').removeClass('direct-chat-contacts-open');
    $scope.editando=false;
    $scope.seleccionado=false;
    
  
    };
    
    
     $scope.Establecer=function(t)
    {
        
     $scope.codigo_editado=t.codigo;
     $scope.descripcion=t.descripcion1;
     $scope.cantidad=0;
     $scope.valor=t.costo;
     
     $scope.seleccionado=false;

     $scope.p=t;
     $('#myModalBusqueda').modal('hide');
     $('#edicion').addClass('direct-chat-contacts-open');
    };
    
    
    $scope.ManejarBodega=function()
    {
         var formData = new FormData();
         formData.append("empresa", localStorage.getItem("empresa"));
         formData.append("f_i", $scope.fecha);
         var data=[];
         var _url;

        if($scope.editando)
        {
            if($scope.codigo=="")
            {
                Herramientas.Notificar("Debe seleccionar un codigo de producto");
                return;
            }
            
            formData.append("cod_proforma", $scope.codigo);
             _url= localStorage.getItem("I_E")=="E"?"controlador/ModificarBodegaEController.php":"controlador/ModificarBodegaController.php";
            
            $scope.ptos.forEach(function(s){
                
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.codproducto= s.producto;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.secuencia= s.secuencia;
                    d.descuento= s.descuento;
                    data.push(d);
            });
            
            formData.append("data", JSON.stringify(data));   
        }
        else
        {
             _url= localStorage.getItem("I_E")=="E"?"controlador/CrearBodegaEController.php":"controlador/CrearBodegaController.php"; 
           
             $scope.ptos.forEach(function(s){
                
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.codproducto= s.producto;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.descripcion1= s.descripcion1;
                    d.descuento= s.descuento;
                    data.push(d);
   
            });
            
             formData.append("data", JSON.stringify(data));    
        }
        
        $('#bloqueForm').css('visibility','visible');
        $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Guardado');    
                 else
                    if(confirm('Error al intentar Guardar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    }   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
            });
        
        $scope.Limpiar();
    };
    
    
    $scope.Ubicaciones=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/UbicacionController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.ubicaciones=res.data;
               $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
               $scope.ubicacion=$scope.ubicacion_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.Ubicaciones();
  
      
  
  } 
  ])
  .controller('ControladorIngresoClientes',['$scope','$http','Herramientas','$q',function($scope,$http,Herramientas,$q){
                 
     $scope.editando=false;
     $scope.peticionando=false;
     
      
     $scope.PorCedula=function()
     {
          $('#bloqueForm').css('visibility','visible');
          $http.get('controlador/ClientePorCedulaController.php?empresa='+localStorage.getItem("empresa")+"&cedula="+$scope.cedula).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.Establecer(res.data[0]);
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
               
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        }); 
         $('#bloqueForm').css('visibility','hidden');
     };
     
     
      $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ClienteController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
     
     $scope.Limpiar=function()
    {
     $scope.codigo="";
    $scope.cedula="";
    $scope.nombre="";
    $scope.direccion='';
    $scope.telefono='';
    $scope.email='';
     
    $scope.zona_seleccionada=$scope.zonas[0].codigo;
    $scope.zona=$scope.zona_seleccionada;
    $scope.vendedor_seleccionado=$scope.vendedores[0].codigo;
    $scope.vendedor=$scope.vendedor_seleccionado;
    
    $scope.editando=false;
    };
     
     
    $scope.Establecer=function(t)
    {
     $scope.Limpiar();   
        
    $scope.codigo=t.codigo;
    $scope.cedula=t.cedula_ruc;
    $scope.nombre=t.nombre;
    $scope.direccion=t.direccion1;
    $scope.telefono=t.telefono;
    $scope.email=t.e_mail;
    
 
    
    $scope.zonas.forEach(function(a){
        if(a.codigo==t.zona)
        {
          $scope.zona_seleccionada=a.codigo;
          $scope.zona=$scope.zona_seleccionada;
        }
   });
    
    $scope.vendedores.forEach(function(a){
        if(a.codigo==t.vendedor)
        {
         $scope.vendedor_seleccionado=a.codigo;
         $scope.vendedor=$scope.vendedor_seleccionado;
        }
   });
    
    $scope.editando=true;
    $('#myModalBusqueda').modal('hide');
    };
     

     $scope.vendedores=[];         $scope.vendedor_seleccionado; 
     $scope.zonas=[];              $scope.zona_seleccionada;
  

     $scope.productos=[];
     $scope.nombre_busqueda="";
    

     $scope.Eliminar=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
         formData.append("cod_cliente", $scope.codigo);
       
         $.ajax({
             type: "POST",
             url: 'controlador/EliminarClienteController.php',
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Eliminado');    
                 else
                    Herramientas.Notificar('Error al eliminar');   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
         $scope.Limpiar();
         
    };


      $scope.Vendedores=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/VendedorController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0) 
             {
               $scope.vendedores=res.data;
               $scope.vendedor_seleccionado=$scope.vendedores[0].codigo;
               $scope.vendedor=$scope.vendedor_seleccionado;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
      $scope.Zonas=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/ZonaController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.zonas=res.data;
               $scope.zona_seleccionada=$scope.zonas[0].codigo;
               $scope.zona=$scope.zona_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
     
      $scope.Vendedores();
      $scope.Zonas();
     
    
    $scope.Ultimo=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
       
          $.ajax({
             type: "POST",
             url: 'controlador/UltimoClienteController.php',
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                 if(res === parseInt(res, 10)) 
                    $scope.codigo=res;    
                 else
                    Herramientas.Notificar('Error al obtener el ultimo codigo');   
                $('#bloqueForm').css('visibility','hidden');
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
       
    };
     
     $scope.Ultimo(); 
   
    
    $scope.Guardar=function()
    {
        
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         var _url="controlador/CrearClienteController.php";
         
         if($scope.editando)
         {
             formData.append("cod_cliente", $scope.codigo);
             _url="controlador/ModificarClienteController.php";
         }
         
         formData.append("empresa", localStorage.getItem("empresa"));
         formData.append("cedula_ruc", $scope.cedula);
         formData.append("nombre", $scope.nombre);
         formData.append("direccion1", $scope.direccion);
         formData.append("telefono", $scope.telefono);
         formData.append("e_mail", $scope.email);
         formData.append("vendedor",$scope.vendedor);
         formData.append("zona", $scope.zona);
        
         $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Guardado');    
                 else
                    Herramientas.Notificar('Error al Guardar');   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
     
         
      $scope.Limpiar();
          
    };

   
    
  } 
  ])
  .controller('ControladorProveedores',['$scope','$http','Herramientas','$q',function($scope,$http,Herramientas,$q){
              
     $scope.editando=false;
     $scope.peticionando=false;
     
     
     $scope.PorCedula=function()
     {
          $('#bloqueForm').css('visibility','visible');
          $http.get('controlador/ProveedorPorCedulaController.php?empresa='+localStorage.getItem("empresa")+"&cedula="+$scope.cedula).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.Establecer(res.data[0]);
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
               
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        }); 
         $('#bloqueForm').css('visibility','hidden');
     };
     
      $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ProveedorController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    
     $scope.Limpiar=function()
    {
     $scope.codigo="";
    $scope.cedula="";
    $scope.nombre="";
    $scope.direccion='';
    $scope.telefono='';
    $scope.email='';
    $scope.fax='';
    $scope.ciudad='';
   
    $scope.iva=false;
    $scope.fuente=false;
    
    $scope.editando=false;
    };
     
     
    $scope.Establecer=function(t)
    {
     $scope.Limpiar();   
        
    $scope.codigo=t.codigo;
    $scope.cedula=t.cedula_ruc;
    $scope.nombre=t.nombre;
    $scope.direccion=t.direccion1;
    $scope.telefono=t.telefono;
    $scope.email=t.e_mail;
    $scope.fax=t.fax;
    $scope.ciudad=t.ciudad;
    
    if(t.fuente=='S')
    {
        $scope.fuente=true;
    }
    else
    {
        $scope.fuente=false;
    }
    
    if(t.iva=='S')
    {
        $scope.iva=true;
    }
    else
    {
      $scope.iva=false;
    }
    
    $scope.editando=true;
    $('#myModalBusqueda').modal('hide');
    };
     

     $scope.productos=[];
     $scope.nombre_busqueda="";
     $scope.codigo="";
 
     $scope.Eliminar=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
         formData.append("cod_proveedor", $scope.codigo);
       
         $.ajax({
             type: "POST",
             url: 'controlador/EliminarProveedorController.php',
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Eliminado');    
                 else
                    Herramientas.Notificar('Error al eliminar');   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
         $scope.Limpiar();
         
    };


    $scope.Ultimo=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
       
          $.ajax({
             type: "POST",
             url: 'controlador/UltimoProveedorController.php',
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                 if(res === parseInt(res, 10)) 
                    $scope.codigo=res;    
                 else
                    Herramientas.Notificar('Error al obtener el ultimo codigo');   
                $('#bloqueForm').css('visibility','hidden');
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
       
    };
     
     $scope.Ultimo(); 
   
    $scope.Guardar=function()
    {
        
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         var _url="controlador/CrearProovedorController.php";
         
         if($scope.editando)
         {
             formData.append("cod_cliente", $scope.codigo);
             _url="controlador/ModificarProveedorController.php";
         }
         
         formData.append("empresa", localStorage.getItem("empresa"));
         formData.append("cedula_ruc", $scope.cedula);
         formData.append("nombre", $scope.nombre);
         formData.append("direccion1", $scope.direccion);
         formData.append("telefono", $scope.telefono);
         formData.append("e_mail", $scope.email);
         formData.append("fax",$scope.fax);
         formData.append("ciudad", $scope.ciudad);
         formData.append("fuente",$scope.fuente?'S':'N');
         formData.append("iva", $scope.iva?'S':'N');
        
         $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Guardado');    
                 else
                    Herramientas.Notificar('Error al Guardar');   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
     
         
      $scope.Limpiar();
          
    };
    
  } 
  ])
  .controller('ControladorCompra',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
     $scope.decimales=localStorage.getItem("Decimales").split(".")[1].length; 
    $scope.existencia_producto=0.0;
    
    $scope.grupos=[{nombre:"Linea",codigo:"L"},{nombre:"Codigo de Barra",codigo:"B"},{nombre:"Grupo",codigo:"B"},{nombre:"Referencia",codigo:"B"},{nombre:"Codigo",codigo:"C"},{nombre:"Descripcion",codigo:"D"}];
    $scope.criterio_seleccionado='D';
    $scope.criterio=$scope.criterio_seleccionado;
    $scope.codigo_editado="";
    $scope.ptos=[];
   
    
    $scope.p=null;
    $scope.pp=null;
  

      $scope.Eliminar=function()
    {
        if($scope.codigo=="")
        {
            Herramientas.Notificar("Debe seleccionar un codigo de producto");
            return;
        }
        
        $('#bloqueForm').css('visibility','visible');
        
           var formData = new FormData();
         
             formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("documento", $scope.codigo);
            var _url= "controlador/EliminarCompraController.php";
       
            $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Eliminado');    
                 else
                    if(confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
         $scope.Limpiar();
       
    };             
                  
    $scope.ProductoxCodigo=function()
    {
        $scope.seleccionado=false;
        
       if($scope.codigo_editado!="")
      {
            $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.codigo_editado+"&criterio=C&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)
             {
                $scope.p=res.data[0];
                $scope.codigo_editado=res.data[0].codigo;
                $scope.descripcion=res.data[0].descripcion1;
                $scope.cantidad=0;
                $scope.valor=res.data[0].costo;
                $scope.iva_producto=res.data[0].iva=='S'?true:false;
                $scope.existencia_producto=res.data[0].existencia==null?0.0:res.data[0].existencia;
             }
             else
             {
                $scope.codigo_editado="";
                $scope.descripcion="";
                $scope.cantidad="";
                $scope.valor="";
                $scope.iva_producto=false;
                $scope.existencia_producto=0.0;
                $('#edicion').removeClass('direct-chat-contacts-open');
                Herramientas.Notificar('No hay resultados'); 
             }
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        }); 
      }   
    };
   
    $scope._Subtotal=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=a.cantidad*a.valor;
      });
      return suma.toFixed(2);
    };
    
    $scope._Descuento=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=(a.valor*a.cantidad )* a.descuento/100;
      });
      return suma.toFixed(2);  
    };
    
    $scope._Iva=function()
    {
        var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=( (a.cantidad *a.valor) - ((a.cantidad *a.valor)*(a.descuento/100) )  )  *(a.impuesto/100);
      });
      return suma.toFixed(2);  
    };
    
     $scope._Total=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=a.cantidad*a.valor;
      });
        
      var st=suma;
        
        suma=0;
       $scope.ptos.forEach(function(a){
          suma+=( (a.cantidad *a.valor) - ((a.cantidad *a.valor)*(a.descuento/100) )  )  *(a.impuesto/100);
      });
      
      var i=suma;
      
      suma=0;
         $scope.ptos.forEach(function(a){
          suma+=(a.valor*a.cantidad )* a.descuento/100;
      });
      
      var d=suma;
      return (st+i-d).toFixed(2);  
    };
    
     
    $scope.Ultimo=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
         var _url= "controlador/UltimaCompraController.php";
       
         $.ajax({
             type: "POST",
             url: _url ,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                 if(res === parseInt(res, 10)) 
                    $('#titulo').html("Compra: "+res);    
                 else
                    Herramientas.Notificar('Error al obtener codigo de producto');   
                $('#bloqueForm').css('visibility','hidden');
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
       
    };
    
    $scope.Ultimo();
    
       
    $scope.Limpiar_Edicion=function()
    {
        $scope.codigo_editado="";
        $scope.descripcion="";
        $scope.cantidad=localStorage.getItem("Cantidad");
        $scope.valor="";
        $scope.descuento="";
        $scope.iva_producto=false;
        $scope.existencia_producto=0.0;
        
        $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
        $scope.ubicacion=$scope.ubicacion_seleccionada;
        
        $scope.seleccionado=false; 
    };
    
     $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda+"&criterio="+$scope.criterio+"&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
   
    
    $scope.Limpiar=function()
    {
    $scope.codigo="";
    $scope.proveedor="";
    $scope.nombre="";
    $scope.cedula="";
    
    var hoy=new Date();
    var despues=hoy.setDate(hoy.getDate() + parseInt(localStorage.getItem("Dias")));
    despues= new Date(despues).toLocaleString().split(",")[0]; 
         
    hoy=new Date().toLocaleString().split(",")[0];
         
    $('#reservation').data('daterangepicker').setStartDate(hoy);
    $('#reservation').data('daterangepicker').setEndDate(despues);
    
    $scope.estacion="";
    $scope.punto="";
    $scope.referencia="";
    
    $scope.autorizacion="";
    $scope.iva=false;
    $scope.fuente=false;
    
    
    $scope.ptos=[];
    $('#edicion').removeClass('direct-chat-contacts-open');
    $scope.editando=false;
    $scope.seleccionado=false;
    
  
    };
    
    $scope.Ubicaciones=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/UbicacionController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.ubicaciones=res.data;
               $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
               $scope.ubicacion=$scope.ubicacion_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.Ubicaciones();
    
     $scope.Codigo_Cambio=function()
    {
        
       $('#bloqueForm').css('visibility','visible');  
       $http.get('controlador/DatosBaseCompraController.php?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo=CP").success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                 $scope.proveedor=res.data[0].pro_cli;
                 $scope.nombre=res.data[0].nombre;
                 $scope.cedula=res.data[0].cedula_ruc;
                 $scope.estacion=res.data[0].estacion;
                 $scope.punto=res.data[0].punto;
                 $scope.referencia=res.data[0].referencia;
                 $scope.autorizacion=res.data[0].autorizacion;
                 $scope.iva=res.data[0].r_iva=='S'?true:false;
                 $scope.fuente=res.data[0].r_fuente=='S'?true:false;
                 
                var fecha= res.data[0].fecha.split("-");
                fecha=fecha[1]+"/"+fecha[2]+"/"+fecha[0];
                
                var fechaV= res.data[0].fechaV.split("-");
                fechaV=fechaV[1]+"/"+fechaV[2]+"/"+fechaV[0];
                
                $('#reservation').data('daterangepicker').setStartDate(fecha);
                $('#reservation').data('daterangepicker').setEndDate(fechaV);
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al obtener la cabecera');   
            
            $('#bloqueForm').css('visibility','hidden');   
       }).
       error(function (data, status, headers, config)
       {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
         $('#bloqueForm').css('visibility','hidden');
        });
        
        
        $scope.ptos=[];               
        $http.get('controlador/DatosProductosVentaController.php?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo=CP").success(function (res)
        {
            if(Object.prototype.toString.call(res.data) === '[object Array]')
            {
                if(res.data.length>0)  
                {
                  res.data.forEach(function(a){
                      a.valor=parseFloat(a.valor).toFixed($scope.decimales);
                      a.valor1=parseFloat(a.valor1).toFixed($scope.decimales);
                  });     
                    
                 $scope.ptos=res.data;
                }
                else
                   Herramientas.Notificar('No hay productos'); 
            }
            else
              Herramientas.Notificar('Error al obtener el cuerpo');                  
        }).
        error(function (data, status, headers, config)
        {
            if(status===404)
               Herramientas.Notificar('Servidor no encontrado');
        });
        
       $('#edicion').removeClass('direct-chat-contacts-open');
       $scope.editando=true;
    };
    
    $scope.Editar=function(t)
    {
        $scope.codigo_editado=t.producto;
        $scope.descripcion=t.descripcion1;
        $scope.cantidad=t.cantidad;
        $scope.valor=t.valor;
        $scope.descuento=t.descuento;
        
        if(( (t.cantidad *t.valor) - ((t.cantidad *t.valor)*(t.descuento/100) )  )  *(t.impuesto/100)!=0)
            $scope.iva_producto=true;
        else
            $scope.iva_producto=false;
        
        $scope.ubicaciones.forEach(function(a)
        {
            if(a.codigo==t.ubicacion)
            {
             $scope.ubicacion_seleccionada=a.codigo;
             $scope.ubicacion=$scope.ubicacion_seleccionada;
            }
        });
        
        $scope.seleccionado=true; 
        $scope.pp=t;
        $('#edicion').addClass('direct-chat-contacts-open');
    };
    
     $scope.ManejarProducto=function()
    {
        if($scope.cantidad<=0)
        {
            Herramientas.Notificar("cantidad debe ser mayor que cero");
            return;
        }
        
        
        if($scope.seleccionado)
        {
                            
             $scope.ptos.forEach(function(d)
             {
                 if(d.producto==$scope.pp.producto)
                 {
                    d.cantidad=$scope.cantidad;
                    d.bonificacion=0;
                   
                    d.valor=$scope.valor;
                    d.valor1=$scope.valor;
                    d.descuento=$scope.descuento;
                    
                     if($scope.iva_producto)
                    {
                        d.iva_v="S";
                        d.impuesto=localStorage.getItem("IVA");
                    }
                    else
                    {
                        d.iva_v = "N";
                        d.impuesto="0";
                    }

                                        
                    d.promedio=0;
                    d.costo=0;
                    d.ubicacion=$scope.ubicacion;
            
                    d.serie="";
                    d.cajas=0;
                    d.unidades=0;
                    d.fraccion="";
                 }    
             });
                        
        }
        else
        {
             var d={};
             d.producto=$scope.codigo_editado;
             d.cantidad=$scope.cantidad;
             d.bonificacion=0;
             d.descripcion1=$scope.descripcion;
             d.valor=$scope.valor;
             d.valor1=$scope.valor;
            
             d.descuento=$scope.descuento;
                    
                     if($scope.iva_producto)
                    {
                        d.iva_v="S";
                        d.impuesto=localStorage.getItem("IVA");
                    }
                    else
                    {
                        d.iva_v = "N";
                        d.impuesto="0";
                    }
             d.secuencia="";
             
             d.promedio=0;
             d.costo=0;
             d.ubicacion=$scope.ubicacion;
             d.numprecio="";
             
             d.serie="";
             d.cajas=0;
             d.unidades=0;
             d.fraccion="";
             d.iva=$scope.p.iva;
             
             d.pvp1=$scope.p.pvp1;
             d.pvp2=$scope.p.pvp2;
             d.pvp3=$scope.p.pvp3;
             d.pvp4=$scope.p.pvp4;
             $scope.ptos.push(d);
        }
        
        $scope.codigo_editado='';
        $('#edicion').removeClass('direct-chat-contacts-open');
        
    };
    
    $scope.EliminarProducto=function()
    {
            if($scope.pp.secuencia!="")
            {
            $('#bloqueForm').css('visibility','visible');
        
            var formData = new FormData();
         
            formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("secuencia", $scope.pp.secuencia);
         
       
            $.ajax({
             type: "POST",
             url: "controlador/EliminarProductoCompraController.php",
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                  {                             
                     Herramientas.Notificar('Eliminado');    
                  }
                 else
                   if (confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 

                
                 $('#bloqueForm').css('visibility','hidden');
                
             }
             });
            }
             var index = -1;
             $scope.ptos.forEach(function (entry) 
             {
                index++;
                if (entry.producto == $scope.pp.producto)
                  $scope.ptos.splice(index, 1);
             });    
             
             $scope.codigo_editado='';
             $scope.seleccionado=false;
             $('#edicion').removeClass('direct-chat-contacts-open'); 
    };     
    
     $scope.ManejarBodega=function()
    {
         var formData = new FormData();
         formData.append("empresa", localStorage.getItem("empresa"));
         
          var f_i =$('#reservation').val().split(" - ")[0].split("/");
          var f_f =$('#reservation').val().split(" - ")[1].split("/");
         
         formData.append("f_i",f_i[2]+"/"+f_i[0]+"/"+f_i[1] );
         formData.append("f_f",f_f[2]+"/"+f_f[0]+"/"+f_f[1]);
         formData.append("cod_cliente",$scope.proveedor);
         formData.append("estacion",$scope.estacion);
         formData.append("punto",$scope.punto);
         formData.append("referencia",$scope.referencia);
         formData.append("autorizacion",$scope.autorizacion);
         formData.append("r_iva",$scope.iva?'S':'N');
         formData.append("r_fuente",$scope.fuente?'S':'N');
         
         var data=[];
         var _url;

        if($scope.proveedor=="")
            {
                Herramientas.Notificar("Debe seleccionar un proveedor");
                return;
            }

        if($scope.editando)
        {
            if($scope.codigo=="")
            {
                Herramientas.Notificar("Debe seleccionar un codigo de producto");
                return;
            }
            
            formData.append("cod_proforma", $scope.codigo);
             _url= "controlador/ModificarCompraController.php";
            
            $scope.ptos.forEach(function(s){
                
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.codproducto= s.producto;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.secuencia= s.secuencia;
                    d.descuento= s.descuento;
                    data.push(d);
            });
            
            formData.append("data", JSON.stringify(data));   
        }
        else
        {
             _url= "controlador/CrearCompraController.php"; 
           
             $scope.ptos.forEach(function(s){
                
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.codproducto= s.producto;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.descripcion1= s.descripcion1;
                    d.descuento= s.descuento;
                    data.push(d);
   
            });
            
             formData.append("data", JSON.stringify(data));    
        }
        
        $('#bloqueForm').css('visibility','visible');
        $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Guardado');    
                 else
                    if(confirm('Error al intentar Guardar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    }   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
            });
        
        $scope.Limpiar();
    };
    
      $scope.Establecer=function(t)
    {
        
     $scope.codigo_editado=t.codigo;
     $scope.descripcion=t.descripcion1;
     $scope.cantidad=0;
     $scope.valor=t.costo;
     $scope.existencia_producto=t.existencia;
     $scope.iva_producto=t.iva=='S'?true:false
     $scope.seleccionado=false;

     $scope.p=t;
     $('#myModalBusqueda').modal('hide');
     $('#edicion').addClass('direct-chat-contacts-open');
    };
    
    $scope.Proveedor_Cambio=function()
    {
        $('#bloqueForm').css('visibility','visible');
       $http.get('controlador/ProveedorCedulaRucController.php?empresa='+localStorage.getItem("empresa")+"&cedula="+$scope.proveedor).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                 $scope.cedula=res.data[0].cedula_ruc;
                 $scope.nombre=res.data[0].nombre;
             }
             else
             {
               $scope.proveedor="";  
             Herramientas.Notificar('No hay resultados'); 
             }
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
            $('#bloqueForm').css('visibility','hidden');    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        $('#bloqueForm').css('visibility','hidden');
           
        });
    };
    
  } 
  ])
  .controller('ControladorProformaVenta',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
     
    $scope.decimales=localStorage.getItem("Decimales").split(".")[1].length; 
     
    $scope.impuesto_producto_editado=localStorage.getItem("IVA"); 
    $scope.existencia_producto=0.0;
    $scope.deuda=0.0;
    
    $scope.precios=[{codigo:4,valor:4},{codigo:3,valor:3},{codigo:2,valor:2},{codigo:1,valor:1}]; $scope.precio_seleccionado=localStorage.getItem("Precio");
    $scope.vendedores=[];         $scope.vendedor_seleccionado; 
    $scope.cajas=[];              $scope.caja_seleccionada; 
    
    $scope.grupos=[{nombre:"Linea",codigo:"L"},{nombre:"Codigo de Barra",codigo:"B"},{nombre:"Grupo",codigo:"B"},{nombre:"Referencia",codigo:"B"},{nombre:"Codigo",codigo:"C"},{nombre:"Descripcion",codigo:"D"}];
    $scope.criterio_seleccionado='D';
    $scope.criterio=$scope.criterio_seleccionado;
    $scope.codigo_editado="";
    $scope.ptos=[];
   
    
    $scope.p=null;
    $scope.pp=null;
  
   $scope.BuscarCliente=function()
    {
       $scope.clientes=[];
       $scope.peticionando=true;
       $http.get('controlador/ClienteController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.clientes=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
     $scope.EstablecerCliente=function(t)
     {
         $scope.cliente=t.codigo;
         $scope.cedula=t.cedula_ruc;
         $scope.nombre=t.nombre;
         $('#myModalBusquedaCliente').modal('hide');
     };
  
        
    $scope.Ubicaciones=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/UbicacionController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.ubicaciones=res.data;
               $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
               $scope.ubicacion=$scope.ubicacion_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.Ubicaciones();
  
     $scope.Vendedores=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/VendedorController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0) 
             {
               $scope.vendedores=res.data;
               $scope.vendedor_seleccionado=localStorage.getItem("Vendedor");
               $scope.vendedor=$scope.vendedor_seleccionado;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
      $scope.Vendedores();
      
      $scope.Cajas=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/CajaController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0) 
             {
               $scope.cajas=res.data;
               $scope.caja_seleccionada=localStorage.getItem("Caja");
               $scope.caja=$scope.caja_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
      $scope.Cajas();
      
    $scope.Ultimo=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
         var _url=localStorage.getItem("P_V")=="P"?"controlador/UltimaProformaController.php":"controlador/UltimaVentaController.php";
       
         $.ajax({
             type: "POST",
             url: _url ,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                 if(res === parseInt(res, 10)) 
                 {
                     if($location.path()=="/registro_ProformaVenta")
                      $('#titulo').html("Proforma: "+res);    
                    else
                        $('#titulo').html("Venta: "+res);    
                }
                 else
                    Herramientas.Notificar('Error al obtener el ultimo codigo');   
                $('#bloqueForm').css('visibility','hidden');
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
       
    };
    
    $scope.Ultimo();

      $scope._Subtotal=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=a.cantidad*a.valor;
      });
      return suma.toFixed(2);
    };
    
    $scope._Descuento=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=(a.valor*a.cantidad )* a.descuento/100;
      });
      return suma.toFixed(2);  
    };
    
    $scope._Iva=function()
    {
        var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=( (a.cantidad *a.valor) - ((a.cantidad *a.valor)*(a.descuento/100) )  )  *(a.impuesto/100);
      });
      return suma.toFixed(2);  
    };
    
     $scope._Total=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=a.cantidad*a.valor;
      });
        
      var st=suma;
        
        suma=0;
       $scope.ptos.forEach(function(a){
          suma+=( (a.cantidad *a.valor) - ((a.cantidad *a.valor)*(a.descuento/100) )  )  *(a.impuesto/100);
      });
      
      var i=suma;
      
      suma=0;
         $scope.ptos.forEach(function(a){
          suma+=(a.valor*a.cantidad )* a.descuento/100;
      });
      
      var d=suma;
      return (st+i-d).toFixed(2);  
    };
   
//-------------------------------------------------------------------------------------------------------------------
    $scope.Eliminar=function()
    {
        if($scope.codigo=="")
        {
            Herramientas.Notificar("Debe seleccionar un codigo de producto");
            return;
        }
        
        $('#bloqueForm').css('visibility','visible');
        
           var formData = new FormData();
         
             formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("documento", $scope.codigo);
            var _url=localStorage.getItem("P_V")=="P"?"controlador/EliminarProformaController.php":"controlador/EliminarVentaController.php";
       
            $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Eliminado');    
                 else
                    if(confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
         $scope.Limpiar();
       
    };             
                  
    $scope.ProductoxCodigo=function()
    {
        $scope.seleccionado=false;
        
       if($scope.codigo_editado!="")
      {
            $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.codigo_editado+"&criterio=C&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)
             {
                $scope.p=res.data[0];
                $scope.codigo_editado=res.data[0].codigo;
                $scope.descripcion=res.data[0].descripcion1;
                $scope.cantidad=0;
                
                $scope.precio=localStorage.getItem("Precio");
                switch(parseInt(localStorage.getItem("Precio")))
                {
                    case 1: $scope.valor=res.data[0].pvp1;  break;
                        case 2: $scope.valor=res.data[0].pvp2; break;
                            case 3: $scope.valor=res.data[0].pvp3; break;
                                default: $scope.valor=res.data[0].pvp4; break;
                }
                
                $scope.iva_producto=res.data[0].iva=='S'?true:false;
                $scope.existencia_producto=res.data[0].existencia==null?0.0:res.data[0].existencia;
             
             
             }
             else
             {
                $scope.codigo_editado="";
                $scope.descripcion="";
                $scope.cantidad="";
                $scope.valor="";
                $scope.iva_producto=false;
                $scope.existencia_producto=0.0;
                $('#edicion').removeClass('direct-chat-contacts-open');
                Herramientas.Notificar('No hay resultados'); 
             }
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        }); 
      }   
    };
   
      
    $scope.Limpiar_Edicion=function()
    {
        $scope.codigo_editado="";
        $scope.descripcion="";
        $scope.cantidad=localStorage.getItem("Cantidad");
        $scope.valor="";
        $scope.descuento="0.0";
        $scope.iva_producto=false;
        $scope.existencia_producto=0.0;
        
        $scope.precio=localStorage.getItem("Precio");
        
        $scope.ubicacion_seleccionada=localStorage.getItem("Bodega");
        $scope.ubicacion=$scope.ubicacion_seleccionada;
        
        $scope.seleccionado=false; 
    };
    
     $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda+"&criterio="+$scope.criterio+"&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
   
    
    $scope.Limpiar=function()
    {
     $scope.codigo="";
     $scope.codigo_editado="";
     
     $scope.cliente=localStorage.getItem("Cliente");
     $scope.Cliente_Cambio();
     
     $scope.vendedor_seleccionado=localStorage.getItem("Vendedor");
     $scope.vendedor=$scope.vendedor_seleccionado;
     
     $scope.caja_seleccionada=localStorage.getItem("Caja");
     $scope.caja=$scope.caja_seleccionada;
    
    var hoy=new Date();
    var despues=hoy.setDate(hoy.getDate() + parseInt(localStorage.getItem("Dias")));
    despues= new Date(despues).toLocaleString().split(",")[0]; 
         
    hoy=new Date().toLocaleString().split(",")[0];
         
    $('#reservation').data('daterangepicker').setStartDate(hoy);
    $('#reservation').data('daterangepicker').setEndDate(despues);
    
    
    
    $scope.ptos=[];
    $('#edicion').removeClass('direct-chat-contacts-open');
    $scope.editando=false;
    $scope.seleccionado=false;

    };

    
     $scope.Codigo_Cambio=function()
    {
        
       $('#bloqueForm').css('visibility','visible');  
       
       var _url=$location.path()=="/registro_ProformaVenta"?"controlador/DatosBaseProformaController.php":"controlador/DatosBaseVentaController.php";
       
       $http.get(_url+"?empresa="+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo=FC").success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                 $scope.cliente=res.data[0].pro_cli;
                 $scope.nombre=res.data[0].nombre;
                 $scope.cedula=res.data[0].cedula_ruc;
                 
                 $scope.caja_seleccionada=res.data[0].caja;
                 $scope.caja=$scope.caja_seleccionada;
               
                 $scope.vendedor_seleccionado=res.data[0].vendedor;
                 $scope.vendedor=$scope.vendedor_seleccionado;
                 
                var fecha= res.data[0].fecha.split("-");
                fecha=fecha[1]+"/"+fecha[2]+"/"+fecha[0];
                
                var fechaV= res.data[0].fechaV.split("-");
                fechaV=fechaV[1]+"/"+fechaV[2]+"/"+fechaV[0];
                
                $('#reservation').data('daterangepicker').setStartDate(fecha);
                $('#reservation').data('daterangepicker').setEndDate(fechaV);
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al obtener la cabecera');   
            
            $('#bloqueForm').css('visibility','hidden');   
       }).
       error(function (data, status, headers, config)
       {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
         $('#bloqueForm').css('visibility','hidden');
        });
        
        _url=$location.path()=="/registro_ProformaVenta"?"controlador/DatosProductosProformaController.php":"controlador/DatosProductosVentaController.php";
        
        $scope.ptos=[];               
        $http.get(_url+'?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo=FC").success(function (res)
        {
            if(Object.prototype.toString.call(res.data) === '[object Array]')
            {
                if(res.data.length>0)  
                {
                  res.data.forEach(function(a){
                      a.valor=parseFloat(a.valor).toFixed($scope.decimales);
                      a.valor1=parseFloat(a.valor1).toFixed($scope.decimales);
                  });     
                    
                 $scope.ptos=res.data;
                }
                else
                   Herramientas.Notificar('No hay productos'); 
            }
            else
              Herramientas.Notificar('Error al obtener el cuerpo');                  
        }).
        error(function (data, status, headers, config)
        {
            if(status===404)
               Herramientas.Notificar('Servidor no encontrado');
        });
        
       $('#edicion').removeClass('direct-chat-contacts-open');
       $scope.editando=true;
    };
    
    $scope.Editar=function(t)
    {
        $scope.codigo_editado=t.producto;
        $scope.descripcion=t.descripcion1;
        $scope.cantidad=t.cantidad;
        $scope.valor=t.valor;
        $scope.descuento=t.descuento;
        
        $scope.precio=t.numprecio;
        
        if(( (t.cantidad *t.valor) - ((t.cantidad *t.valor)*(t.descuento/100) )  )  *(t.impuesto/100)!=0)
        {
            $scope.iva_producto=true;
            var g= t.valor *( 1+( t.impuesto /100));
            $scope.valor=g;
            $scope.total=t.cantidad*(t.valor *( 1+( t.impuesto/100)));
        }
        else
            $scope.iva_producto=false;
        
        $scope.ubicaciones.forEach(function(a)
        {
            if(a.codigo==t.ubicacion)
            {
             $scope.ubicacion_seleccionada=a.codigo;
             $scope.ubicacion=$scope.ubicacion_seleccionada;
            }
        });
        
        $scope.seleccionado=true; 
        $scope.pp=t;
        $('#edicion').addClass('direct-chat-contacts-open');
    };
    
     $scope.ManejarProducto=function()
    {
        if($scope.cantidad<=0)
        {
            Herramientas.Notificar("cantidad debe ser mayor que cero");
            return;
        }
        

        if($scope.seleccionado)
        {
                            
             $scope.ptos.forEach(function(d)
             {
                 if(d.producto==$scope.pp.producto)
                 {
                    d.cantidad=$scope.cantidad;
                    d.bonificacion=0;
                   
                   
                    d.numprecio=$scope.precio;
                   
                    d.valor=$scope.valor;
                    d.valor1=$scope.valor;
                    d.descuento=$scope.descuento;
                    
                    if($scope.iva_producto)
                    {
                     var temp_valor=$scope.valor;
                     var temp_iva=localStorage.getItem("IVA");
                     d.valor=(temp_valor/(1+(temp_iva/100))).toFixed(4);
                    }
                    
                    
                    
                     if($scope.iva_producto)
                    {
                        d.iva_v="S";
                        d.impuesto=localStorage.getItem("IVA");
                    }
                    else
                    {
                        d.iva_v = "N";
                        d.impuesto="0";
                    }

                                        
                    d.promedio=0;
                    d.costo=0;
                    d.ubicacion=$scope.ubicacion;
            
                    d.serie="";
                    d.cajas=0;
                    d.unidades=0;
                    d.fraccion="";
                 }    
             });
                        
        }
        else
        {
            
            if( localStorage.getItem("Stock")=="0"&& $scope.cantidad> $scope.existencia_producto)
            {
             Herramientas.Notificar("Imposible procesar solicitud,solo tiene en existencia: "+$scope.existencia_producto);
             return;
            }
             var d={};
             d.producto=$scope.codigo_editado;
             d.cantidad=$scope.cantidad;
             d.bonificacion=0;
             d.descripcion1=$scope.descripcion;
             d.valor=$scope.valor;
             d.valor1=$scope.valor;
            
             d.descuento=$scope.descuento;
                    
                    if($scope.iva_producto)
                    {
                     var temp_valor=$scope.valor;
                     var temp_iva=localStorage.getItem("IVA");
                     d.valor=(temp_valor/(1+(temp_iva/100))).toFixed(4);
                    }
                    
                   
                    
                     if($scope.iva_producto)
                    {
                        d.iva_v="S";
                        d.impuesto=localStorage.getItem("IVA");
                    }
                    else
                    {
                        d.iva_v = "N";
                        d.impuesto="0";
                    }
             d.secuencia="";
             
             d.promedio=0;
             d.costo=0;
             d.ubicacion=$scope.ubicacion;
             d.numprecio=$scope.precio;
             
             d.serie="";
             d.cajas=0;
             d.unidades=0;
             d.fraccion="";
             d.iva=$scope.p.iva;
             
             d.pvp1=$scope.p.pvp1;
             d.pvp2=$scope.p.pvp2;
             d.pvp3=$scope.p.pvp3;
             d.pvp4=$scope.p.pvp4;
             $scope.ptos.push(d);
        }
        
        $scope.codigo_editado='';
        $('#edicion').removeClass('direct-chat-contacts-open');
        
    };
    
    $scope.EliminarProducto=function()
    {
            if($scope.pp.secuencia!="")
            {
            $('#bloqueForm').css('visibility','visible');
        
            var formData = new FormData();
         
            formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("secuencia", $scope.pp.secuencia);
         
            var _url=$location.path()=="/registro_ProformaVenta"?"controlador/EliminarProductoProformaController.php":"controlador/EliminarProductoVentaController.php";
       
            $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                  {                             
                     Herramientas.Notificar('Eliminado');    
                  }
                 else
                   if (confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 

                
                 $('#bloqueForm').css('visibility','hidden');
                
             }
             });
            }
             var index = -1;
             $scope.ptos.forEach(function (entry) 
             {
                index++;
                if (entry.producto == $scope.pp.producto)
                  $scope.ptos.splice(index, 1);
             });    
             
             $scope.codigo_editado='';
             $scope.seleccionado=false;
             $('#edicion').removeClass('direct-chat-contacts-open'); 
    };     
    
     $scope.ManejarBodega=function()
    {
         var formData = new FormData();
         formData.append("empresa", localStorage.getItem("empresa"));
         
          var f_i =$('#reservation').val().split(" - ")[0].split("/");
          var f_f =$('#reservation').val().split(" - ")[1].split("/");
         
         formData.append("f_i",f_i[2]+"/"+f_i[0]+"/"+f_i[1] );
         formData.append("f_f",f_f[2]+"/"+f_f[0]+"/"+f_f[1]);
         formData.append("cod_cliente",$scope.cliente);
         formData.append("cod_vendedor",$scope.vendedor);
         formData.append("cod_caja",$scope.caja);
         formData.append("lat",0.0);
         formData.append("lon",0.0);
         
         if(localStorage.getItem("P_V")=="V")
         formData.append("estado_factura",localStorage.getItem("EstadoFactura"));
         
         var data=[];
         var _url;

        if($scope.cliente=="")
            {
                Herramientas.Notificar("Debe seleccionar un cliente");
                return;
            }

        if($scope.editando)
        {
            if($scope.codigo=="")
            {
                Herramientas.Notificar("Debe seleccionar un codigo");
                return;
            }
            
            formData.append("cod_proforma", $scope.codigo);
             _url=localStorage.getItem("P_V")=="P"?"controlador/ModificarProformaController.php":"controlador/ModificarVentaController.php";
            
            $scope.ptos.forEach(function(s){
                
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.secuencia=s.secuencia;
                    d.codproducto= s.producto;;
                    d.descuento= s.descuento;
                    data.push(d);
            });
            
            formData.append("data", JSON.stringify(data));   
        }
        else
        {
             _url=localStorage.getItem("P_V")=="P"?"controlador/CrearProformaController.php":"controlador/CrearVentaController.php"; 
           
             $scope.ptos.forEach(function(s){
                
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.codproducto= s.producto;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.descripcion1= s.descripcion1;
                    d.descuento= s.descuento;
                    data.push(d);
   
            });
            
             formData.append("data", JSON.stringify(data));    
        }
        
        $('#bloqueForm').css('visibility','visible');
        $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Guardado');    
                 else
                    if(confirm('Error al intentar Guardar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    }   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
            });
        
        $scope.Limpiar();
    };
    
      $scope.Establecer=function(t)
    {
        
     $scope.codigo_editado=t.codigo;
     $scope.descripcion=t.descripcion1;
     $scope.cantidad=0;
     $scope.descuento=0.0;
     $scope.existencia_producto=t.existencia;
     $scope.iva_producto=t.iva=='S'?true:false;
     
     
     switch(parseInt(localStorage.getItem("Precio")))
     {
         case 1:  $scope.valor=localStorage.getItem("Precio")*t.pvp1; break;
         case 2:  $scope.valor=localStorage.getItem("Precio")*t.pvp2; break;
         case 3:  $scope.valor=localStorage.getItem("Precio")*t.pvp3; break;
         default:$scope.valor=localStorage.getItem("Precio")*t.pvp4; break;
     }
     
     $scope.seleccionado=false;
     $scope.ubicaciones.forEach(function(a)
     {
            if(a.codigo==t.ubicacion)
            {
             $scope.ubicacion_seleccionada=a.codigo;
             $scope.ubicacion=$scope.ubicacion_seleccionada;
            }
     });

     $scope.p=t;
     $('#myModalBusqueda').modal('hide');
     $('#edicion').addClass('direct-chat-contacts-open');
    };
    
    $scope.Cliente_Cambio=function()
    {
        $('#bloqueForm').css('visibility','visible');
       $http.get('controlador/ClientePorCedulaCodigoController.php?empresa='+localStorage.getItem("empresa")+"&cedula="+$scope.cliente).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                 $scope.cedula=res.data[0].cedula_ruc;
                 $scope.nombre=res.data[0].nombre;
                 $scope.deuda=res.data[0].deuda;
             }
             else
             {
               
               Herramientas.Notificar('No hay resultados'); 
             }
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
            $('#bloqueForm').css('visibility','hidden');    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        $('#bloqueForm').css('visibility','hidden');
           
        });
    };
    
    $scope.cliente=localStorage.getItem("Cliente");
    $scope.Cliente_Cambio();
    
   
    $scope.Cambio_Precio=function()
    {
        if(!$scope.seleccionado&&$scope.p==null)
            return;
        
       
             
        if($scope.editando)
        {
             if ($scope.pp.iva=="S")
                 $scope.iva_producto=true; 
                else 
                 $scope.iva_producto=false;
            
              switch (parseInt($scope.precio)) 
              {
                case 1:
                    $scope.valor=$scope.pp.pvp1;
                    break;
                case 2:
                    $scope.valor=$scope.pp.pvp2;
                    break;
                case 3:
                    $scope.valor=$scope.pp.pvp3;
                    break;
                default:
                    $scope.valor=$scope.pp.pvp4;
                    break;
              }  
        }
        else
        {
             if ($scope.p.iva=="S")
                 $scope.iva_producto=true; 
                else 
                 $scope.iva_producto=false;
            
            switch (parseInt($scope.precio)) 
              {
                case 1:
                    $scope.valor=$scope.p.pvp1;
                    break;
                case 2:
                    $scope.valor=$scope.p.pvp2;
                    break;
                case 3:
                    $scope.valor=$scope.p.pvp3;
                    break;
                default:
                    $scope.valor=$scope.p.pvp4;
                    break;
              }  
        }
     
    };
    
    $scope.Cambio_Iva=function()
    {
      if($scope.valor!="")
      {
        if($scope.iva_producto)
        {
          var g= $scope.valor*( 1+ ($scope.impuesto_producto_editado /100));
          $scope.valor=g;
          $scope.total= $scope.cantidad * g;
        }
        else
        {
          var g= $scope.valor/( 1+ ($scope.impuesto_producto_editado /100));
          $scope.valor=g;
          $scope.total= $scope.cantidad * g;
        }
      }  
    };
    
   
    
  } 
  ])
  .controller('ControladorInforme_ventas_general',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
    
    
    $scope.productos=[];
    $scope.peticionando=false;
    
    $scope.Buscar=function()
    {
       var f_i =$('#reservation').val().split(" - ")[0].split("/");
       var f_f =$('#reservation').val().split(" - ")[1].split("/");
    
       f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
       f_f=f_f[2]+"/"+f_f[0]+"/"+f_f[1];
       
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/VentaController.php?empresa='+localStorage.getItem("empresa")+"&inicio="+f_i+"&fin="+f_f).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               res.data.forEach(function(a){
                   a.sub_iva=parseFloat(a.sub_iva);
                   a.sub_siva=parseFloat(a.sub_siva);
                   a.descuento_iva=parseFloat(a.descuento_iva);
                   a.descuento_siva=parseFloat(a.descuento_siva);
               });  
               $scope.productos=res.data;
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };

  } 
  ])
 .controller('ControladorInforme_Kardex_Cliente',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
    
    $scope.tipos=[{codigo:"p",nombre:"Preeliminar"},{codigo:"f",nombre:"Final"}];
    $scope.tipo_seleccionado="p";
    $scope.tipo=$scope.tipo_seleccionado;
    
    $scope.productos=[];
    $scope.peticionando=false;
    
    $scope.nombre_cliente="Cliente";
    
    $scope.ProcesarFinal=function()
    {
       var f_i =$('#reservation').val().split(" - ")[0].split("/");
       var f_f =$('#reservation').val().split(" - ")[1].split("/");
    
       f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
       f_f=f_f[2]+"/"+f_f[0]+"/"+f_f[1];
       
       $scope.ptos=[];
       
       $http.get('controlador/KardexController.php?empresa='+localStorage.getItem("empresa")+"&fechae="+f_i+"&fechav="+f_f+"&cod_cliente="+$scope.cliente.trim()+"&tipo="+$scope.tipo).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               res.data.forEach(function(a)
               {
                   a.valor=parseFloat(a.valor);
                   a.saldo=parseFloat(a.saldo);
               });  
               $scope.ptos=res.data;
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
       
        });
     };

     $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ClienteController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
    
     
    $scope.Establecer=function(t)
    {
     $scope.cliente=t.codigo;
     $scope.nombre_cliente=t.nombre;
    $('#myModalBusqueda').modal('hide');
   };
   
    $scope.Procesar=function()
    {
      
        $('#bloqueForm').css('visibility','visible');
       $http.get('controlador/ClientePorCedulaCodigoController.php?empresa='+localStorage.getItem("empresa")+"&cedula="+$scope.cliente).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                $scope.nombre_cliente=res.data[0].nombre; 
                $scope.ProcesarFinal();
             }
             else
             {
               Herramientas.Notificar('No hay resultados'); 
               $('#bloqueForm').css('visibility','hidden');
             }
           }
           else
           {
            Herramientas.Notificar('Error al buscar');    
            $('#bloqueForm').css('visibility','hidden');
           }   
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
           $('#bloqueForm').css('visibility','hidden');
        
        }); 
          
    };
    
  } 
  ])
  .controller('ControladorInforme_ingreso_caja_diaria',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
    
    $scope.tipos=[{codigo:"p",nombre:"Preeliminar"},{codigo:"f",nombre:"Final"}];
    $scope.tipo_seleccionado="p";
    $scope.tipo=$scope.tipo_seleccionado;
    
    $scope.productos=[];
    $scope.peticionando=false;
    
    $scope.nombre_cliente="Cliente";
    
    
     $scope.Vendedores=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/VendedorController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0) 
             {
               $scope.vendedores=res.data;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
      $scope.Vendedores();
      
      $scope.Cajas=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/CajaController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0) 
             {
               $scope.cajas=res.data;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
      $scope.Cajas();
    
    $scope.ProcesarFinal=function()
    {
       var  codigos_vendedores="";
        
      $scope.vendedor.forEach(function(a)
      {
                var codigo="";
                switch (a.length)
                {
                    case 1: codigo="0000000"+a; break;
                    case 2: codigo="000000"+a; break;
                    case 3: codigo="00000"+a; break;
                    case 4: codigo="0000"+a; break;
                    case 5: codigo="000"+a; break;
                    case 6: codigo="00"+a; break;
                    case 7: codigo="0"+a; break;
                    default: break;
                }
                codigos_vendedores+=codigo;    
      });  
        
      var  codigos_cajas="";
        
      $scope.caja.forEach(function(a)
      {
                var codigo="";
                switch (a.length)
                {
                    case 1: codigo="0000000"+a; break;
                    case 2: codigo="000000"+a; break;
                    case 3: codigo="00000"+a; break;
                    case 4: codigo="0000"+a; break;
                    case 5: codigo="000"+a; break;
                    case 6: codigo="00"+a; break;
                    case 7: codigo="0"+a; break;
                    default: break;
                }
                codigos_cajas+=codigo;    
      });    
        
       var f_i =$('#reservation').val().split(" - ")[0].split("/");
       var f_f =$('#reservation').val().split(" - ")[1].split("/");
    
       f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
       f_f=f_f[2]+"/"+f_f[0]+"/"+f_f[1];
       
       $scope.ptos=[];
       
       $http.get('controlador/IngresoCajaController.php?empresa='+localStorage.getItem("empresa")+"&desde="+f_i+"&hasta="+f_f+"&caja="+codigos_cajas+"&vendedor="+codigos_vendedores).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               res.data.forEach(function(a)
               {
                   a.valor=parseFloat(a.valor);
                   a.descuento=parseFloat(a.descuento);
                   a.r_f=parseFloat(a.r_f);
                   a.r_iva=parseFloat(a.r_iva);
               });  
               $scope.ptos=res.data;
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
       
        });
     };

    
    
  } 
  ])
  .controller('ControladorInforme_ventas_vendedor',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
    
  
    
    $scope.ptos=[];
    $scope.peticionando=false;
    
 
    $scope.ProcesarFinal=function()
    {
      
        
       var f_i =$('#reservation').val().split(" - ")[0].split("/");
       var f_f =$('#reservation').val().split(" - ")[1].split("/");
    
       f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
       f_f=f_f[2]+"/"+f_f[0]+"/"+f_f[1];
       
       $scope.ptos=[];
       
       $http.get('controlador/VentasProveedorController.php?empresa='+localStorage.getItem("empresa")+"&desde="+f_i+"&hasta="+f_f).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               res.data.forEach(function(a)
               {
                   a.num_pedidos=parseFloat(a.num_pedidos);
                   a.total=parseFloat(a.total);
                   a.porcentaje=parseFloat(a.porcentaje);

               });  
               $scope.ptos=res.data;
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
       
        });
     };

    
    
  } 
  ])
  .controller('ControladorInforme_pedidos_vendedor',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
    
  
    
    $scope.ptos=[];
    $scope.peticionando=false;
    
 
    $scope.ProcesarFinal=function()
    {
      
        
       var f_i =$('#reservation').val().split(" - ")[0].split("/");
       var f_f =$('#reservation').val().split(" - ")[1].split("/");
    
       f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
       f_f=f_f[2]+"/"+f_f[0]+"/"+f_f[1];
       
       $scope.ptos=[];
       
       $http.get('controlador/PedidosProveedorController.php?empresa='+localStorage.getItem("empresa")+"&desde="+f_i+"&hasta="+f_f).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               res.data.forEach(function(a)
               {
                   a.num_pedidos=parseFloat(a.num_pedidos);
                   a.total=parseFloat(a.total);
                   a.porcentaje=parseFloat(a.porcentaje);

               });  
               $scope.ptos=res.data;
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
       
        });
     };

    
    
  } 
  ])
  .controller('ControladorInforme_Ventas_Cliente',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
 
    
    $scope.tipos=[{codigo:"vnp",nombre:"Todos"},{codigo:"v",nombre:"Facura de Venta"},{codigo:"n",nombre:"Nota de Venta"},{codigo:"p",nombre:"Punto de Venta"}];
    $scope.tipo_seleccionado="vnp";
    $scope.tipo=$scope.tipo_seleccionado;
    
    $scope.productos=[];
    $scope.peticionando=false;
    
  
    $scope.ocultar_cliente=true;
    
    $scope.cliente="";
    
     $scope.BuscarCliente=function()
    {
       $scope.clientes=[];
       $scope.peticionando=true;
       $http.get('controlador/ClienteController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.clientes=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
     $scope.EstablecerCliente=function(t)
     {
         $scope.cliente=t.codigo;
         
         $('#myModalBusquedaCliente').modal('hide');
     };
  
    
    
     $scope.Vendedores=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/VendedorController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0) 
             {
               $scope.vendedores=res.data;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
      $scope.Vendedores();
    
    $scope.ProcesarFinal=function()
    {
       var  codigos_vendedores="";
        
      $scope.vendedor.forEach(function(a)
      {
                var codigo="";
                switch (a.length)
                {
                    case 1: codigo="0000000"+a; break;
                    case 2: codigo="000000"+a; break;
                    case 3: codigo="00000"+a; break;
                    case 4: codigo="0000"+a; break;
                    case 5: codigo="000"+a; break;
                    case 6: codigo="00"+a; break;
                    case 7: codigo="0"+a; break;
                    default: break;
                }
                codigos_vendedores+=codigo;    
      });  
        
    
        
       var f_i =$('#reservation').val().split(" - ")[0].split("/");
       var f_f =$('#reservation').val().split(" - ")[1].split("/");
    
       f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
       f_f=f_f[2]+"/"+f_f[0]+"/"+f_f[1];
       
       $scope.ptos=[];
       
       $http.get('controlador/VentaClienteController.php?empresa='+localStorage.getItem("empresa")+"&inicio="+f_i+"&fin="+f_f+"&cliente="+$scope.cliente+"&codigos_vendedores="+codigos_vendedores+"&tipo="+$scope.tipo).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               res.data.forEach(function(a)
               {
                   a.sub_iva=parseFloat(a.sub_iva);
                   a.sub_siva=parseFloat(a.sub_siva);
                   a.descuento_iva=parseFloat(a.descuento_iva);
                   a.descuento_siva=parseFloat(a.descuento_siva);
               });  
               $scope.ptos=res.data;
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
       
        });
     };

    
    
  } 
  ])
  .controller('ControladorInforme_Existencia',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){

    $scope.peticionando=false;
    
      $scope.Ubicaciones=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/UbicacionController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.ubicaciones=res.data;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
     $scope.Ubicaciones();


    $scope.ProcesarFinal=function()
    {
       $scope.peticionando=true;
       var  codigos_ubicaciones="";
        
      $scope.ubicaciones.forEach(function(a)
      {
                var codigo="";
                switch (a.codigo.length)
                {
                    case 1: codigo="00"+a.codigo; break;
                    case 2: codigo="0"+a.codigo; break;
                    default: break;
                }
                codigos_ubicaciones+=codigo;    
      });  
        

       $scope.ptos=[];
       
       $http.get('controlador/ExistenciaController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+codigos_ubicaciones).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               res.data.forEach(function(a)
               {
                   a.existencia=parseFloat(a.existencia);
               });  
               $scope.ptos=res.data;
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
            $scope.peticionando=false; 
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
            $scope.peticionando=false;
        });
     };

    
    
  } 
  ])
  .controller('ControladorInforme_Precios',['$scope','$http','Herramientas','$q',function($scope,$http,Herramientas,$q){
                     
     $scope.peticionando=false;
     
     $scope.ubicaciones=[];      $scope.ubicacion_seleccionada;
 
      $scope.grupos=[{nombre:"Linea",codigo:"L"},{nombre:"Codigo de Barra",codigo:"B"},{nombre:"Grupo",codigo:"B"},{nombre:"Referencia",codigo:"B"},{nombre:"Codigo",codigo:"C"},{nombre:"Descripcion",codigo:"D"}];
    $scope.criterio_seleccionado='D';
    $scope.criterio=$scope.criterio_seleccionado;
     
     $scope.productos=[];
     $scope.nombre_busqueda="";
    
     $scope.Ubicaciones=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/UbicacionController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.ubicaciones=res.data;
               $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
               $scope.ubicacion=$scope.ubicacion_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     $scope.Ubicaciones();

    $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda+"&criterio="+$scope.criterio+"&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
             $scope.peticionando=false;
        });
     };
    
  } 
  ])
  .controller('ControladorInforme_Proveedores',['$scope','$http','Herramientas','$q',function($scope,$http,Herramientas,$q){
                     
     $scope.peticionando=false;
     
     
     
     $scope.productos=[];
     $scope.nombre_busqueda="";
    
     

     $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ProveedorController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
    
  } 
  ])
  .controller('ControladorInventario',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
                     
     $scope.peticionando=false;
     
     $scope.documentos=[];
     
     $scope.productos=[];
     $scope.productos_temp=[];
     $scope.nombre_busqueda="";
    
    
    function Inicializar()
    {
        if(localStorage.getItem("Inventario")!=null&&localStorage.getItem("Inventario")!="")
        {
        var d=localStorage.getItem("Inventario").split("<->");
        $scope.doc= d[0];
        $scope.fecha=d[1];
        $scope.ubicacion=d[2];
        }
    }
    
    Inicializar();
     
    $scope.CargarConfiguracion=function()
    {
       $('#myModalConfig').modal('show');
        
        
       $scope.peticionando=true;
       $http.get('controlador/ConfiguracionDocumentoController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
              $scope.documentos=res.data;
              $scope.documento_seleccionado=localStorage.getItem("Inventario").split("<->")[0];
              $scope.documento=$scope.documento_seleccionado;
              $scope.fecha_config=localStorage.getItem("Inventario").split("<->")[1];
               $scope.ubicacion_config=localStorage.getItem("Inventario").split("<->")[2];
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
    };
    
    $scope.CambioIva=function()
    {
       if(!$scope.iva)
       {
         $scope.productos_temp=$scope.productos;
         $scope.productos=[];
         
         $scope.productos_temp.forEach(function(a)
         {
              if(a.cantidad>0)
                  $scope.productos.push(a);
         });

       }
       else
       {
           $scope.productos=$scope.productos_temp;
       }
    };
    
     $scope.CargarDocumento=function()
     {
       $('#myModalBusqueda').modal('show');
       $scope.iva=true;
       $scope.secuencia=null;
       $scope.productos=[]; 
       $scope.peticionando=true;
       $http.get('controlador/InventarioFisicoController.php?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.doc).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
              $scope.productos=res.data;
              $scope.productos.forEach(function(a){
              a.cantidad=parseFloat(a.cantidad);
              a.existencia=parseFloat(a.existencia);
              a.valor=parseFloat(a.valor);
              });
             
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
    };
    
     $scope.Establecer=function(secuencia)
     {
         $scope.secuencia=secuencia;
     };
    
    $scope.SolicitudEliminar=function()
    {
        $('#myModalEliminar').modal('show');
    };
    
     $scope.EliminarProducto=function(t)
     {
           $scope.peticionando=true;
           
            var formData = new FormData();
         
            formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("secuencia", $scope.secuencia);
            formData.append("documento", $scope.doc);
       
            $.ajax({
             type: "POST",
             url: "controlador/EliminarDocumentoController.php",
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                  {                             
                     Herramientas.Notificar('Eliminado');    
                  }
                 else
                   if (confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 
                 $scope.peticionando=false;
                
             }
             });
          
             var index = -1;
             $scope.productos.forEach(function (entry) 
             {
                index++;
                if (entry.secuencia == $scope.secuencia)
                  $scope.productos.splice(index, 1);
             });
             $scope.secuencia=null;
    };   
    
     $scope.EstablecerEditar=function(t)
     {
            $scope.secuencia=t.secuencia;
            $scope.codigo=t.codigo;
            $scope.barra=t.barra=="null"?"":t.barra;
            $scope.descripcion=t.descripcion;
            $scope.existencia=t.existencia=="null"?"0":t.existencia;
            $scope.linea=t.linea;
            $scope.marca=t.marca;
            $scope.grupo=t.grupo;
            $scope.fisico=t.cantidad;
            $('#myModalBusqueda').modal('hide');
     };
     
    $scope.Actualizar=function()
    {
        
       if($scope.secuencia!=null&&$scope.secuencia!="")
       {
            var consulta="&documento="+$scope.doc+"&secuencia="+$scope.secuencia+"&cantidad="+$scope.fisico; 
       $scope.peticionando=true;
       $http.get('controlador/ActualizarDocumentoController.php?empresa='+localStorage.getItem("empresa")+consulta).success(function (res)
       {
           if(res==='')
           {
             Herramientas.Notificar('Guardado'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
           $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
        
        $scope.Limpiar();
       }
      
    };
     
    $scope.Limpiar=function()
    {
            $scope.secuencia="";
            $scope.codigo="";
            $scope.barra="";
            $scope.descripcion="";
            $scope.existencia="";
            $scope.linea="";
            $scope.marca="";
            $scope.grupo="";
            $scope.fisico=""; 
    };
    
     $scope.CambioCodigo=function()
     {
       if($scope.codigo.length>0)
       {
         
       $scope.peticionando=true;
       $http.get('controlador/DocumentoController.php?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.doc+"&codigo="+$scope.codigo+"&forma=c").success(function (res)
       {
           $scope.Limpiar();
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                  $scope.secuencia=res.data[0].secuencia;
                  $scope.codigo=res.data[0].codigo;
                  $scope.barra=res.data[0].barra;
                  $scope.descripcion=res.data[0].descripcion;
                  $scope.existencia=res.data[0].existencia;
                  $scope.linea=res.data[0].linea;
                  $scope.marca=res.data[0].marca;
                  $scope.grupo=res.data[0].grupo;
                  $scope.fisico=res.data[0].cantidad; 
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
             $scope.Limpiar();
             $scope.peticionando=false;
        });
        
        
        
      }
    };
    
    $scope.CambioDocumento=function()
    {
       $scope.documentos.forEach(function(a)
       {
           if(a.documento==$scope.documento)
           {
              $scope.fecha_config=a.fecha;
              $scope.ubicacion_config=a.ubicacion;
              localStorage.setItem("Inventario",a.documento+"<->"+a.fecha+"<->"+a.ubicacion+"<->"+a.codigo_ubicacion);   
              Inicializar();
           }
       });
    };
    
  } 
  ])
  .controller('ControladorCobranza',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
                     
    $scope.peticionando=false; $scope.descuento="";
    
    var saldo_acumulado=0.0;        posiciones=[];
    var total_retencion_fuente=0.0; posicionesrt=[]; 
    var total_retencion_iva=0.0;    posicionesri=[];
    
    $scope.numero=""; $scope.cuenta="";
    
    $scope.Bancos=function()
    {
       $scope.peticionando=true;
       $http.get('controlador/BancoController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
              $scope.bancos=res.data;
              $scope.banco_seleccionado=res.data[0].codigo;
              $scope.banco=$scope.banco_seleccionado;
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
           $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
    };
    $scope.Bancos();
    
     $scope.Formas=function()
    {
       $scope.peticionando=true;
       $http.get('controlador/FormaPagoController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
              $scope.formas=res.data;
              $scope.forma_seleccionada=res.data[0].codigo;
              $scope.forma=$scope.forma_seleccionada;
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
           $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
    };
    $scope.Formas();
    
    $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ClienteController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
    
    $scope.Establecer=function(t)
    {
        $scope.nombre=t.nombre;
        $scope.codigo=t.codigo;
        $('#myModalBusqueda').modal('hide');
        $scope.Pagos();
    };
    
    $scope.Pagos=function()
    {
      if($scope.codigo.length>0)
      {
       $scope.facs=[];
       $scope.peticionando=true;
       $http.get('controlador/FacturasCobrarController.php?empresa='+localStorage.getItem("empresa")+"&cliente="+$scope.codigo).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)
             {
              $scope.facs=res.data;
              $scope.UltimoRecibo();
              $scope.NombreCliente();
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
           Herramientas.Notificar('Error al buscar');   
            
           $scope.peticionando=false;    
       }).
       error(function (data, status, headers, config)
       {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
          $scope.peticionando=false;
        });
        
      }
 
     };
    
     $scope.UltimaCancelacion=function()
    {
       $scope.peticionando=true;
       $http.get('controlador/UltimaCancelacionController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(res === parseInt(res, 10))
           {
              
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.UltimoRecibo=function()
    {
       $scope.peticionando=true;
       $http.get('controlador/UltimoReciboController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(res.indexOf('error') <=0 )
           {
             $scope.num_recibo=res; 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.NombreCliente=function()
    {
       
       $scope.peticionando=true;
       $http.get('controlador/ClientePorCodigoController.php?empresa='+localStorage.getItem("empresa")+"&codigo="+$scope.codigo).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                 $scope.nombre=res.data[0].nombre;
                 $scope.entidad=res.data[0].nombre;
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
    
    $scope.Total=function()
    {
       var d=0.0;
        if($scope.facs!=null)
        $scope.facs.forEach(function(f)
        {
            if(f.total!="")
            d+=f.total;
        });
        
        return d.toFixed(2);  
    };
    
    $scope.Devolucion=function()
    {
        var d=0.0;
        if($scope.facs!=null)
        $scope.facs.forEach(function(f)
        {
            if(f.devolucion!="")
            d+=f.devolucion;
        });
           
        return parseFloat(d).toFixed(2);
    };
    
     $scope.Abono=function()
    {
       var d=0.0;
        if($scope.facs!=null)
        $scope.facs.forEach(function(f)
        {
            if(f.abono!="")
            d+=f.abono;
        });
        
        return parseFloat(d).toFixed(2);  
    };
    
     $scope.Saldo=function()
    {
       var d=0.0;
        if($scope.facs!=null)
        $scope.facs.forEach(function(f)
        {
            if(f.saldo!="")
            d+=f.saldo;
        });
        
        return d.toFixed(2);  
    };
    
    $scope.Pagar=function(t)
    {
       if($('[data-p-id="'+t.$index+'"]').is(":checked"))
       {
           saldo_acumulado+=t.t.saldo;
           posiciones.push(t.$index);
           
       }
       else
       {
          saldo_acumulado-=t.t.saldo;
          var index = -1;
          
          posiciones.forEach(function(p)
          {
              index++;
             if(p==t.$index)
                posiciones.splice(index, 1); 
             
          });
          
       }
       
       $scope.valor=saldo_acumulado.toFixed(2);
    };
    
    $scope.RF=function(t)
    {
      var p_retencion_fuente=parseFloat(localStorage.getItem("PorcentajeRetencionFuente"));
      var sub_ret_fuente=t.t.total-t.t.piva;
      var total_retencion_fuente_temp=sub_ret_fuente*(p_retencion_fuente/100);
        
        
       if($('[data-rf-id="'+t.$index+'"]').is(":checked"))
       {
        total_retencion_fuente+=total_retencion_fuente_temp;
        posicionesrt.push(t.$index);
       }
       else
       {
       total_retencion_fuente-=total_retencion_fuente_temp;
       var index = -1;
          
          posicionesrt.forEach(function(p)
          {
              index++;
             if(p==t.$index)
                posicionesrt.splice(index, 1); 
             
          });
       }
       $scope.ret_fuente=total_retencion_fuente;
       
       $scope.ret_fuente=$scope.ret_fuente.toFixed(4);
    };
   
    $scope.RI=function(t)
    {
      var p_retencion_iva=localStorage.getItem("PorcentajeRetencionIva");
      var total_retencion_iva_temp=t.t.piva*(p_retencion_iva/100);
        
        
       if($('[data-ri-id="'+t.$index+'"]').is(":checked"))
       {
        total_retencion_iva+=total_retencion_iva_temp;
        posicionesri.push(t.$index);
       }
       else
       {
        total_retencion_iva-=total_retencion_iva_temp;
       var index = -1;
          
          posicionesri.forEach(function(p)
          {
              index++;
             if(p==t.$index)
                posicionesri.splice(index, 1); 
             
          });
       }
       $scope.ret_iva=total_retencion_iva;
       $scope.ret_iva=$scope.ret_iva.toFixed(4);
      
    };     
    
    $scope.Cancelar=function()
    {
       if($scope.valor==""||$scope.valor<=0)
            return;

       var valores=[];
         
       var Desc=false;
       saldo_acumulado=$scope.valor;
        
       if(saldo_acumulado>0.00&& saldo_acumulado>=total_retencion_fuente+total_retencion_iva)
       {
           posiciones.forEach(function(p)
           {
                  var valor_ret_f=0.0;
                  var valor_ret_i=0.0;
                  var valor_saldo=0.0;
                  var descuento=0.00;
                  var p_retencion_fuente=localStorage.getItem("PorcentajeRetencionFuente");
                  var p_retencion_iva=localStorage.getItem("PorcentajeRetencionIva");
                  var sub_ret_fuente=$scope.facs[p].total-$scope.facs[p].piva;
                  valor_ret_f=sub_ret_fuente*(p_retencion_fuente/100);
                  valor_ret_i=$scope.facs[p].piva*(p_retencion_iva/100);
                  

                  if (saldo_acumulado>=valor_ret_f+valor_ret_i)
                  {
                      
                      if(posicionesrt.indexOf(p) < 0)  //ademas esta marcado el ri
                      {
                          valor_ret_f=0.00;
                      }


                      if(posicionesri.indexOf(p) < 0)  //ademas esta marcado el rt
                      {
                          valor_ret_i=0.00;
                      }

                  }
                  else
                  {
                      valor_ret_f=0.00;
                      valor_ret_i=0.00;
                  }
                  
                   valor_saldo= $scope.facs[p].saldo- (valor_ret_i + valor_ret_f);
                   
                 if (!Desc)
                  {
                      if($scope.descuento!="")
                      descuento=$scope.descuento;
                  }
                  else
                  {
                      descuento=0.00;
                  }
                  if(saldo_acumulado>$scope.facs[p].saldo)
                  {
                      var f=valor_saldo+valor_ret_f+valor_ret_i;
                      valores.push({p_valor:f,p_ret:valor_ret_f,p_ret_iva:valor_ret_i,p_desc:descuento,codigo_factura:$scope.facs[p].documento});
                      saldo_acumulado=saldo_acumulado-(valor_saldo + valor_ret_f + valor_ret_i);
                  }
                  else
                  {
                      var f=(saldo_acumulado- (valor_ret_f + valor_ret_i))+valor_ret_f+valor_ret_i;
                      valores.push({p_valor:f,p_ret:valor_ret_f,p_ret_iva:valor_ret_i,p_desc:descuento,codigo_factura:$scope.facs[p].documento});
                      saldo_acumulado=0.00;
                  }

                  Desc=true;
                  
           });
           
             var empresa=localStorage.getItem("empresa");
             var tipo="FC";
             var numero=$scope.numero;
             var cuenta=$scope.cuenta;
             var entidad=$scope.entidad;
             var codigo_pago=$scope.forma;
             var codigo_banco=$scope.banco;

             var f_i =$('#reservation').val().split(" - ")[0].split("/");
             var f_f =$('#reservation').val().split(" - ")[1].split("/");
         
             var i_f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
             var i_f_f =f_f[2]+"/"+f_f[0]+"/"+f_f[1];

             var descuento=$scope.descuento;
             
             var arreglo=[];
             valores.forEach(function(v)
             {
               arreglo.push({"valor":v.p_valor,"retencion_f": v.p_ret,"retencion_i": v.p_ret_iva,"descuento": v.p_desc,"cod_factura": v.codigo_factura});       
             });
        //--------------------------------------------------------------------------------------------------------------------------------------------     
            
          $scope.peticionando=true;
           
            var formData = new FormData();
         
            formData.append("empresa", empresa);
            formData.append("tipo", tipo);
            formData.append("numero", numero);
            formData.append("cuenta", cuenta);
            formData.append("entidad", entidad);
            formData.append("cod_pago", codigo_pago);
            formData.append("cod_banco", codigo_banco);
            formData.append("emision", i_f_i);
            formData.append("vencimiento", i_f_f);
            formData.append("descuento", descuento);
            formData.append("data", JSON.stringify(arreglo));
       
            $.ajax({
             type: "POST",
             url: "controlador/CrearCancelacionController.php",
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                  {                             
                     Herramientas.Notificar('Guardado');    
                  }
                 else
                   if (confirm('Error al intentar guardar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 
                 $scope.peticionando=false;
                
             }
             });
            
            $scope.Limpiar();
       } 
        
     
    };   
    
    $scope.Limpiar=function()
    {
        $scope.numero="";
        $scope.cuenta="";
        $scope.descuento="";
        $scope.valor="";
        $scope.ret_fuente="";
        $scope.ret_iva="";
        $scope.num_recibo="";
        $scope.entidad="";
        $scope.codigo="";
        $scope.nombre="";
        
        var saldo_acumulado=0.0;        posiciones=[];
        var total_retencion_fuente=0.0; posicionesrt=[]; 
        var total_retencion_iva=0.0;    posicionesri=[];
        
        $scope.facs=[];
    };
  
  } 
  ])
  .controller('ControladorCuentasxCobrar',['$scope','$http','Herramientas','$q',function($scope,$http,Herramientas,$q){
                     
     $scope.peticionando=false;
     
     $scope.productos=[];
     $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/CXCController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
     $scope.Buscar();
    
  } 
  ])
  .controller('ControladorProformaVentaTabular',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
     
    $scope.decimales=localStorage.getItem("Decimales").split(".")[1].length; 
    $scope.impuesto_producto_editado=localStorage.getItem("IVA"); 
    $scope.existencia_producto=0.0;
    $scope.deuda=0.0;
   
    $scope.index=0;
    
    $scope.vendedores=[];         $scope.vendedor_seleccionado; 
    $scope.cajas=[];              $scope.caja_seleccionada; 
    
    $scope.grupos=[{nombre:"Linea",codigo:"L"},{nombre:"Codigo de Barra",codigo:"B"},{nombre:"Grupo",codigo:"B"},{nombre:"Referencia",codigo:"B"},{nombre:"Codigo",codigo:"C"},{nombre:"Descripcion",codigo:"D"}];
    $scope.criterio_seleccionado='D';
    $scope.criterio=$scope.criterio_seleccionado;
    $scope.codigo_editado="";
    $scope.ptos=[{producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),numprecio:parseInt(localStorage.getItem("Precio")),ubicacion:localStorage.getItem("Bodega"),valor:0.00,descuento:0.00,iva_producto:false}];
    
   
    
    $scope.p=null;
    $scope.pp=null;
  
   $scope.BuscarCliente=function()
    {
       $scope.clientes=[];
       $scope.peticionando=true;
       $http.get('controlador/ClienteController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.clientes=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
     $scope.EstablecerCliente=function(t)
     {
         $scope.cliente=t.codigo;
         $scope.cedula=t.cedula_ruc;
         $scope.nombre=t.nombre;
         $('#myModalBusquedaCliente').modal('hide');
     };
  
        
    $scope.Ubicaciones=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/UbicacionController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.ubicaciones=res.data;
               $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
               $scope.ubicacion=$scope.ubicacion_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.Ubicaciones();
  
     $scope.Vendedores=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/VendedorController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0) 
             {
               $scope.vendedores=res.data;
               $scope.vendedor_seleccionado=localStorage.getItem("Vendedor");
               $scope.vendedor=$scope.vendedor_seleccionado;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
      $scope.Vendedores();
      
      $scope.Cajas=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/CajaController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0) 
             {
               $scope.cajas=res.data;
               $scope.caja_seleccionada=localStorage.getItem("Caja");
               $scope.caja=$scope.caja_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
      $scope.Cajas();
      
    $scope.Ultimo=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
         var _url=localStorage.getItem("P_V")=="P"?"controlador/UltimaProformaController.php":"controlador/UltimaVentaController.php";
       
         $.ajax({
             type: "POST",
             url: _url ,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                 if(res === parseInt(res, 10)) 
                 {
                     if(localStorage.getItem("P_V")=="P")
                      $('#titulo').html("Proforma: "+res);    
                    else
                        $('#titulo').html("Venta: "+res);    
                }
                 else
                    Herramientas.Notificar('Error al obtener el ultimo codigo');   
                $('#bloqueForm').css('visibility','hidden');
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
       
    };
    
   $scope.Ultimo();

     $scope._Subtotal=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=a.cantidad*a.valor;
      });
      return suma.toFixed(2);
    };
    
    $scope._Descuento=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=(a.valor*a.cantidad )* a.descuento/100;
      });
      return suma.toFixed(2);  
    };
    
    $scope._Iva=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          if(a.impuesto!=null)
          suma+=( (a.cantidad *a.valor) - ((a.cantidad *a.valor)*(a.descuento/100) )  )  *(a.impuesto/100);
      });
      return suma.toFixed(2);  
    };
    
     $scope._Total=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=a.cantidad*a.valor;
      });
        
      var st=suma;
        
        suma=0;
       $scope.ptos.forEach(function(a){
           if(a.impuesto!=null)
          suma+=( (a.cantidad *a.valor) - ((a.cantidad *a.valor)*(a.descuento/100) )  )  *(a.impuesto/100);
      });
      
      var i=suma;
      
      suma=0;
         $scope.ptos.forEach(function(a){
          suma+=(a.valor*a.cantidad )* a.descuento/100;
      });
      
      var d=suma;
      return (st+i-d).toFixed(2);  
    };
   
//-------------------------------------------------------------------------------------------------------------------
    $scope.Eliminar=function()
    {
        if($scope.codigo=="")
        {
            Herramientas.Notificar("Debe seleccionar un codigo de producto");
            return;
        }
        
        $('#bloqueForm').css('visibility','visible');
        
           var formData = new FormData();
         
             formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("documento", $scope.codigo);
            var _url=localStorage.getItem("P_V")=="P"?"controlador/EliminarProformaController.php":"controlador/EliminarVentaController.php";
       
            $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Eliminado');    
                 else
                    if(confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
         $scope.Limpiar();
       
    };             
                  
    $scope.ProductoxCodigo=function(index)
    {
       
        //verificar que el id del prducto buscado no esta en el arreglo
       /* var i=-1; var esta=false;
        $scope.ptos.forEach(function(a)
        {     
            i++;
            if(a.producto==$scope.codigo_editado&&i!=index)
               esta=true;
        });
        if(esta)
            return;*/
       
        $scope.seleccionado=false;
        
       if($scope.codigo_editado!="")
      {
            $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.codigo_editado+"&criterio=C&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)
             {
                $scope.p=res.data[0];
                $scope.ptos[index].producto=res.data[0].codigo;
                $scope.ptos[index].descripcion1=res.data[0].descripcion1;
                $scope.ptos[index].cantidad=parseFloat(localStorage.getItem("Cantidad"));
                
                $scope.ptos[index].numprecio=parseInt(localStorage.getItem("Precio"));
                switch(parseInt(localStorage.getItem("Precio")))
                {
                    case 1: if(res.data[0].iva=='S')
                            {
                                $scope.ptos[index].valor=parseFloat(res.data[0].pvp1 /( 1+ ($scope.impuesto_producto_editado /100))).toFixed(4).toString()
                            }  
                            break;
                    case 2:if(res.data[0].iva=='S')
                            {
                                $scope.ptos[index].valor=parseFloat(res.data[0].pvp2 /( 1+ ($scope.impuesto_producto_editado /100))).toFixed(4).toString()
                            }  
                            break;
                    case 3: if(res.data[0].iva=='S')
                            {
                                $scope.ptos[index].valor=parseFloat(res.data[0].pvp3 /( 1+ ($scope.impuesto_producto_editado /100))).toFixed(4).toString()
                            }  
                            break;
                        default:
                               if(res.data[0].iva=='S')
                            {
                                $scope.ptos[index].valor=parseFloat(res.data[0].pvp4 /( 1+ ($scope.impuesto_producto_editado /100))).toFixed(4).toString()
                            }  
                            break;
                }
                
                $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
                $scope.ubicacion=$scope.ubicacion_seleccionada;
                
                $scope.ptos[index].iva_producto=res.data[0].iva=='S'?true:false;
                $scope.existencia_producto=res.data[0].existencia==null?0.0:res.data[0].existencia;
                
                //establecer el foco en la cantidad
                $('[data-c_id="'+index+'"]').focus();
                $('[data-c_id="'+index+'"]').select();
             }
             else
             {
                Herramientas.Notificar('No hay resultados'); 
             }
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        }); 
      }   
    };
   
      
    $scope.Limpiar_Edicion=function()
    {
        $scope.codigo_editado="";
        
        $scope.existencia_producto=0.0;
        
        $scope.ptos[$scope.ptos.length-1]={producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),numprecio:parseInt(localStorage.getItem("Precio")),ubicacion:localStorage.getItem("Bodega"),valor:0.00,descuento:0.00,iva_producto:false}
        
        $scope.ubicacion_seleccionada=localStorage.getItem("Bodega");
        $scope.ubicacion=$scope.ubicacion_seleccionada;
        
        $scope.seleccionado=false; 
    };
    
     $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda+"&criterio="+$scope.criterio+"&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
   
    
    $scope.Limpiar=function()
    {
     $scope.codigo="";
     $scope.codigo_editado="";
     
     $scope.cliente=localStorage.getItem("Cliente");
     $scope.Cliente_Cambio();
     
     $scope.vendedor_seleccionado=localStorage.getItem("Vendedor");
     $scope.vendedor=$scope.vendedor_seleccionado;
     
     $scope.caja_seleccionada=localStorage.getItem("Caja");
     $scope.caja=$scope.caja_seleccionada;
    
    var hoy=new Date();
    var despues=hoy.setDate(hoy.getDate() + parseInt(localStorage.getItem("Dias")));
    despues= new Date(despues).toLocaleString().split(",")[0]; 
         
    hoy=new Date().toLocaleString().split(",")[0];
         
    $('#reservation').data('daterangepicker').setStartDate(hoy);
    $('#reservation').data('daterangepicker').setEndDate(despues);
    
    
    
    $scope.ptos=[{producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),numprecio:parseInt(localStorage.getItem("Precio")),ubicacion:localStorage.getItem("Bodega"),valor:0.00,descuento:0.00,iva_producto:false}];
   
    $scope.editando=false;
    $scope.seleccionado=false;

    };

    
     $scope.Codigo_Cambio=function()
    {
        
       $('#bloqueForm').css('visibility','visible');  
       
       var _url=localStorage.getItem("P_V")=="P"?"controlador/DatosBaseProformaController.php":"controlador/DatosBaseVentaController.php";
       
       $http.get(_url+"?empresa="+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo=FC").success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                 $scope.cliente=res.data[0].pro_cli;
                 $scope.nombre=res.data[0].nombre;
                 $scope.cedula=res.data[0].cedula_ruc;
                 
                 $scope.caja_seleccionada=res.data[0].caja;
                 $scope.caja=$scope.caja_seleccionada;
               
                 $scope.vendedor_seleccionado=res.data[0].vendedor;
                 $scope.vendedor=$scope.vendedor_seleccionado;
                 
                var fecha= res.data[0].fecha.split("-");
                fecha=fecha[1]+"/"+fecha[2]+"/"+fecha[0];
                
                var fechaV= res.data[0].fechaV.split("-");
                fechaV=fechaV[1]+"/"+fechaV[2]+"/"+fechaV[0];
                
                $('#reservation').data('daterangepicker').setStartDate(fecha);
                $('#reservation').data('daterangepicker').setEndDate(fechaV);
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al obtener la cabecera');   
            
            $('#bloqueForm').css('visibility','hidden');   
       }).
       error(function (data, status, headers, config)
       {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
         $('#bloqueForm').css('visibility','hidden');
        });
        
        _url=localStorage.getItem("P_V")=="P"?"controlador/DatosProductosProformaController.php":"controlador/DatosProductosVentaController.php";
        
        $scope.ptos=[];               
        $http.get(_url+'?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo=FC").success(function (res)
        {
            if(Object.prototype.toString.call(res.data) === '[object Array]')
            {
                if(res.data.length>0)  
                {
                  res.data.forEach(function(a){
                      a.valor=parseFloat(a.valor).toFixed($scope.decimales);
                      a.valor1=parseFloat(a.valor1).toFixed($scope.decimales);
                      a.numprecio=parseInt(a.numprecio);
                      a.iva_producto=parseFloat(a.impuesto)>0.00?true:false;
                  });     
                    
                 $scope.ptos=res.data;
                 $scope.ptos.push({producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),numprecio:parseInt(localStorage.getItem("Precio")),ubicacion:localStorage.getItem("Bodega"),valor:0.00,descuento:0.00,iva_producto:false});
                 $scope.index=$scope.ptos.length-1;
                }
                else
                   Herramientas.Notificar('No hay productos'); 
            }
            else
              Herramientas.Notificar('Error al obtener el cuerpo');                  
        }).
        error(function (data, status, headers, config)
        {
            if(status===404)
               Herramientas.Notificar('Servidor no encontrado');
        });
        
      
       $scope.editando=true;
    };
    
    $scope.Editar=function(t,index)
    {
         $scope.index=index;
         $scope.codigo_editado=t.producto;
         $scope.existencia_producto=t.existencia==null?0.0:res.data[0].existencia;
         $scope.seleccionado=true; 
         $scope.pp=t;
       
    };
    
     $scope.ManejarProducto=function($index)
    {
        if($scope.ptos[$index].cantidad<=0)
        {
            Herramientas.Notificar("cantidad debe ser mayor que cero");
            return;
        }
        
        if($index<$scope.ptos.length-1) //si no es el ultimo es una modificacion
        {
              var i=-1;              
             $scope.ptos.forEach(function(d)
             {
                 i++;
                 if(i==$index)
                 {
                    d.cantidad=$scope.ptos[$index].cantidad;
                    d.bonificacion=0;
                   
                   
                    d.numprecio=$scope.ptos[$index].numprecio;
                   
                    d.valor=$scope.ptos[$index].valor;
                    d.valor1=$scope.ptos[$index].valor;
                    d.descuento=$scope.ptos[$index].descuento;
                    
                   /* if($scope.ptos[$index].iva_producto)
                    {
                     var temp_valor=$scope.ptos[$index].valor;
                     var temp_iva=localStorage.getItem("IVA");
                     d.valor=(temp_valor/(1+(temp_iva/100)))//.toFixed(4);
                    }*/
                    
                    
                    
                     if($scope.ptos[$index].iva_producto)
                    {
                        d.iva_v="S";
                        d.impuesto=localStorage.getItem("IVA");
                        
                    }
                    else
                    {
                        d.iva_v = "N";
                        d.impuesto="0";
                        
                    }

                                        
                    d.promedio=0;
                    d.costo=0;
                    d.ubicacion=$scope.ptos[$index].ubicacion;
            
                    d.serie="";
                    d.cajas=0;
                    d.unidades=0;
                    d.fraccion="";
                 }    
             });
                        
        }
        else
        {
            
            if( localStorage.getItem("Stock")=="0"&& $scope.cantidad> $scope.existencia_producto)
            {
             Herramientas.Notificar("Imposible procesar solicitud,solo tiene en existencia: "+$scope.existencia_producto);
             return;
            }
             var d={};
             d.producto=$scope.ptos[$index].producto;
             d.cantidad=$scope.ptos[$index].cantidad;
             d.bonificacion=0;
             d.descripcion1=$scope.ptos[$index].descripcion1;
             d.valor=$scope.ptos[$index].valor;
             d.valor1=$scope.ptos[$index].valor;
            
             d.descuento=$scope.ptos[$index].descuento;
                    
                   /* if($scope.ptos[$index].iva_producto)
                    {
                     var temp_valor=$scope.ptos[$index].valor;
                     var temp_iva=localStorage.getItem("IVA");
                     d.valor=(temp_valor/(1+(temp_iva/100))).toFixed(4);
                    }*/
                    
                     if($scope.ptos[$index].iva_producto)
                    {
                        d.iva_v="S";
                        d.impuesto=localStorage.getItem("IVA");
                        d.iva_producto=true;
                    }
                    else
                    {
                        d.iva_v = "N";
                        d.impuesto="0";
                        d.iva_producto=false;
                    }
             d.secuencia="";
             
             d.promedio=0;
             d.costo=0;
             d.ubicacion=$scope.ptos[$index].ubicacion;
             d.numprecio=$scope.ptos[$index].numprecio;
             
             d.serie="";
             d.cajas=0;
             d.unidades=0;
             d.fraccion="";
             d.iva=$scope.p.iva;
             
             d.pvp1=$scope.p.pvp1;
             d.pvp2=$scope.p.pvp2;
             d.pvp3=$scope.p.pvp3;
             d.pvp4=$scope.p.pvp4;
             
             $scope.ptos[$scope.ptos.length-1]=d;
             $scope.ptos.push({producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),numprecio:parseInt(localStorage.getItem("Precio")),ubicacion:localStorage.getItem("Bodega"),valor:0.00,descuento:0.00,iva_producto:false});
        }
        
        $scope.codigo_editado='';
        $scope.index=$scope.ptos.length-1;
        setTimeout(function(){ $('[data-c-cod="'+$scope.index+'"]').focus();}, 1);
    };
    
    $scope.EliminarProducto=function()
    {
            if($scope.pp.secuencia!="")
            {
            $('#bloqueForm').css('visibility','visible');
        
            var formData = new FormData();
         
            formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("secuencia", $scope.pp.secuencia);
         
            var _url=localStorage.getItem("P_V")=="P"?"controlador/EliminarProductoProformaController.php":"controlador/EliminarProductoVentaController.php";
       
            $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                  {                             
                     Herramientas.Notificar('Eliminado');    
                  }
                 else
                   if (confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 

                
                 $('#bloqueForm').css('visibility','hidden');
                
             }
             });
            }
            /* var index = -1;
             $scope.ptos.forEach(function (entry) 
             {
                index++;
                if (entry.producto == $scope.pp.producto)*/
                  $scope.ptos.splice($scope.index, 1);
          //   });    
             
             $scope.index=$scope.ptos.length-1;
             $scope.codigo_editado='';
             $scope.seleccionado=false;
    };     
    
    $scope.ManejarBodega=function()
    {
        
         var formData = new FormData();
         formData.append("empresa", localStorage.getItem("empresa"));
         
          var f_i =$('#reservation').val().split(" - ")[0].split("/");
          var f_f =$('#reservation').val().split(" - ")[1].split("/");
         
         formData.append("f_i",f_i[2]+"/"+f_i[0]+"/"+f_i[1] );
         formData.append("f_f",f_f[2]+"/"+f_f[0]+"/"+f_f[1]);
         formData.append("cod_cliente",$scope.cliente);
         formData.append("cod_vendedor",$scope.vendedor);
         formData.append("cod_caja",$scope.caja);
         formData.append("lat",0.0);
         formData.append("lon",0.0);
         
         if(localStorage.getItem("P_V")=="V")
         formData.append("estado_factura",localStorage.getItem("EstadoFactura"));
         
         var data=[];
         var _url;

        if($scope.cliente=="")
            {
                Herramientas.Notificar("Debe seleccionar un cliente");
                return;
            }

        if($scope.editando)
        {
            if($scope.codigo=="")
            {
                Herramientas.Notificar("Debe seleccionar un codigo");
                return;
            }
            
            formData.append("cod_proforma", $scope.codigo);
             _url=localStorage.getItem("P_V")=="P"?"controlador/ModificarProformaController.php":"controlador/ModificarVentaController.php";
            
            var i=-1;
            
            $scope.ptos.forEach(function(s)
            {
                    i++;
                   if(i!=$scope.ptos.length-1)
                   {  
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.secuencia=s.secuencia;
                    d.codproducto= s.producto;;
                    d.descuento= s.descuento;
                    data.push(d);
                   }
            });
            
            formData.append("data", JSON.stringify(data));   
        }
        else
        {
             _url=localStorage.getItem("P_V")=="P"?"controlador/CrearProformaController.php":"controlador/CrearVentaController.php"; 
           
            var i=-1;
             $scope.ptos.forEach(function(s)
             {
                  i++;
                   if(i!=$scope.ptos.length-1)
                   {  
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.codproducto= s.producto;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.descripcion1= s.descripcion1;
                    d.descuento= s.descuento;
                    data.push(d);
                   }
            });
            
             formData.append("data", JSON.stringify(data));    
        }
        
        $('#bloqueForm').css('visibility','visible');
        $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Guardado');    
                 else
                    if(confirm('Error al intentar Guardar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    }   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
            });
        
        $scope.Limpiar();
    };
    
    $scope.Establecer=function(t)
    {
      $('#myModalBusqueda').modal('hide');
        
     $scope.codigo_editado=t.codigo;
     $scope.ptos[$scope.ptos.length-1].producto=t.codigo;
     $scope.ptos[$scope.ptos.length-1].descripcion1=t.descripcion1;
     $scope.ptos[$scope.ptos.length-1].cantidad=localStorage.getItem("Cantidad");
     $scope.ptos[$scope.ptos.length-1].descuento=0.0;
     $scope.existencia_producto=t.existencia;
     $scope.ptos[$scope.ptos.length-1].iva_producto=t.iva=='S'?true:false;
     
     
     switch(parseInt(localStorage.getItem("Precio")))
     {
         case 1:
             if(t.iva=='S')
             {
                 $scope.ptos[$scope.ptos.length-1].valor= parseFloat( t.pvp1 /( 1+ ($scope.impuesto_producto_editado /100))).toFixed(4).toString() 
             }
              break;
         case 2:   if(t.iva=='S')
             {
                 $scope.ptos[$scope.ptos.length-1].valor=parseFloat( t.pvp2 /( 1+ ($scope.impuesto_producto_editado /100))).toFixed(4).toString()
             }
               break;
         case 3:   if(t.iva=='S')
             {
                 $scope.ptos[$scope.ptos.length-1].valor=parseFloat( t.pvp3 /( 1+ ($scope.impuesto_producto_editado /100))).toFixed(4).toString()
             }
              break;
         default: if(t.iva=='S')
             {
                 $scope.ptos[$scope.ptos.length-1].valor=parseFloat( t.pvp4 /( 1+ ($scope.impuesto_producto_editado /100))).toFixed(4).toString() 
             }
              break;
     }
     
     $scope.seleccionado=false;
     $scope.ubicaciones.forEach(function(a)
     {
            if(a.codigo==t.ubicacion)
            {
             $scope.ubicacion_seleccionada=a.codigo;
             $scope.ubicacion=$scope.ubicacion_seleccionada;
            }
     });

     $scope.p=t;
     
     $scope.index=$scope.ptos.length-1;
     
    };
    
    $scope.Cliente_Cambio=function()
    {
        $('#bloqueForm').css('visibility','visible');
       $http.get('controlador/ClientePorCedulaCodigoController.php?empresa='+localStorage.getItem("empresa")+"&cedula="+$scope.cliente).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                 $scope.cedula=res.data[0].cedula_ruc;
                 $scope.nombre=res.data[0].nombre;
                 $scope.deuda=res.data[0].deuda;
             }
             else
             {
               
               Herramientas.Notificar('No hay resultados'); 
             }
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
            $('#bloqueForm').css('visibility','hidden');    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        $('#bloqueForm').css('visibility','hidden');
           
        });
    };
    
    $scope.cliente=localStorage.getItem("Cliente");
    $scope.Cliente_Cambio();
    
   
    $scope.Cambio_Precio=function(index)
    {
        if($scope.seleccionado&&index<$scope.ptos.length-1)  //si no es la ultima fila
        {
             if ($scope.pp.iva=="S")
                 $scope.ptos[index].iva_producto=true; 
                else 
                 $scope.ptos[index].iva_producto=false;
            
              switch (parseInt($scope.ptos[index].numprecio)) 
              {
                case 1:
                    $scope.ptos[index].valor=$scope.pp.pvp1;
                    break;
                case 2:
                    $scope.ptos[index].valor=$scope.pp.pvp2;
                    break;
                case 3:
                    $scope.ptos[index].valor=$scope.pp.pvp3;
                    break;
                default:
                    $scope.ptos[index].valor=$scope.pp.pvp4;
                    break;
              }  
        }
        else
        {
             if ($scope.p.iva=="S")
                 $scope.ptos[index].iva_producto=true; 
                else 
                 $scope.ptos[index].iva_producto=false;
            
            switch (parseInt($scope.ptos[index].numprecio)) 
              {
                case 1:
                    $scope.ptos[index].valor=$scope.p.pvp1;
                    break;
                case 2:
                    $scope.ptos[index].valor=$scope.p.pvp2;
                    break;
                case 3:
                    $scope.ptos[index].valor=$scope.p.pvp3;
                    break;
                default:
                    $scope.ptos[index].valor=$scope.p.pvp4;
                    break;
              }  
        }
     
    };
    
  /*  $scope.Cambio_Iva=function(index)
    {
      if($scope.ptos[index].valor!="")
      {
        if($scope.ptos[index].iva_producto)
        {
          var g= $scope.ptos[index].valor*( 1+ ($scope.impuesto_producto_editado /100));
          $scope.ptos[index].valor=g;
         // $scope.ptos[index].total= $scope.ptos[index].cantidad * g;
        }
        else
        {
          var g= $scope.ptos[index].valor/( 1+ ($scope.impuesto_producto_editado /100));
          $scope.ptos[index].valor=g;
         // $scope.ptos[index].total= $scope.ptos[index].cantidad * g;
        }
      }  
    };
    */

    $scope.Vigilar=function()
    {
        $scope.codigo_editado=$scope.ptos[$scope.ptos.length-1].producto;
    };

  } 
  ])
  .controller('ControladorIngresoBodegaTabular',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
     
    $scope.decimales=localStorage.getItem("Decimales").split(".")[1].length; 
    $scope.fecha=new Date().toISOString().split("T")[0];
    $scope.grupos=[{nombre:"Linea",codigo:"L"},{nombre:"Codigo de Barra",codigo:"B"},{nombre:"Grupo",codigo:"B"},{nombre:"Referencia",codigo:"B"},{nombre:"Codigo",codigo:"C"},{nombre:"Descripcion",codigo:"D"}];
    $scope.criterio_seleccionado='D';
    $scope.criterio=$scope.criterio_seleccionado;
    $scope.codigo_editado="";
    $scope.ptos=[{producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),ubicacion:localStorage.getItem("Bodega"),valor:0.00}];
    $scope.index=0;
    
    $scope.p=null;
    $scope.pp=null;
                  
      $scope.Eliminar=function()
    {
        if($scope.codigo=="")
        {
            Herramientas.Notificar("Debe seleccionar un codigo de producto");
            return;
        }
        
        $('#bloqueForm').css('visibility','visible');
        
           var formData = new FormData();
         
             formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("documento", $scope.codigo);
           var _url= localStorage.getItem("I_E")=="E"?"controlador/EliminarBodegaEController.php":"controlador/EliminarBodegaController.php";
       
            $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Eliminado');    
                 else
                    if(confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
         $scope.Limpiar();
       
    };             
                  
     $scope.EliminarProducto=function()
      {
            if($scope.pp.secuencia!="")
            {
            $('#bloqueForm').css('visibility','visible');
        
            var formData = new FormData();
         
            formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("secuencia", $scope.pp.secuencia);
         
       
            $.ajax({
             type: "POST",
             url: "controlador/EliminarProductoCompraController.php",
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                  {                             
                     Herramientas.Notificar('Eliminado');    
                  }
                 else
                   if (confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 

                
                 $('#bloqueForm').css('visibility','hidden');
                
             }
             });
            }
           /*  var index = -1;
             $scope.ptos.forEach(function (entry) 
             {
                index++;
                if (entry.producto == $scope.pp.producto)*/
                  $scope.ptos.splice($scope.index, 1);
            // });    
             
             $scope.index=$scope.ptos.length-1;
             $scope.codigo_editado='';
             $scope.seleccionado=false;
            
    };     
     
    $scope.ProductoxCodigo=function(index)
    {
        //verificar que el id del prducto buscado no esta en el arreglo
        /*var i=-1; var esta=false;
        $scope.ptos.forEach(function(a)
        {     
            i++;
            if(a.producto==$scope.codigo_editado&&i!=index)
               esta=true;
        });
        if(esta)
            return;*/
       
        $scope.seleccionado=false;
        
       if($scope.codigo_editado!="")
      {
            $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.codigo_editado+"&criterio=C&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)
             {
                $scope.p=res.data[0];
                $scope.ptos[index].producto=res.data[0].codigo;
                $scope.ptos[index].descripcion1=res.data[0].descripcion1;
                $scope.ptos[index].cantidad=0;
                $scope.ptos[index].valor=res.data[0].costo;
                
                $('[data-c-id="'+index+'"]').focus();
                $('[data-c-id="'+index+'"]').select();
             }
             else
             {
                Herramientas.Notificar('No hay resultados'); 
             }
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        }); 
      }   
    };
    
    $scope._Subtotal=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=a.cantidad*a.valor;
      });
      return suma.toFixed(2);
    };
    
    $scope.Ultimo=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
        var _url= localStorage.getItem("I_E")=="I"?"controlador/UltimaBodegaController.php":"controlador/UltimaBodegaEController.php";
       
         $.ajax({
             type: "POST",
             url: _url ,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                 if(res === parseInt(res, 10)) 
                    $('#titulo').html(localStorage.getItem("I_E")=="I"?"Ingreso: "+res:"Egreso: "+res);    
                 else
                    Herramientas.Notificar('Error al obtener el ultimo codigo');   
                $('#bloqueForm').css('visibility','hidden');
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
       
    };
    
    $scope.Ultimo();
    
    $scope.Codigo_Cambio=function()
    {
        
       $('#bloqueForm').css('visibility','visible');
       var tipo=localStorage.getItem("I_E")=="I"?"NC":"ND";     
       $http.get('controlador/DatosBaseBodegaController.php?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo="+tipo).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                 $scope.fecha=res.data[0].fecha;                 
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al obtener la cabecera');   
            
            $('#bloqueForm').css('visibility','hidden');   
       }).
       error(function (data, status, headers, config)
       {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
         $('#bloqueForm').css('visibility','hidden');
        });
        
        
        $scope.ptos=[];               
        $http.get('controlador/DatosProductosVentaController.php?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo="+tipo).success(function (res)
        {
            if(Object.prototype.toString.call(res.data) === '[object Array]')
            {
                if(res.data.length>0)  
                {
                  res.data.forEach(function(a){
                      a.valor=parseFloat(a.valor).toFixed($scope.decimales);
                      a.valor1=parseFloat(a.valor1).toFixed($scope.decimales);
                  });     
                    
                 $scope.ptos=res.data;
                 $scope.ptos.push({producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),ubicacion:localStorage.getItem("Bodega"),valor:0.00});
                 $scope.index=$scope.ptos.length-1;
                }
                else
                   Herramientas.Notificar('No hay productos'); 
            }
            else
              Herramientas.Notificar('Error al obtener el cuerpo');                  
        }).
        error(function (data, status, headers, config)
        {
            if(status===404)
               Herramientas.Notificar('Servidor no encontrado');
        });
        
       
       $scope.editando=true;
    };
    
    $scope.Editar=function(t,index)
    {
        $scope.index=index;   
        $scope.codigo_editado=t.producto;
       
        
        $scope.seleccionado=true; 
        $scope.pp=t;
       
    };
    
    $scope.ManejarProducto=function($index)
    {
        if($scope.ptos[$index].cantidad<=0)
        {
            Herramientas.Notificar("cantidad debe ser mayor que cero");
            return;
        }
        
        
        if($index<$scope.ptos.length-1)  //si no es el ultimo es una modificacion
        {          
               var i=-1;              
             $scope.ptos.forEach(function(d)
             {
                 i++;
                 if(i==$index)
                 {
                    d.cantidad=$scope.ptos[$index].cantidad;
                    d.bonificacion=0;
                   
                    d.valor=$scope.ptos[$index].valor;
                    d.valor1=$scope.ptos[$index].valor;
                    d.descuento=0;
             
                    d.impuesto=0;
                   
                    d.iva_v="N";
                    d.promedio=0;
                    d.costo=0;
                    d.ubicacion=$scope.ptos[$index].ubicacion;
            
                    d.serie="";
                    d.cajas=0;
                    d.unidades=0;
                    d.fraccion="";
                 }    
             });       
        }
        else
        {
             var d={};
             d.producto=$scope.ptos[$index].producto;
             d.cantidad=$scope.ptos[$index].cantidad;
             d.bonificacion=0;
             d.descripcion1=$scope.ptos[$index].descripcion1;
             d.valor=$scope.ptos[$index].valor;
             d.valor1=$scope.ptos[$index].valor;
             d.descuento=0;
             
             d.impuesto=0;
             d.secuencia="";
             d.iva_v="N";
             d.promedio=0;
             d.costo=0;
             d.ubicacion=$scope.ptos[$index].ubicacion;
             d.numprecio=$scope.p.costo;
             
             d.serie="";
             d.cajas=0;
             d.unidades=0;
             d.fraccion="";
             d.iva=$scope.p.iva;
             
             d.pvp1=$scope.p.pvp1;
             d.pvp2=$scope.p.pvp2;
             d.pvp3=$scope.p.pvp3;
             d.pvp4=$scope.p.pvp4;
             
             $scope.ptos[$scope.ptos.length-1]=d;
             $scope.ptos.push({producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),ubicacion:localStorage.getItem("Bodega"),valor:0.00});
        }
         $scope.codigo_editado='';
         $scope.index=$scope.ptos.length-1;
         
         setTimeout(function(){ $('[data-c-cod="'+$scope.index+'"]').focus();}, 1);
    };
       
    $scope.Limpiar_Edicion=function()
    {
        $scope.codigo_editado="";
       
        $scope.ptos[$scope.ptos.length-1]={producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),ubicacion:localStorage.getItem("Bodega"),valor:0.00};
        
        $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
        $scope.ubicacion=$scope.ubicacion_seleccionada;
        
        $scope.seleccionado=false; 
    };
    
     $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda+"&criterio="+$scope.criterio+"&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
    
    $scope.Limpiar=function()
    {
    $scope.codigo="";
    $scope.fecha=new Date().toISOString().split("T")[0];
    
    $scope.ptos=[{producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),ubicacion:localStorage.getItem("Bodega"),valor:0.00}];
    
    $scope.editando=false;
    $scope.seleccionado=false;
    
  
    };
    
    
     $scope.Establecer=function(t)
    {
      $('#myModalBusqueda').modal('hide');
      $scope.codigo_editado=t.codigo;
      $scope.ptos[$scope.ptos.length-1].producto=t.codigo;
      $scope.ptos[$scope.ptos.length-1].descripcion1=t.descripcion1;
      $scope.ptos[$scope.ptos.length-1].cantidad=localStorage.getItem("Cantidad");
      $scope.ptos[$scope.ptos.length-1].valor=t.costo;
     
      $scope.seleccionado=false;

      $scope.p=t;
      $scope.index=$scope.ptos.length-1;
    };
    
    
    $scope.ManejarBodega=function()
    {
         var formData = new FormData();
         formData.append("empresa", localStorage.getItem("empresa"));
         formData.append("f_i", $scope.fecha);
         var data=[];
         var _url;

        if($scope.editando)
        {
            if($scope.codigo=="")
            {
                Herramientas.Notificar("Debe seleccionar un codigo de producto");
                return;
            }
            
            formData.append("cod_proforma", $scope.codigo);
             _url= localStorage.getItem("I_E")=="E"?"controlador/ModificarBodegaEController.php":"controlador/ModificarBodegaController.php";
            var i=-1;
            $scope.ptos.forEach(function(s){
                   i++;
                   if(i!=$scope.ptos.length-1)
                   {  
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.codproducto= s.producto;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.secuencia= s.secuencia;
                    d.descuento= s.descuento;
                    data.push(d);
                   }
            });
            
            formData.append("data", JSON.stringify(data));   
        }
        else
        {
             _url= localStorage.getItem("I_E")=="E"?"controlador/CrearBodegaEController.php":"controlador/CrearBodegaController.php"; 
           var i=-1;
             $scope.ptos.forEach(function(s)
             {
                   i++;
                   if(i!=$scope.ptos.length-1)
                   {  
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.codproducto= s.producto;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.descripcion1= s.descripcion1;
                    d.descuento= s.descuento;
                    data.push(d);
                    }
            });
            
             formData.append("data", JSON.stringify(data));    
        }
        
        $('#bloqueForm').css('visibility','visible');
        $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Guardado');    
                 else
                    if(confirm('Error al intentar Guardar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    }   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
            });
        
        $scope.Limpiar();
    };
    
    
    $scope.Ubicaciones=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/UbicacionController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.ubicaciones=res.data;
               $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
               $scope.ubicacion=$scope.ubicacion_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.Ubicaciones();

    $scope.Vigilar=function()
    {
        $scope.codigo_editado=$scope.ptos[$scope.ptos.length-1].producto;
    };


  } 
  ])
  .controller('ControladorCompraTabular',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
     
    $scope.decimales=localStorage.getItem("Decimales").split(".")[1].length; 
    $scope.existencia_producto=0.0;
    
    $scope.grupos=[{nombre:"Linea",codigo:"L"},{nombre:"Codigo de Barra",codigo:"B"},{nombre:"Grupo",codigo:"B"},{nombre:"Referencia",codigo:"B"},{nombre:"Codigo",codigo:"C"},{nombre:"Descripcion",codigo:"D"}];
    $scope.criterio_seleccionado='D';
    $scope.criterio=$scope.criterio_seleccionado;
    
    $scope.codigo_editado="";
    $scope.ptos=[{producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),ubicacion:localStorage.getItem("Bodega"),valor:0.00,descuento:0.00,iva_producto:false}];
    $scope.index=0;
    
    $scope.p=null;
    $scope.pp=null;
  

      $scope.Eliminar=function()
    {
        if($scope.codigo=="")
        {
            Herramientas.Notificar("Debe seleccionar un codigo de producto");
            return;
        }
        
        $('#bloqueForm').css('visibility','visible');
        
           var formData = new FormData();
         
             formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("documento", $scope.codigo);
            var _url= "controlador/EliminarCompraController.php";
       
            $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Eliminado');    
                 else
                    if(confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
         $scope.Limpiar();
       
    };             
                  
    $scope.ProductoxCodigo=function(index)
    {
        $scope.seleccionado=false;
        
       if($scope.codigo_editado!="")
      {
            $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.codigo_editado+"&criterio=C&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)
             {
                $scope.p=res.data[0];
                $scope.ptos[index].producto=res.data[0].codigo;
                $scope.ptos[index].descripcion1=res.data[0].descripcion1;
                $scope.ptos[index].cantidad=parseFloat(localStorage.getItem("Cantidad"));
                
                $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
                $scope.ubicacion=$scope.ubicacion_seleccionada;
                
                $scope.ptos[index].valor=res.data[0].costo;
                
                $scope.ptos[index].iva_producto=res.data[0].iva=='S'?true:false;
                $scope.existencia_producto=res.data[0].existencia==null?0.0:res.data[0].existencia;
                
                //establecer el foco en la cantidad
                $('[data-c_id="'+index+'"]').focus();
                $('[data-c_id="'+index+'"]').select();
                
             }
             else
             {
                Herramientas.Notificar('No hay resultados'); 
             }
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        }); 
      }   
    };
   
    $scope._Subtotal=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=a.cantidad*a.valor;
      });
      return suma.toFixed(2);
    };
    
    $scope._Descuento=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=(a.valor*a.cantidad )* a.descuento/100;
      });
      return suma.toFixed(2);  
    };
    
    $scope._Iva=function()
    {
        var suma=0;
      $scope.ptos.forEach(function(a){
          if(a.impuesto!=null)
          suma+=( (a.cantidad *a.valor) - ((a.cantidad *a.valor)*(a.descuento/100) )  )  *(a.impuesto/100);
      });
      return suma.toFixed(2);  
    };
    
     $scope._Total=function()
    {
      var suma=0;
      $scope.ptos.forEach(function(a){
          suma+=a.cantidad*a.valor;
      });
        
      var st=suma;
        
        suma=0;
       $scope.ptos.forEach(function(a){
           if(a.impuesto!=null)
          suma+=( (a.cantidad *a.valor) - ((a.cantidad *a.valor)*(a.descuento/100) )  )  *(a.impuesto/100);
      });
      
      var i=suma;
      
      suma=0;
         $scope.ptos.forEach(function(a){
          suma+=(a.valor*a.cantidad )* a.descuento/100;
      });
      
      var d=suma;
      return (st+i-d).toFixed(2);  
    };
    
     
    $scope.Ultimo=function()
    {
        $('#bloqueForm').css('visibility','visible');
        
         var formData = new FormData();
         
         formData.append("empresa", localStorage.getItem("empresa"));
         var _url= "controlador/UltimaCompraController.php";
       
         $.ajax({
             type: "POST",
             url: _url ,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                 if(res === parseInt(res, 10)) 
                    $('#titulo').html("Compra: "+res);    
                 else
                    Herramientas.Notificar('Error al obtener el ultimo codigo');   
                $('#bloqueForm').css('visibility','hidden');
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
         });
       
    };
    
    $scope.Ultimo();
    
       
    $scope.Limpiar_Edicion=function()
    {
        $scope.codigo_editado="";
      
        $scope.existencia_producto=0.0;
        
         $scope.ptos[$scope.ptos.length-1]={producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),ubicacion:localStorage.getItem("Bodega"),valor:0.00,descuento:0.00,iva_producto:false};
        
        $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
        $scope.ubicacion=$scope.ubicacion_seleccionada;
        
        $scope.seleccionado=false; 
    };
    
     $scope.Buscar=function()
    {
       $scope.productos=[];
       $scope.peticionando=true;
       $http.get('controlador/ProductoController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda+"&criterio="+$scope.criterio+"&ubicacion="+$scope.ubicacion).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.productos=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
   
    
    $scope.Limpiar=function()
    {
    $scope.codigo="";
    $scope.proveedor="";
    $scope.nombre="";
    $scope.cedula="";
    
    var hoy=new Date();
    var despues=hoy.setDate(hoy.getDate() + parseInt(localStorage.getItem("Dias")));
    despues= new Date(despues).toLocaleString().split(",")[0]; 
         
    hoy=new Date().toLocaleString().split(",")[0];
         
    $('#reservation').data('daterangepicker').setStartDate(hoy);
    $('#reservation').data('daterangepicker').setEndDate(despues);
    
    $scope.estacion="";
    $scope.punto="";
    $scope.referencia="";
    
    $scope.autorizacion="";
    $scope.iva=false;
    $scope.fuente=false;
    
    
    $scope.ptos=[{producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),ubicacion:localStorage.getItem("Bodega"),valor:0.00,descuento:0.00,iva_producto:false}];
    
    $scope.editando=false;
    $scope.seleccionado=false;
    
  
    };
    
    $scope.Ubicaciones=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/UbicacionController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.ubicaciones=res.data;
               $scope.ubicacion_seleccionada=$scope.ubicaciones[0].codigo;
               $scope.ubicacion=$scope.ubicacion_seleccionada;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.Ubicaciones();
    
     $scope.Codigo_Cambio=function()
    {
        
       $('#bloqueForm').css('visibility','visible');  
       $http.get('controlador/DatosBaseCompraController.php?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo=CP").success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                 $scope.proveedor=res.data[0].pro_cli;
                 $scope.nombre=res.data[0].nombre;
                 $scope.cedula=res.data[0].cedula_ruc;
                 $scope.estacion=res.data[0].estacion;
                 $scope.punto=res.data[0].punto;
                 $scope.referencia=res.data[0].referencia;
                 $scope.autorizacion=res.data[0].autorizacion;
                 $scope.iva=res.data[0].r_iva=='S'?true:false;
                 $scope.fuente=res.data[0].r_fuente=='S'?true:false;
                 
                var fecha= res.data[0].fecha.split("-");
                fecha=fecha[1]+"/"+fecha[2]+"/"+fecha[0];
                
                var fechaV= res.data[0].fechaV.split("-");
                fechaV=fechaV[1]+"/"+fechaV[2]+"/"+fechaV[0];
                
                $('#reservation').data('daterangepicker').setStartDate(fecha);
                $('#reservation').data('daterangepicker').setEndDate(fechaV);
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al obtener la cabecera');   
            
            $('#bloqueForm').css('visibility','hidden');   
       }).
       error(function (data, status, headers, config)
       {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
         $('#bloqueForm').css('visibility','hidden');
        });
        
        
        $scope.ptos=[];               
        $http.get('controlador/DatosProductosVentaController.php?empresa='+localStorage.getItem("empresa")+"&documento="+$scope.codigo+"&tipo=CP").success(function (res)
        {
            if(Object.prototype.toString.call(res.data) === '[object Array]')
            {
                if(res.data.length>0)  
                {
                  res.data.forEach(function(a){
                      a.valor=parseFloat(a.valor).toFixed($scope.decimales);
                      a.valor1=parseFloat(a.valor1).toFixed($scope.decimales);
                      a.iva_producto=parseFloat(a.impuesto)>0.00?true:false;
                  });     
                    
                 $scope.ptos=res.data;
                 $scope.ptos.push({producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),ubicacion:localStorage.getItem("Bodega"),valor:0.00,descuento:0.00,iva_producto:false});
                 $scope.index=$scope.ptos.length-1;
                }
                else
                   Herramientas.Notificar('No hay productos'); 
            }
            else
              Herramientas.Notificar('Error al obtener el cuerpo');                  
        }).
        error(function (data, status, headers, config)
        {
            if(status===404)
               Herramientas.Notificar('Servidor no encontrado');
        });
        
       
       $scope.editando=true;
    };
    
    $scope.Editar=function(t,index)
    {
         $scope.index=index;
         $scope.codigo_editado=t.producto;
        
        $scope.seleccionado=true; 
        $scope.pp=t;
       
    };
    
     $scope.ManejarProducto=function($index)
    {
        if($scope.cantidad<=0)
        {
            Herramientas.Notificar("cantidad debe ser mayor que cero");
            return;
        }
        
        
        if($index<$scope.ptos.length-1)
        {
             var i=-1;             
             $scope.ptos.forEach(function(d)
             {
                 i++;
                 if(i==$index)
                 {
                    d.cantidad=$scope.ptos[$index].cantidad;
                    d.bonificacion=0;
                   
                    d.valor=$scope.ptos[$index].valor;
                    d.valor1=$scope.ptos[$index].valor;
                    d.descuento=$scope.ptos[$index].descuento;
                    
                     if($scope.ptos[$index].iva_producto)
                    {
                        d.iva_v="S";
                        d.impuesto=localStorage.getItem("IVA");
                    }
                    else
                    {
                        d.iva_v = "N";
                        d.impuesto="0";
                    }

                                        
                    d.promedio=0;
                    d.costo=0;
                    d.ubicacion=$scope.ptos[$index].ubicacion;
            
                    d.serie="";
                    d.cajas=0;
                    d.unidades=0;
                    d.fraccion="";
                 }    
             });
                        
        }
        else
        {
             var d={};
             d.producto=$scope.ptos[$index].producto;
             d.cantidad=$scope.ptos[$index].cantidad;
             d.bonificacion=0;
             d.descripcion1=$scope.ptos[$index].descripcion1;
             d.valor=$scope.ptos[$index].valor;
             d.valor1=$scope.ptos[$index].valor;
            
             d.descuento=$scope.ptos[$index].descuento;
                    
                     if($scope.ptos[$index].iva_producto)
                    {
                        d.iva_v="S";
                        d.impuesto=localStorage.getItem("IVA");
                        d.iva_producto=true;
                    }
                    else
                    {
                        d.iva_v = "N";
                        d.impuesto="0";
                        d.iva_producto=false;
                    }
             d.secuencia="";
             
             d.promedio=0;
             d.costo=0;
             d.ubicacion=$scope.ptos[$index].ubicacion;
             d.numprecio="";
             
             d.serie="";
             d.cajas=0;
             d.unidades=0;
             d.fraccion="";
             d.iva=$scope.p.iva;
             
             d.pvp1=$scope.p.pvp1;
             d.pvp2=$scope.p.pvp2;
             d.pvp3=$scope.p.pvp3;
             d.pvp4=$scope.p.pvp4;
             
             $scope.ptos[$scope.ptos.length-1]=d;
             $scope.ptos.push({producto:"",cantidad:parseFloat(localStorage.getItem("Cantidad")),ubicacion:localStorage.getItem("Bodega"),valor:0.00,descuento:0.00,iva_producto:false});
        }
        
        $scope.codigo_editado='';
        $scope.index=$scope.ptos.length-1;
        setTimeout(function(){ $('[data-c-cod="'+$scope.index+'"]').focus();}, 1);
        
    };
    
    $scope.EliminarProducto=function()
    {
            if($scope.pp.secuencia!="")
            {
            $('#bloqueForm').css('visibility','visible');
        
            var formData = new FormData();
         
            formData.append("empresa", localStorage.getItem("empresa"));
            formData.append("secuencia", $scope.pp.secuencia);
         
       
            $.ajax({
             type: "POST",
             url: "controlador/EliminarProductoCompraController.php",
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                  {                             
                     Herramientas.Notificar('Eliminado');    
                  }
                 else
                   if (confirm('Error al intentar eliminar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    } 

                
                 $('#bloqueForm').css('visibility','hidden');
                
             }
             });
            }
             
             $scope.ptos.splice($scope.index, 1);
           
             
             $scope.index=$scope.ptos.length-1;
             $scope.codigo_editado='';
             $scope.seleccionado=false;
    };     
    
     $scope.ManejarBodega=function()
    {
         var formData = new FormData();
         formData.append("empresa", localStorage.getItem("empresa"));
         
          var f_i =$('#reservation').val().split(" - ")[0].split("/");
          var f_f =$('#reservation').val().split(" - ")[1].split("/");
         
         formData.append("f_i",f_i[2]+"/"+f_i[0]+"/"+f_i[1] );
         formData.append("f_f",f_f[2]+"/"+f_f[0]+"/"+f_f[1]);
         formData.append("cod_cliente",$scope.proveedor);
         formData.append("estacion",$scope.estacion);
         formData.append("punto",$scope.punto);
         formData.append("referencia",$scope.referencia);
         formData.append("autorizacion",$scope.autorizacion);
         formData.append("r_iva",$scope.iva?'S':'N');
         formData.append("r_fuente",$scope.fuente?'S':'N');
         
         var data=[];
         var _url;

        if($scope.proveedor=="")
            {
                Herramientas.Notificar("Debe seleccionar un proveedor");
                return;
            }

        if($scope.editando)
        {
            if($scope.codigo=="")
            {
                Herramientas.Notificar("Debe seleccionar un codigo de producto");
                return;
            }
            
            formData.append("cod_proforma", $scope.codigo);
             _url= "controlador/ModificarCompraController.php";
            
            
             var i=-1;
            
            $scope.ptos.forEach(function(s)
            {
                   i++;
                   if(i!=$scope.ptos.length-1)
                   { 
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.codproducto= s.producto;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.secuencia= s.secuencia;
                    d.descuento= s.descuento;
                    data.push(d);
                  }
            });
            
            formData.append("data", JSON.stringify(data));   
        }
        else
        {
             _url= "controlador/CrearCompraController.php"; 
            var i=-1;
             $scope.ptos.forEach(function(s)
             {
                   i++;
                   if(i!=$scope.ptos.length-1)
                   { 
                    var d={};
                    d.cantidad= s.cantidad;
                    d.valor= s.valor;
                    d.impuesto=s.impuesto==""?"0":s.impuesto;
                    d.lista= s.numprecio;
                    d.codproducto= s.producto;
                    d.valor1= s.valor1;
                    d.ubicacion= s.ubicacion;
                    d.descripcion1= s.descripcion1;
                    d.descuento= s.descuento;
                    data.push(d);
                   }
             });
            
             formData.append("data", JSON.stringify(data));    
        }
        
        $('#bloqueForm').css('visibility','visible');
        $.ajax({
             type: "POST",
             url: _url,
             data: formData,
             dataType: 'json',
             contentType: false,
             processData: false,
             success: function (res)
             {
                
             },
             error: function (error)
             {     
                if(error.status===404)  
                 Herramientas.Notificar('Servidor no encontrado');
                else
                 if(error.responseText=='')
                    Herramientas.Notificar('Guardado');    
                 else
                    if(confirm('Error al intentar Guardar. Al cerrar este dialogo la pagina se recargara')) 
                    {
                      $location.path($location.path());      
                    }   
                
                 $('#bloqueForm').css('visibility','hidden');
               
             }
            });
        
        $scope.Limpiar();
    };
    
      $scope.Establecer=function(t)
    {
     $('#myModalBusqueda').modal('hide');  
     $scope.codigo_editado=t.codigo;
     $scope.ptos[$scope.ptos.length-1].producto=t.codigo;
     $scope.ptos[$scope.ptos.length-1].descripcion1=t.descripcion1;
     $scope.ptos[$scope.ptos.length-1].cantidad=localStorage.getItem("Cantidad");
     $scope.ptos[$scope.ptos.length-1].valor=t.costo;
     $scope.existencia_producto=t.existencia;
     $scope.ptos[$scope.ptos.length-1].iva_producto=t.iva=='S'?true:false
     $scope.seleccionado=false;

     $scope.p=t;
     $scope.index=$scope.ptos.length-1;
  
    };
    
    $scope.Proveedor_Cambio=function()
    {
        $('#bloqueForm').css('visibility','visible');
       $http.get('controlador/ProveedorCedulaRucController.php?empresa='+localStorage.getItem("empresa")+"&cedula="+$scope.proveedor).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
                 $scope.cedula=res.data[0].cedula_ruc;
                 $scope.nombre=res.data[0].nombre;
             }
             else
             {
               $scope.proveedor="";  
             Herramientas.Notificar('No hay resultados'); 
             }
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
            $('#bloqueForm').css('visibility','hidden');    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        $('#bloqueForm').css('visibility','hidden');
           
        });
    };
    
    $scope.Vigilar=function()
    {
        $scope.codigo_editado=$scope.ptos[$scope.ptos.length-1].producto;
    };
    
      $scope.BuscarProveedor=function()
    {
       $scope.provee=[];
       $scope.peticionando=true;
       $http.get('controlador/ProveedorController.php?empresa='+localStorage.getItem("empresa")+"&filtro="+$scope.nombre_busqueda).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             $scope.provee=res.data;
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.EstablecerProveedor=function(t)
    {
         $('#myModalBusquedaProveedor').modal('hide');        
         $scope.proveedor=t.codigo;
         $scope.cedula=t.cedula_ruc;
         $scope.nombre=t.nombre;
   };
    
  } 
  ])
  .controller('ControladorInforme_Ventas_Grupo',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){

    $scope.peticionando=false;
    
     $scope.grupos_productos=[]; $scope.grupo_seleccionado;

     $scope.Grupo_Productos=function()
     {
       $scope.peticionando=true;
       $http.get('controlador/GrupoController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.grupos_productos=res.data;
               $scope.grupo_seleccionado=$scope.grupos_productos[0].codigo;
               $scope.grupo=$scope.grupo_seleccionado;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.Grupo_Productos();
    
    
    function Agrupar(datos)
    {

        $scope.grupo.forEach(function(a)
        {
            $scope.grupos_productos.forEach(function(d)
            {
                if(a==d.codigo)
                 $scope.ptos.push({grupo:a,nombre_grupo:d.grupo,cantidad:0,subtotal:0,descuento:0,iva:0,total:0});
            });
            
        });

        $scope.ptos.forEach(function(a)
        {
             datos.forEach(function(d){
                 
                 if(a.grupo==d.grupo)
                 {
                     a.cantidad=a.cantidad+parseFloat(d.cantidad);
                     a.subtotal=a.subtotal+parseFloat(d.subtotal);
                     a.iva=a.iva+parseFloat(d.iva);
                     a.total=a.total+parseFloat(d.total);
                 }
                 
             });
        });
            
    }
    
    $scope.ProcesarFinal=function()
    {
       $scope.peticionando=true;
       var  codigos_grupos="";
        
      $scope.grupo.forEach(function(a)
      {
                var codigo="";
                switch (a.length)
                {
                    case 1: codigo="0000000"+a; break;
                    case 2: codigo="000000"+a; break;
                    case 3: codigo="00000"+a; break;
                    case 4: codigo="0000"+a; break;
                    case 5: codigo="000"+a; break;
                    case 6: codigo="00"+a; break;
                    case 7: codigo="0"+a; break;
                    default: break;
                }
                codigos_grupos+=codigo;    
      });  
        

       var f_i =$('#reservation').val().split(" - ")[0].split("/");
       var f_f =$('#reservation').val().split(" - ")[1].split("/");
    
       f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
       f_f=f_f[2]+"/"+f_f[0]+"/"+f_f[1];


       $scope.ptos=[];
       
       $http.get('controlador/VentaGrupoController.php?empresa='+localStorage.getItem("empresa")+"&inicio="+f_i+"&fin="+f_f+"&grupos="+codigos_grupos+"&tipo=FC").success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               Agrupar(res.data);
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
            $scope.peticionando=false; 
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
            $scope.peticionando=false;
        });
     };


  } 
  ])
  .controller('ControladorInforme_Ventas_Caja',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){
 
    
    $scope.tipos=[{codigo:"vnp",nombre:"Todos"},{codigo:"v",nombre:"Facura de Venta"},{codigo:"n",nombre:"Nota de Venta"},{codigo:"p",nombre:"Punto de Venta"}];
    $scope.tipo_seleccionado="vnp";
    $scope.tipo=$scope.tipo_seleccionado;
    
   
    $scope.peticionando=false;
    
  
  
    
    
    $scope.ProcesarFinal=function()
    {
       var f_i =$('#reservation').val().split(" - ")[0].split("/");
       var f_f =$('#reservation').val().split(" - ")[1].split("/");
    
       f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
       f_f=f_f[2]+"/"+f_f[0]+"/"+f_f[1];
       
       $scope.ptos=[];
       
       $http.get('controlador/VentaClienteController.php?empresa='+localStorage.getItem("empresa")+"&inicio="+f_i+"&fin="+f_f+"&cliente="+$scope.cliente+"&codigos_vendedores="+codigos_vendedores+"&tipo="+$scope.tipo).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               res.data.forEach(function(a)
               {
                   a.sub_iva=parseFloat(a.sub_iva);
                   a.sub_siva=parseFloat(a.sub_siva);
                   a.descuento_iva=parseFloat(a.descuento_iva);
                   a.descuento_siva=parseFloat(a.descuento_siva);
               });  
               $scope.ptos=res.data;
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
       
        });
     };

    
    
  } 
  ])
  .controller('ControladorInforme_Ventas_Ubicacion',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){

    $scope.peticionando=false;
    $scope.ubicaciones=[];
    
    $scope.Ubicaciones=function()
    {
       $scope.peticionando=true;
       $http.get('controlador/UbicacionController.php?empresa='+localStorage.getItem("empresa")).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.ubicaciones=res.data;
             }
             else
             Herramientas.Notificar('Error en los datos'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
             $scope.peticionando=false;    
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
        $scope.peticionando=false;
        });
     };
     
    $scope.Ubicaciones();
    
    function Agrupar(datos)
    {
        $scope.ubicaciones.forEach(function(d)
        {    
          $scope.ptos.push({ubicacion:d.codigo,nombre_ubicacion:d.ubicacion,subtotal:0,descuento:0,iva:0,total:0});
        });
            
      
        $scope.ptos.forEach(function(a)
        {
             datos.forEach(function(d){
                 
                 if(a.grupo==d.grupo)
                 {
                     a.descuento=a.descuento+parseFloat(d.descuento);
                     a.subtotal=a.subtotal+parseFloat(d.subtotal);
                     a.iva=a.iva+parseFloat(d.iva);
                     a.total=a.total+parseFloat(d.total);
                 }
                 
             });
        });
            
    }
    
    $scope.ProcesarFinal=function()
    {

       var f_i =$('#reservation').val().split(" - ")[0].split("/");
       var f_f =$('#reservation').val().split(" - ")[1].split("/");
    
       f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
       f_f=f_f[2]+"/"+f_f[0]+"/"+f_f[1];


       $scope.ptos=[];
       
       $http.get('controlador/VentaUbicacionController.php?empresa='+localStorage.getItem("empresa")+"&inicio="+f_i+"&fin="+f_f).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               Agrupar(res.data);
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
            $scope.peticionando=false; 
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
            $scope.peticionando=false;
        });
     };

  } 
  ])
   .controller('ControladorInforme_Ventas_dia',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){

    $scope.peticionando=false;
 
    $scope.ProcesarFinal=function()
    {

       var f_i =$('#reservation').val().split(" - ")[0].split("/");
       var f_f =$('#reservation').val().split(" - ")[1].split("/");
    
       f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
       f_f=f_f[2]+"/"+f_f[0]+"/"+f_f[1];


       $scope.ptos=[];
       
       $http.get('controlador/VentaDiaController.php?empresa='+localStorage.getItem("empresa")+"&inicio="+f_i+"&fin="+f_f).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
               $scope.ptos=res.data;
               
               var f={fecha:"",subtotal:0,descuento:0,iva:0,total:0};
               res.data.forEach(function(a)
               {
                   f.subtotal=f.subtotal+parseFloat(a.subtotal);
                   f.descuento=f.descuento+parseFloat(a.descuento);
                   f.iva=f.iva+parseFloat(a.iva);
                   f.total=f.total+parseFloat(a.total);
               });
               
               $scope.ptos.push(f);
               
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
            $scope.peticionando=false; 
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
            $scope.peticionando=false;
        });
     };

  } 
  ])
  .controller('ControladorInforme_Cobros',['$scope','$http','Herramientas','$location',function($scope,$http,Herramientas,$location){

    $scope.peticionando=false;
 
    $scope.ProcesarFinal=function()
    {

       var f_i =$('#reservation').val().split(" - ")[0].split("/");
       var f_f =$('#reservation').val().split(" - ")[1].split("/");
    
       f_i=f_i[2]+"/"+f_i[0]+"/"+f_i[1];
       f_f=f_f[2]+"/"+f_f[0]+"/"+f_f[1];


       $scope.ptos=[];
       
       $http.get('controlador/InformeCobroController.php?empresa='+localStorage.getItem("empresa")+"&inicio="+f_i+"&fin="+f_f).success(function (res)
       {
           if(Object.prototype.toString.call(res.data) === '[object Array]')
           {
             if(res.data.length>0)  
             {
              Agregar(res.data); 
             }
             else
             Herramientas.Notificar('No hay resultados'); 
           }
           else
            Herramientas.Notificar('Error al buscar');   
            
            $scope.peticionando=false; 
       }).
        error(function (data, status, headers, config)
        {
          if(status===404)
            Herramientas.Notificar('Servidor no encontrado');
        
            $scope.peticionando=false;
        });
     };
     
     function Agregar(res)
     {
        var f={fecha:"",subtotal:0,descuento:0,iva:0,total:0};
        res.data.forEach(function(a)
        {
         f.subtotal=f.subtotal+parseFloat(a.subtotal);
         f.descuento=f.descuento+parseFloat(a.descuento);
         f.iva=f.iva+parseFloat(a.iva);
         f.total=f.total+parseFloat(a.total);
        });

        $scope.ptos.push(f);
     }

  } 
  ])
  ;




