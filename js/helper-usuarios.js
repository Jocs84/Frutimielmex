
// *********************************************************************************
// ***
// *** HELPER-USUARIOS.JS contiene las cadenas de los elementos HTML que, una vez agregadas
// *** al DOM, mostrará los elementos que se necesitan agregar dinamicamente.
// *** Este archivo contiene los elementos siguientes:
// ***     -AGREGAR USUARIOS
// ***     -EDITAR USUARIOS
// ***     -ELIMINAR USUARIOS
// ***
// ***
// ***
// *********************************************************************************


var HTMLFormUsuario = '<form id = "%FORMULARIO%" action="" method="post"><div class="form-group"><label for="NomUsuario">Nombre Usuario</label><input type="text" class="form-control" name="NomUsuario" value=""></div><div class="form-group"><label for="ApUsuario">Apellido Paterno</label><input type"text" name="ApUsuario" class="form-control" value=""></div><div class="form-group"><label for="AmUsuario">Apellido Materno</label><input type="text" class="form-control" name="AmUsuario" value=""></div><div class="form-group"><label for="NickUsuario">Nick Usuario</label><input type="text" class="form-control" name="NickUsuario" value=""></div><div class="form-group"><label for="PassUsuario">Contraseña Usuario</label><input type="password" class="form-control" name="PassUsuario" value=""></div><div class="form-group"><input type="submit" class="btn btn-default boton" name="" value="Guardar"></div></form>';

// Variable que contiene la estructura del titulo para la sección Agregar Movilidad
// *Se inserta en el el contenedor #insertar-gestion
var HTMLAgregarUsuario = '<div id="agregarUsuario"><div><p class="destacado mas-font">Agregar Usuario</p></div></div>';

var HTMLEditarUsuario = '<div id="editarUsuario"><div><p class="destacado mas-font">Modificar Usuario</p></div></div>';

var HTMLModificarUsuario = '<div id="modificarUsuario"><div><p class="destacado mas-font">Modificar Usuario</p></div><form id="frmbuscUsu" action="" method="post"><div class="form-group"><label class="sr-only" for="buscarUsu">Buscar</label><input class="form-control" name="nickusuario" placeholder="Nick del Usuario" type="text"></div><div class="form-group"><input class="btn btn-default boton" name="" value="Buscar" type="submit"></div></form><table id="insBusqU" class="table table-hover"></table></div>';


var HTMLcontUsuarios = '<div id="cont-usuarios"><div><div class="cont-titulo-seg"><p class="titulo-segmento">Gestionar Usuarios</p></div></div></div>';
var HTMLcontGestionesUsu = '<div><div id="agr-gestiones-usu" class="col-md-5"></div><div id="insertar-gestion-usu" class="col-md-5 col-md-offset-2"></div></div>';
var HTMLgestUsuarios='<div class="contenedor-chico"><div><p class="destacado">Movimientos</p></div><div><button id="btnAgregarUsuario" class="btn btn-default boton">Agregar</button><button id="btnModificarUsuario" class="btn btn-default boton">Modificar</button><button id="btnEliminarUsuario" class="btn btn-default boton">Eliminar</button></div></div>';



var HTMLAlertaNoElementos = '<div class="alert alert-warning" role="alert"><strong>¡No se encontró %MENSAJE%!</strong> Asegurate de que esté bien escrito.</div>'

// Estructura de TABLE, en la que se desplegará los elementos de la busqueda de
// registros
// *insertar en .table .table-hover
// Cambiar %OPTION% por la opción que se desee realizar (eliminar o modificar)
var HTMLTablaBusquedaEdi = '<thead><td>Id</td><td>NickName</td><td>%OPTION%</td></thead><tbody id="insertarBusquedaU"></tbody>';

// Renglón o TR con la estructura para insertar un elemento que es posible editar
// a la tabla correspondiete
// Cambiar:
    // %IDUSU% por el ID del elemento
    // %NICKNAME% por el nombre del elemento
    // %CLASS% por la necesaria para manejar al elemento
var HTMLElementEncontradoEdUsu = '<tr><td>%IDUSU%</td><td>%NICKNAME%</td><td><a class="%CLASS%" href=""><img src="../img/edit.png" alt=""></a></td></tr>';


var HTMLEliminarUsuario = '<div id="eliminarUsuario"><div><p class="destacado mas-font">Eliminar Usuario</p></div><form id="frmbuscUsuEli" action="" method="post"><div class="form-group"><label class="sr-only" for="buscarUsuEli">Buscar</label><input class="form-control" name="nickusuario" placeholder="Nick del Usuario" type="text"></div><div class="form-group"><input class="btn btn-default boton" name="" value="Buscar" type="submit"></div></form><table id="insBusqUEli" class="table table-hover"></table></div>';


var HTMLAlertaNoElementosEli = '<div class="alert alert-warning" role="alert"><strong>¡No se encontró %MENSAJE%!</strong> Asegurate de que esté bien escrito.</div>'

// Estructura de TABLE, en la que se desplegará los elementos de la busqueda de
// registros
// *insertar en .table .table-hover
// Cambiar %OPTION% por la opción que se desee realizar (eliminar o modificar)
var HTMLTablaBusquedaEli = '<thead><td>Id</td><td>NickName</td><td>%OPTION%</td></thead><tbody id="insertarBusquedaUEli"></tbody>';

// Renglón o TR con la estructura para insertar un elemento que es posible editar
// a la tabla correspondiete
// Cambiar:
    // %IDUSU% por el ID del elemento
    // %NICKNAME% por el nombre del elemento
    // %CLASS% por la necesaria para manejar al elemento
var HTMLElementEncontradoEli = '<tr><td>%IDUSU%</td><td>%NICKNAME%</td><td><a class="%CLASS%" href=""><img src="../img/close.png" alt=""></a></td></tr>';
//var HTMLElementEncontradoEli = '<tr><td>%IDUSU%</td><td>%NICKNAME%</td><td><a data-toggle="modalUsu" data-target="#%MODALUSU%" class="%CLASS%" href=""><img src="../img/close.png" alt=""></a></td></tr>';

var HTMLAlertaNoElementosUsu = '<div class="alert alert-warning" role="alert"><strong>¡No se encontró %MENSAJE%!</strong> Asegurate de que esté bien escrito.</div>'
