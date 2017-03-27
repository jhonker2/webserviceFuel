<?php
require_once('php/rectificar.php');
$usuario= $_SESSION["user"];
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Genesis WEB</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="plugins/iCheck/flat/blue.css">
    <!-- Morris chart -->
    <link rel="stylesheet" href="plugins/morris/morris.css">
    <!-- jvectormap -->
    <link rel="stylesheet" href="plugins/jvectormap/jquery-jvectormap-1.2.2.css">
    <!-- Date Picker -->
    <link rel="stylesheet" href="plugins/datepicker/datepicker3.css">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker-bs3.css">
    <!-- bootstrap wysihtml5 - text editor -->
    <link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="hold-transition skin-blue sidebar-mini" ng-app="miAp">
    <div class="wrapper">

      <header class="main-header">
        <!-- Logo -->
        <a  class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>W</b>EB</span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b>Genesis </b>WEB</span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
          </a>
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <!-- Messages: style can be found in dropdown.less-->
              <li class="dropdown messages-menu"> <a id="empresa"> </a> </li>
              
              
              
<!--              <li class="dropdown messages-menu">
                <a  class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-envelope-o"></i>
                  <span class="label label-success">4</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="header">You have 4 messages</li>
                  <li>
                     inner menu: contains the actual data 
                    <ul class="menu">
                      <li> start message 
                        <a href="#">
                          <div class="pull-left">
                            <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                          </div>
                          <h4>
                            Support Team
                            <small><i class="fa fa-clock-o"></i> 5 mins</small>
                          </h4>
                          <p>Why not buy a new awesome theme?</p>
                        </a>
                      </li> end message 
                      
                    </ul>
                  </li>
                  <li class="footer"><a href="#">See All Messages</a></li>
                </ul>
              </li>
               Notifications: style can be found in dropdown.less 
              <li class="dropdown notifications-menu">
                <a  class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-bell-o"></i>
                  <span class="label label-warning">10</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="header">You have 10 notifications</li>
                  <li>
                     inner menu: contains the actual data 
                    <ul class="menu">
                      <li>
                        <a href="#">
                          <i class="fa fa-users text-aqua"></i> 5 new members joined today
                        </a>
                      </li>
                    
                    </ul>
                  </li>
                  <li class="footer"><a href="#">View all</a></li>
                </ul>
              </li>
               Tasks: style can be found in dropdown.less 
              <li class="dropdown tasks-menu">
                <a  class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-flag-o"></i>
                  <span class="label label-danger">9</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="header">You have 9 tasks</li>
                  <li>
                     inner menu: contains the actual data 
                    <ul class="menu">
                      <li> Task item 
                        <a href="#">
                          <h3>
                            Design some buttons
                            <small class="pull-right">20%</small>
                          </h3>
                          <div class="progress xs">
                            <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                              <span class="sr-only">20% Complete</span>
                            </div>
                          </div>
                        </a>
                      </li> end task item 
                    
                    </ul>
                  </li>
                  <li class="footer">
                    <a href="#">View all tasks</a>
                  </li>
                </ul>
              </li>-->
              
              
              
              
              <!-- User Account: style can be found in dropdown.less -->
              <li class="dropdown user user-menu">
                <a  class="dropdown-toggle" data-toggle="dropdown">
                  <img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
                  <span class="hidden-xs"><?php echo $usuario ?></span>
                </a>
                <ul class="dropdown-menu">
                  <!-- User image -->
                  <li class="user-header" style="height: 135px">
                    <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                    <p>
                      <?php echo $usuario ?> 
<!--                      <small>Member since Nov. 2015</small>-->
                    </p>
                  </li>
                  <!-- Menu Body -->
<!--                  <li class="user-body">
                    <div class="col-xs-4 text-center">
                      <a href="#">Followers</a>
                    </div>
                    <div class="col-xs-4 text-center">
                      <a href="#">Sales</a>
                    </div>
                    <div class="col-xs-4 text-center">
                      <a href="#">Friends</a>
                    </div>
                  </li>-->
                  <!-- Menu Footer-->
                  <li class="user-footer">
<!--                    <div class="pull-left">
                      <a href="#" class="btn btn-default btn-flat">Profile</a>
                    </div>-->
                    <div style="text-align: center">
                        <a  href="php/cerrar_sesion.php" class="btn btn-default btn-flat">Salir</a>
                    </div>
                  </li>
                </ul>
              </li>
              <!-- Control Sidebar Toggle Button -->
              <li>
               <!-- <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>-->
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <!-- Left side column. contains the logo and sidebar -->
      <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
          <!-- Sidebar user panel -->
          <div class="user-panel">
            <div class="pull-left image">
              <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
              <p><?php echo $usuario ?></p>
              <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          <!-- search form -->
<!--          <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
              <input type="text" name="q" class="form-control" placeholder="Buscar...">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
              </span>
            </div>
          </form>-->
          <!-- /.search form -->
          <!-- sidebar menu: : style can be found in sidebar.less -->
          <ul class="sidebar-menu">
            <li class="header">ADMINISTRACION</li>
            
            <li class="treeview">
              <a >
                <i class="fa fa-sitemap"></i> <span>Modulos</span>
                <i class="fa fa-angle-left pull-right"></i>
              </a>
                <ul class="treeview-menu" style="display: block;">
            
                <li>
                  <a><i class="fa fa-black-tie"></i> Gerenciales<i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                    
                    <li>
                      <a ><i class="fa fa-newspaper-o"></i> Informes<i class="fa fa-angle-left pull-right"></i></a>
                      <ul class="treeview-menu">
                        
                        <li><a href="#/inf_ventas_grupo"><i class="fa fa-circle-o"></i> Ventas por Grupo</a></li>
<!--                        <li><a href="#/inf_ventas_caja"><i class="fa fa-circle-o"></i> Ventas por Caja</a></li>-->
                        <li><a href="#/inf_ventas_ubicacion"><i class="fa fa-circle-o"></i> Ventas por Ubicacion</a></li>
                        
<!--                     <li><a href="#"><i class="fa fa-circle-o"></i>Ganancias por Grupo</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i> Ganancias por Dia</a></li>-->
                        <li><a href="#/inf_ventas_dia"><i class="fa fa-circle-o"></i> Ventas por Dia</a></li>
                        <li><a href="#/inf_cobros"><i class="fa fa-circle-o"></i> Informe de Cobro</a></li>
                        
                      </ul>
                    </li>
                    
                    
<!--                     <li>
                      <a ><i class="fa fa-bar-chart"></i> Graficos<i class="fa fa-angle-left pull-right"></i></a>
                      <ul class="treeview-menu">
                        <li><a href="#"><i class="fa fa-circle-o"></i>Movimiento por Valor</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i> Movimiento por Cantidad</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i> Cobros</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i> Ventas por Vendedor</a></li>
                        
                         <li><a href="#"><i class="fa fa-circle-o"></i>Ventas por Grupo</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i> Ventas por Caja</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i> Ventas por Ubicacion</a></li>
                        
                      </ul>
                    </li>-->
                    
                    
                  </ul>
                </li>
                
                <li>
                  <a ><i class="fa fa-archive"></i> Inventario<i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                    
                    <li>
                      <a ><i class="fa fa-exchange"></i> Movimientos<i class="fa fa-angle-left pull-right"></i></a>
                      <ul class="treeview-menu">
                        <li><a href="#/ingreso_items/"><i class="fa fa-circle-o"></i>Ingreso de Items</a></li>
                        <li><a onclick="OrientarIngreso()"><i class="fa fa-circle-o"></i>Ingreso  Bodega</a></li>
                        <li><a onclick="OrientarEgreso()"><i class="fa fa-circle-o"></i>Egreso  Bodega</a></li>
                        <li><a href="#/inventario"><i class="fa fa-circle-o"></i>Data Collector</a></li>
                      </ul>
                    </li>
                    
                    
                    
                    <li>
                      <a ><i class="fa fa-newspaper-o"></i> Informes<i class="fa fa-angle-left pull-right"></i></a>
                      <ul class="treeview-menu">
                        <li><a href="#/informe_existencias"><i class="fa fa-circle-o"></i>Existencias</a></li>
                        <li><a href="#/informe_precios"><i class="fa fa-circle-o"></i>Precios</a></li>
<!--                        <li><a href="#"><i class="fa fa-circle-o"></i>Costo de Inventario</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Inventario Inicial</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Ingresos de Bodega</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Egresos de Bodega</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Kardex de Producto</a></li>-->
                      </ul>
                    </li>
                    
                       
                    
                    
                    
                  </ul>
                </li>
                
<!--                <li>
                  <a ><i class="fa fa-bank"></i> Activos<i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                        <li><a href="#"><i class="fa fa-circle-o"></i>Activos x Grupo</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Activos x Ubicaciones</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Activos x Custodios</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Kardex de Activos</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Depreciacion Activos Gen</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Depreciacion Activos Ind</a></li>
                  </ul>
                </li>
                -->
                <li>
                  <a ><i class="fa fa-money"></i> Facturacion<i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                    
                    <li>
                      <a ><i class="fa fa-dollar"></i> Ventas<i class="fa fa-angle-left pull-right"></i></a>
                      <ul class="treeview-menu">
                        
                        <li>
                            <a ><i class="fa fa-dollar"></i> Movimientos<i class="fa fa-angle-left pull-right"></i></a>
                            <ul class="treeview-menu">
                                <li><a onclick="OrientarProforma()"><i class="fa fa-circle-o"></i>Registro de proforma</a></li>
                                <li><a onclick="OrientarVenta()"><i class="fa fa-circle-o"></i>Registro de Venta</a></li>
<!--                                <li><a href="#"><i class="fa fa-circle-o"></i>Arqueo Ventas x Producto </a></li>
                                <li><a href="#"><i class="fa fa-circle-o"></i>Ventas x Grupo</a></li>
                                 <li><a href="#"><i class="fa fa-circle-o"></i>Ventas x Ubicacion</a></li>
                                <li><a href="#"><i class="fa fa-circle-o"></i>Ventas x Credito/Contado </a></li>
                                <li><a href="#"><i class="fa fa-circle-o"></i>Ventas x caja</a></li>-->
                            </ul>
                        </li>
                          
                         <li>
                            <a ><i class="fa fa-newspaper-o"></i> Informes<i class="fa fa-angle-left pull-right"></i></a>
                            <ul class="treeview-menu">
                                  <li><a href="#/informe_ventas_general"><i class="fa fa-circle-o"></i>Ventas General</a></li>
                                  <li><a href="#/informe_ventas_vendedor"><i class="fa fa-circle-o"></i>Ventas por Vendedor</a></li>
                                  <li><a href="#/informe_pedidos_vendedor"><i class="fa fa-circle-o"></i>Pedidos por Vendedor</a></li> 
                                  <li><a href="#/informe_ventas_cliente"><i class="fa fa-circle-o"></i>Ventas por Cliente</a></li> 
                            </ul>
                        </li>   
                        
                        
<!--                         <li>
                            <a ><i class="fa fa-dollar"></i> Ganancias<i class="fa fa-angle-left pull-right"></i></a>
                            <ul class="treeview-menu">
                                <li><a href="#"><i class="fa fa-circle-o"></i>Ventas x Ganancia</a></li>
                                <li><a href="#"><i class="fa fa-circle-o"></i>Ventas x Producto</a></li>
                            </ul>
                        </li>   -->
                          
<!--                        <li><a href="#"><i class="fa fa-circle-o"></i>Rotacion Inventario</a></li>
                        -->
                     
                        
                      </ul>
                    </li>
                    
                    
                     <li>
                      <a ><i class="fa fa-euro"></i> Compras<i class="fa fa-angle-left pull-right"></i></a>
                      <ul class="treeview-menu">
                          <li><a onclick="OrientarCompra()"><i class="fa fa-circle-o"></i>Registro compra</a></li>
                    <!--<li><a href="#"><i class="fa fa-circle-o"></i>Compras General</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Arqueo Comp x Prod</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Compras x Gpo/Linea </a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Dev en Compra</a></li>-->
                      </ul>
                    </li>
                    
                    
                    
                  </ul>
                </li>
                
                <li>
                  <a ><i class="fa fa-cc-visa"></i> Cartera<i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                    
                    <li>
                      <a ><i class="fa fa-thumbs-o-up"></i> Cuentas por Cobrar<i class="fa fa-angle-left pull-right"></i></a>
                      <ul class="treeview-menu">
                        <li><a href="#/ingreso_clientes"><i class="fa fa-circle-o"></i>Clientes</a></li>
                        <li><a href="#/cobranza"><i class="fa fa-circle-o"></i>Registro de Cobros</a></li>
                        
                         <li>
                            <a ><i class="fa fa-newspaper-o"></i> Informes<i class="fa fa-angle-left pull-right"></i></a>
                            <ul class="treeview-menu">
                                        <li><a href="#"><i class="fa fa-circle-o"></i>Cliente</a></li>
                                        <li><a href="#/informe_Kardex_Cliente"><i class="fa fa-circle-o"></i>Kardex de Cliente</a></li>
                                        <li><a href="#/CXC"><i class="fa fa-circle-o"></i>Facturas x Cobrar</a></li>
                                        <li><a href="#/informe_Ingreso_Diario_Caja"><i class="fa fa-circle-o"></i>Ingreso Diario de Caja</a></li>
<!--                                        <li><a href="#"><i class="fa fa-circle-o"></i>Facturas x Cobrar x Vendedor</a></li>            -->
                            </ul>
                        </li>
                      </ul>
                    </li>
                    
                    
                     <li>
                      <a ><i class="fa fa-thumbs-o-down"></i> Cuentas por Pagar<i class="fa fa-angle-left pull-right"></i></a>
                      <ul class="treeview-menu">
                        <li><a href="#/proveedores"><i class="fa fa-circle-o"></i>Proveedores</a></li>
                        <li><a href="#/informe_proveedores"><i class="fa fa-circle-o"></i>Informe Proveedores</a></li>
<!--                        <li><a href="#"><i class="fa fa-circle-o"></i>Proveedores</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Kardex x Proveedor</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Cuentas x Pagar</a></li>                        -->
                      </ul>
                    </li>
                    
                    
                    
                  </ul>
                </li>
                
<!--                <li>
                  <a ><i class="fa fa-balance-scale"></i> Presupuesto<i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                        <li><a href="#"><i class="fa fa-circle-o"></i>Catalogo Presupuestario</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Mayorizacion Presupuestaria</a></li>
                        <li>
                      <a ><i class="fa fa-battery-half"></i> Est. Presupuestarios<i class="fa fa-angle-left pull-right"></i></a>
                      <ul class="treeview-menu">
                        <li><a href="#"><i class="fa fa-circle-o"></i>Ced Pres de Ingresos</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Ced Pres de Gastos</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Estado de Ejecucion Pres</a></li>
                      </ul>
                    </li>
                    
                    
                    
                  </ul>
                </li>
           
                <li>
                  <a ><i class="fa fa-pie-chart"></i> Contabilidad<i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                        <li><a href="#"><i class="fa fa-circle-o"></i>Registro Transacciones</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Plan de Cuentas</a></li>
                        <li>
                         <a ><i class="fa fa-book"></i> Libro Diario<i class="fa fa-angle-left pull-right"></i></a>
                         <ul class="treeview-menu">
                             <li><a href="#"><i class="fa fa-circle-o"></i>Por Asiento</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>Por Fecha</a></li>
                         </ul>
                        </li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Mayorizacion</a></li>
                         <li>
                         <a ><i class="fa fa-hourglass-half"></i>Estado Financiero<i class="fa fa-angle-left pull-right"></i></a>
                         <ul class="treeview-menu">
                             <li><a href="#"><i class="fa fa-circle-o"></i>Balance  Sumas y Saldos</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>Balance General</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>Est Perdidas Y Ganancias</a></li>
                             <li><a href="#"><i class="fa fa-circle-o"></i>Est Flujo en Efectivo</a></li>
                         </ul>
                        </li>
                  </ul>
                </li>
                
                <li>
                  <a ><i class="fa fa-diamond"></i> Tesoreria<i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                        <li><a href="#"><i class="fa fa-circle-o"></i>Comprobante de Egreso</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Libro Banco</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Comprobantes</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Consulta de Cheques</a></li>
                  </ul>
                </li>
                
                <li>
                  <a ><i class="fa fa-group"></i> Rol de Pagos<i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                        <li><a href="#"><i class="fa fa-circle-o"></i>Nomina de empleados</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i>Roles Gen x Empleado</a></li>
                  </ul>
                </li>-->
                
              </ul>
            </li>
           
          </ul>
        </section>
        <!-- /.sidebar -->
      </aside>

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>
            
            <small></small>
          </h1>
          <ol class="breadcrumb">
            <li><i class="fa fa-home"></i>Inicio</li>
          </ol>
        </section>

        <!-- Main content -->
        <section class="content" ng-view>
        

        </section><!-- /.content -->
      </div><!-- /.content-wrapper -->
      <footer class="main-footer">
        <div class="pull-right hidden-xs">
          <b>Version</b> 2.0
        </div>
        <strong>Copyright &copy; 2015-2016 <a href="http://sistemasgenesis.com.ec/">Sistemas Informaticos Genesis</a>.</strong> All rights reserved.
      </footer>

      <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Create the tabs -->
        <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
          <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
          <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <!-- Home tab content -->
          <div class="tab-pane" id="control-sidebar-home-tab">
            <h3 class="control-sidebar-heading">Recent Activity</h3>
            <ul class="control-sidebar-menu">
              <li>
                <a href="javascript::;">
                  <i class="menu-icon fa fa-birthday-cake bg-red"></i>
                  <div class="menu-info">
                    <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>
                    <p>Will be 23 on April 24th</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript::;">
                  <i class="menu-icon fa fa-user bg-yellow"></i>
                  <div class="menu-info">
                    <h4 class="control-sidebar-subheading">Frodo Updated His Profile</h4>
                    <p>New phone +1(800)555-1234</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript::;">
                  <i class="menu-icon fa fa-envelope-o bg-light-blue"></i>
                  <div class="menu-info">
                    <h4 class="control-sidebar-subheading">Nora Joined Mailing List</h4>
                    <p>nora@example.com</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript::;">
                  <i class="menu-icon fa fa-file-code-o bg-green"></i>
                  <div class="menu-info">
                    <h4 class="control-sidebar-subheading">Cron Job 254 Executed</h4>
                    <p>Execution time 5 seconds</p>
                  </div>
                </a>
              </li>
            </ul><!-- /.control-sidebar-menu -->

            <h3 class="control-sidebar-heading">Tasks Progress</h3>
            <ul class="control-sidebar-menu">
              <li>
                <a href="javascript::;">
                  <h4 class="control-sidebar-subheading">
                    Custom Template Design
                    <span class="label label-danger pull-right">70%</span>
                  </h4>
                  <div class="progress progress-xxs">
                    <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript::;">
                  <h4 class="control-sidebar-subheading">
                    Update Resume
                    <span class="label label-success pull-right">95%</span>
                  </h4>
                  <div class="progress progress-xxs">
                    <div class="progress-bar progress-bar-success" style="width: 95%"></div>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript::;">
                  <h4 class="control-sidebar-subheading">
                    Laravel Integration
                    <span class="label label-warning pull-right">50%</span>
                  </h4>
                  <div class="progress progress-xxs">
                    <div class="progress-bar progress-bar-warning" style="width: 50%"></div>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript::;">
                  <h4 class="control-sidebar-subheading">
                    Back End Framework
                    <span class="label label-primary pull-right">68%</span>
                  </h4>
                  <div class="progress progress-xxs">
                    <div class="progress-bar progress-bar-primary" style="width: 68%"></div>
                  </div>
                </a>
              </li>
            </ul><!-- /.control-sidebar-menu -->

          </div><!-- /.tab-pane -->
          <!-- Stats tab content -->
          <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div><!-- /.tab-pane -->
          <!-- Settings tab content -->
          <div class="tab-pane" id="control-sidebar-settings-tab">
            <form method="post">
              <h3 class="control-sidebar-heading">General Settings</h3>
              <div class="form-group">
                <label class="control-sidebar-subheading">
                  Report panel usage
                  <input type="checkbox" class="pull-right" checked>
                </label>
                <p>
                  Some information about this general settings option
                </p>
              </div><!-- /.form-group -->

              <div class="form-group">
                <label class="control-sidebar-subheading">
                  Allow mail redirect
                  <input type="checkbox" class="pull-right" checked>
                </label>
                <p>
                  Other sets of options are available
                </p>
              </div><!-- /.form-group -->

              <div class="form-group">
                <label class="control-sidebar-subheading">
                  Expose author name in posts
                  <input type="checkbox" class="pull-right" checked>
                </label>
                <p>
                  Allow the user to show his name in blog posts
                </p>
              </div><!-- /.form-group -->

              <h3 class="control-sidebar-heading">Chat Settings</h3>

              <div class="form-group">
                <label class="control-sidebar-subheading">
                  Show me as online
                  <input type="checkbox" class="pull-right" checked>
                </label>
              </div><!-- /.form-group -->

              <div class="form-group">
                <label class="control-sidebar-subheading">
                  Turn off notifications
                  <input type="checkbox" class="pull-right">
                </label>
              </div><!-- /.form-group -->

              <div class="form-group">
                <label class="control-sidebar-subheading">
                  Delete chat history
                  <a href="javascript::;" class="text-red pull-right"><i class="fa fa-trash-o"></i></a>
                </label>
              </div><!-- /.form-group -->
            </form>
          </div><!-- /.tab-pane -->
        </div>
      </aside><!-- /.control-sidebar -->
      <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
      <div class="control-sidebar-bg"></div>
    </div><!-- ./wrapper -->

    <!-- jQuery 2.1.4 -->
    <script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- jQuery UI 1.11.4 -->
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
    <script>
      $.widget.bridge('uibutton', $.ui.button);
    </script>
    <!-- Bootstrap 3.3.5 -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
     
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <!-- <script src="plugins/morris/morris.min.js"></script>-->
    <!-- Sparkline -->
    <script src="plugins/sparkline/jquery.sparkline.min.js"></script>
    <!-- jvectormap -->
    <script src="plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
    <script src="plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
    <!-- jQuery Knob Chart -->
    <script src="plugins/knob/jquery.knob.js"></script>
    <!-- daterangepicker -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
    <script src="plugins/daterangepicker/daterangepicker.js"></script>
    <!-- datepicker -->
    <script src="plugins/datepicker/bootstrap-datepicker.js"></script>
    <!-- Bootstrap WYSIHTML5 -->
    <script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
    <!-- Slimscroll -->
    <script src="plugins/slimScroll/jquery.slimscroll.min.js"></script>
    <!-- FastClick -->
    <script src="plugins/fastclick/fastclick.min.js"></script>
    <!-- AdminLTE App -->
    <script src="dist/js/app.min.js"></script>
    <!-- AdminLTE dashboard demo (This is only for demo purposes) 
    <script src="dist/js/pages/dashboard.js"></script>-->
    <!-- AdminLTE for demo purposes -->
    <script src="dist/js/demo.js"></script>
    
    <script src="dist/js/angular/angular.min.js"></script>
    <script src="dist/js/angular/numeric-directive.js"></script>
    <script src="dist/js/angular/angular-route.min.js"></script>
    <script src="dist/js/angular/listadetareas.js"></script>
    <script type="text/javascript">
        
        function OrientarVenta()
        {  
           localStorage.setItem("P_V","V");
            
         if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i))
         {
             if(location.href.indexOf("#/registro_ProformaVenta")<0)
              location.href="#/registro_ProformaVenta";
            else
              location.reload();
         }
         else
         {
            if(location.href.indexOf("#/registro_ProformaVentaTabular")<0)
              location.href="#/registro_ProformaVentaTabular";
            else
              location.reload();
         }
           
       }
       
       function OrientarProforma()
       {  
            localStorage.setItem("P_V","P");
           
         if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i))
         {
              if(location.href.indexOf("#/registro_ProformaVenta")<0)
                location.href="#/registro_ProformaVenta";
            else
               location.reload(); 
         }
         else
         {
             if(location.href.indexOf("#/registro_ProformaVentaTabular")<0)
                location.href="#/registro_ProformaVentaTabular";
            else
               location.reload(); 
         }
          
       }
       
       
       
        function OrientarIngreso()
        {  
             localStorage.setItem("I_E","I");
            
         if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i))
         {
              if(location.href.indexOf("#/ingreso_bodega")<0)
            location.href="#/ingreso_bodega";
            else
             location.reload();
         }
          else
         {
             if(location.href.indexOf("#/ingreso_bodegaTabular")<0)
            location.href="#/ingreso_bodegaTabular";
            else
             location.reload();
         }
         
       }
       
        function OrientarEgreso()
        {  
            localStorage.setItem("I_E","E");
            
         if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i))
           {
              if(location.href.indexOf("#/ingreso_bodega")<0)
            location.href="#/ingreso_bodega";
            else
             location.reload();
         }
         else
         {
             if(location.href.indexOf("#/ingreso_bodegaTabular")<0)
               location.href="#/ingreso_bodegaTabular";
             else
               location.reload();
         }
          
       }
       
       
       function OrientarCompra()
        {  
         if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i))
            location.href="#/registro_compra";
         else
            location.href="#/registro_compraTabular";
       }
       
       $('#empresa').text(localStorage.getItem("nombre_empresa"))
       
    </script>
  </body>
</html>
