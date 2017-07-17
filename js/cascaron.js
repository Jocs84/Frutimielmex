
// Elemento que contiene la estructura básica de la interfaz de
// alimentación en apiario
// *Agregar cont-gestiones después del ultimo hijo
var HTMLcontAlimentacion = '<div id="cont-alimentacion"><div><div class="cont-titulo-seg"><p class="titulo-segmento">Alimentación</p></div></div></div>';

// Elemento que contiene la interfaz de Gestión de Alimentos, preparacion
// e ingredientes
// *agregar los elementos que surjan de los botones en  #agr-gestiones
var HTMLcontGestiones = '<div><div id="agr-gestiones" class="col-md-5"></div><div id="insertar-gestion" class="col-md-5 col-md-offset-2"></div></div>';


// Elemento con los botones de gestionar alimentos:
// id de botones:
//     -btnAgregarAlimento
//     -btnModificiarAlimento
//     -btnEliminarAlimento
var HTMLgestAlimentos='<div class="contenedor-chico"><div><p class="destacado">Gestionar Alimentos</p></div><div><button id="btnAgregarAlimento" class="btn btn-default boton">Agregar</button><button id="btnModificiarAlimento" class="btn btn-default boton">Modificar</button><button id="btnEliminarAlimento" class="btn btn-default boton">Eliminar</button></div></div>';

// Elemento con los botones de gestionar preparaciones.
// id de botones:
//     -btnAgregarPreparacion
//     -btnModificarPreparacion
//     -btnEliminarPreparacion
var HTMLgestPreparaciones='<div class="contenedor-chico"><div><p class="destacado">Gestionar Preparaciones</p></div><div><button id="btnAgregarPreparacion" class="btn btn-default boton">Agregar</button><button id="btnModificarPreparacion" class="btn btn-default boton">Modificar</button><button id="btnEliminarPreparacion" class="btn btn-default boton">Eliminar</button></div></div>';

// Elemento con los botones de gestionar ingredientes.
// id de botones:
//     -btnAgregarIngrediente
//     -btnModificarIngrediente
//     -btnEliminarIngrediente
var HTMLgestIngredinetes = '<div class="contenedor-chico"><div><p class="destacado">Gestionar Ingredientes</p></div><div><button id="btnAgregarIngrediente" class="btn btn-default boton">Agregar</button><button id="btnModificarIngrediente" class="btn btn-default boton">Modificar</button><button id="btnEliminarIngrediente" class="btn btn-default boton">Eliminar</button></div></div>';













// **** VARIABLES PARA ALIMENTOS   *****

// AGREGAR ALIMENTO
// Variables para agregar el formulario para Agregar alimento.
// *Se agrega este elemento al contenedor #insertar-gestion
var HTMLAgregarAlimento = '<div id="agregarAlimento"><div><p class="destacado mas-font">Agregar alimento</p></div></div>';

// Variable para insertar el formulario para agregar alimento, el cual desplegará:
//     *NombreAlimento
//     *Consistencia
//     *UnidadMedicion
//     *FechaCaducidad
//     *tipoAlimento
var HTMLFormAlimento = '<form id="%FORMULARIO%" action="" method="POST"><div class="form-group"><label for="NombreAlimento">Nombre</label><input type="text" class="form-control" name="nombreAli" value=""></div><div class="form-group"><label for="Consistencia">Consistencia</label><select class="form-control" name="Consistencia"><option value="Solida">Solida</option><option value="Liquida">Liquída</option></select></div><div class="form-group"><label for="UnidadMedicion">Unidad de medición</label><select id="unidadMedicion" class="form-control" name="UnidadMedicion"></select></div><div class="form-group"><label for="anioCad">Fecha de caducidad</label><input type="date" class="form-control" name="anioCad" value=""></div><div id="seleccionantinatu" class="form-group"></div><div id="artinatu" class="form-group"></div><div class="form-group"><input type="submit" class = "btn btn-default boton" name="" value="Guarda"></div></form>';

// var HTMLAgregarSelect = '<select name="%data%" class="form-control">xxx</select>';
var HTMLAgregarOptionSelect = '<option value="**">%data%</option>';

// SELECT para seleccionar el tipo de alimento que se agregará.
// *Se agrega este elemento en el contenedor #seleccionantinatu
var HTMLSelectTipoAlimentacion = '<label for="tipo">Tipo</label><select id="tipoAlimt" class="form-control" name="tipo"><option value="Artificial">Artificial</option><option value="Natural">Natural</option></select>';
// LABEL e INPUT que se insertará en el contenedor #artinatu si es que se seleccionó
// un alimento del tipo natural.
var HTMLAgregarNatural = '<div class="form-group"><label for="extra">Lugar de obtención</label><select id="LugarObtencion" class="form-control" name="extra"></select></div>';
// LABEL e INPUT que se insertará en el contenedor #artinatu si es que se seleccionó
// un alimento del tipo artificial.
var HTMLAgregarArtificial = '<div class="form-group"><label for="extra">Tipo de alimento</label><select id="LugarObtencion" class="form-control" name="extra"></select></div>';


// *********************************************** MODIFICAR ALIMENTO
// Variable que contiene toda la estructura para buscar el elemento a modificar
// *Se inserta en el el contenedor #insertar-gestion
var HTMLModificarAlimento = '<div id="modificarrAlimento"><div><p class="destacado mas-font">Modificar alimento</p></div><form id="formBuscar" action="" method="POST"><div class="form-group"><label class="sr-only" for="buscarAlimento">Buscar</label><input type="text" class="form-control" name="buscarAlimento" placeholder="Nombre del alimento"></div><div class="form-group"><input id="btnEnviar" type="submit" class = "btn btn-default boton" name="" value="Buscar"></div></form><table id="insBusq" class="table table-striped"></table></div>';

var HTMLEditarAlimento = '<div id="agregarAlimento"><div><p class="destacado mas-font">Editar alimento</p></div></div>';


// *********************************************** ELIMINAR ALIMENTO

var HTMLEliminarAlimento = '<div id="eliminarAlimento"><div><p class="destacado mas-font">Eliminar alimento</p></div><form id="formBuscarEl" action="../php/buscarPorNombre.php" method="POST"><div class="form-group"><label class="sr-only" for="buscarAlimento">Buscar</label><input type="text" class="form-control" name="buscarAlimento" placeholder="Nombre"></div><div class="form-group"><input type="submit" class = "btn btn-default boton" name="" value="Buscar"></div></form><table id="insBusq" class="table table-striped"></table></div>';

var HTMLElementEncontradoEl = '<tr><td>%IDALI%</td><td>%NOMBRE%</td><td>%FECHA%</td><td><a class="%CLASS%" href=""><img src="../img/close.png" alt=""></a></td></tr>';

var HTMLEliminarConf = '<tr class="alert alert-danger" role="alert"><td>  </td><td>¿Eliminar este %MENSAJE%</td><td><button type="button" data-dismiss="modal" class="btn btn-primary btn-danger eliElem">Eliminar</button></td><td><button type="button" data-dismiss="modal" class="btn btn-danger cancelarAccion">Cancelar</button></td></tr>';





















// **** VARIABLES PARA INGREDIENTES   *****

var HTMLAgregarIngrediente = '<div id="agregarIngrediente"><div><p class="destacado mas-font">Agregar ingrediente</p></div></div>';

var HTMLFormIngrediente = '<form id = "%FORMULARIO%" action="" method="post"><div class="form-group"><label for="NombreIngrediente">Nombre</label><input type="text" class="form-control" name="NombreIngrediente" value=""></div><div class="form-group"><label for="UnidadMedida">Unidad de medida</label><select name="UnidadMedida" id = "UnidadMedida" class="form-control"></select></div><div class="form-group"><label for="PrecioIngrediente">Precio</label><input type="number" name="PrecioIngrediente" min="0.5" class="form-control" value=""></div><div class="form-group"><label for="CadIngrediente">Fecha de caducidad</label><input type="date" class="form-control" name="CadIngrediente" value="" placeholder="DD-MM-AAAA"></div><div class="form-group"><input type="submit" class = "btn btn-default boton" name="" value="Guardar"></div></form>';

var HTMLModificarIngrediente = '<div id="modificarIngrediente"><div><p class="destacado mas-font">Modificar ingrediente</p></div><form id="frmbuscIng" action="" method="post"><div class="form-group"><label class="sr-only" for="buscarIng">Buscar</label><input class="form-control" name="buscarIng" placeholder="Nombre" type="text"></div><div class="form-group"><input class="btn btn-default boton" name="" value="Buscar" type="submit"></div></form><table id="insBusq" class="table table-striped"></table></div>';

var HTMLEditarIngrediente = '<div id="agregarIngrediente"><div><p class="destacado mas-font">Editar ingrediente</p></div></div>';


// *****************
// LA TABLA DE BUSQUEDA :D
// *insertar en .table .table-striped
var HTMLTablaBusqueda = '<thead><td>ID</td><td>Nombre</td><td>Fecha cad</td><td>%OPTION%</td></thead><tbody id="insertarBusqueda"></tbody>';

// *insertar en #insertarBusqueda
var HTMLElementEncontradoEd = '<tr><td>%IDALI%</td><td>%NOMBRE%</td><td>%FECHA%</td><td><a class="%CLASS%" href=""><img src="../img/edit.png" alt=""></a></td></tr>';


var HTMLAlertaNoElementos = '<div class="alert alert-warning" role="alert"><strong>¡No se encontró %MENSAJE%!</strong> Asegurate de que esté bien escrito.</div>'



var HTMLEliminarIngrediente = '<div id="eliminarIngrediente"><div><p class="destacado mas-font">Eliminar ingrediente</p></div><form id="frmbuscInge" action="" method="post"><div class="form-group"><label class="sr-only" for="buscarAli">Buscar</label><input type="text" class="form-control" name="buscarIng" placeholder="Nombre"></div><div class="form-group"><input type="submit" class = "btn btn-default boton" name="" value="Buscar"></div></form><table id="insBusq" class="table table-striped"></table></div>';
















//
//
//
// var HTMLAgregarPreparacion = '
// <div id="agregarPreparacion">
//     <div>
//         <p class="destacado mas-font">Agregar preparacion</p>
//     </div>
//     <form action="" method="post">
//         <div class="form-group">
//             <label for="nombreAli">Nombre alimento</label>
//             <select name="consAli" class="form-control">
//                <option value="1">Torta 1</option>
//                <option value="2">Torta proteínica</option>
//             </select>
//         </div>
//         <div class="form-group">
//             <label for="tipoAli">Empleado</label>
//             <select name="tipoAli" class="form-control">
//                <option value="1">Rogelio Flores</option>
//                <option value="2">Saul Santos</option>
//             </select>
//         </div>
//         <div class="form-group">
//             <label for="anioCad">Fecha de preparación</label>
//             <input type="date" class="form-control" name="anioCad" value="">
//         </div>
//         <div class="form-group">
//             <label for="anioCad">Fecha de caducidad</label>
//             <input type="date" class="form-control" name="anioCad" value="">
//         </div>
//         <div class="form-group">
//             <button type="button" class="btn btn-default boton" name="button">Agregar ingredientes</button>
//         </div>
//
//         <div id ="add-opciones">
//             <div class="form-group">
//                 <label for="anioCad">Ingrediente</label>
//                 <select name="tipoAli" class="form-control">
//                    <option value="1">Azucar</option>
//                    <option value="2">Leche de soya</option>
//                 </select>
//             </div>
//             <div class="form-group">
//                 <label for="anioCad">Cantidad</label>
//                 <input type="text" class="form-control" name="" value="">
//             </div>
//         </div>
//
//
//         <div class="form-group">
//             <input type="submit" class = "btn btn-default boton" name="" value="Guarda">
//         </div>
//
//     </form>
// </div>
// ';
//
//
// var HTMLEliminarPreparacion = '
// <div id="eliminarAlimento">
//     <div>
//         <p class="destacado mas-font">Eliminar preparación</p>
//     </div>
//     <form action="" method="post">
//         <div class="form-group">
//             <label class="sr-only" for="buscarAli">Buscar</label>
//             <input type="text" class="form-control" name="buscarAli" placeholder="Nombre">
//         </div>
//         <div class="form-group">
//             <input type="submit" class = "btn btn-default boton" name="" value="Buscar">
//         </div>
//     </form>
//     <table class="table table-striped">
//         <thead>
//             <td>Nombre</td>
//             <td>Fecha prep</td>
//             <td>Eliminar</td>
//         </thead>
//         <tbody id="insertarBusqueda">
//             <tr>
//                 <td>Jarabe 1</td>
//                 <td>15/05/2017</td>
//                 <td><img src="../img/close.png" alt=""></td>
//             </tr>
//             <tr>
//                 <td>Jarabe más miel</td>
//                 <td>18/05/2017</td>
//                 <td><img src="../img/close.png" alt=""></td>
//             </tr>
//         </tbody>
//     </table>
// </div>
// ';
//
//
// var HTMLModificarPreparacion = '
// <div id="modificarrAlimento">
//     <div>
//         <p class="destacado mas-font">Modificar alimento</p>
//     </div>
//     <form action="" method="post">
//         <div class="form-group">
//             <label class="sr-only" for="buscarAli">Buscar</label>
//             <input type="text" class="form-control" name="buscarAli" placeholder="Nombre">
//         </div>
//         <div class="form-group">
//             <input type="submit" class = "btn btn-default boton" name="" value="Buscar">
//         </div>
//     </form>
//     <table class="table table-striped">
//         <thead>
//             <td>Nombre</td>
//             <td>Fecha cad</td>
//             <td>Modificar</td>
//         </thead>
//         <tbody id="insertarBusqueda">
//             <tr>
//                 <td>Jarabe 1</td>
//                 <td>15/05/2017</td>
//                 <td><img src="../img/edit.png" alt=""></td>
//             </tr>
//             <tr>
//                 <td>Jarabe más miel</td>
//                 <td>18/05/2017</td>
//                 <td><img src="../img/edit.png" alt=""></td>
//             </tr>
//         </tbody>
//     </table>
// </div>
// ';
//
//
// var HTMLModificarPreparacion2 = '
// <div id="modificarrAlimento">
//     <div>
//         <p class="destacado mas-font">Modificar Preparacion</p>
//     </div>
//     <form action="" method="post">
//         <div class="form-group">
//             <label for="nombreAli">Nombre alimento</label>
//             <input type="text"class="form-control" name="" value="Jarabe más miel">
//         </div>
//         <div class="form-group">
//             <label for="tipoAli">Empleado</label>
//             <input type="text"class="form-control" name="" value="Rogelio Flores">
//         </div>
//         <div class="form-group">
//             <label for="anioCad">Fecha de preparación</label>
//             <input type="date" class="form-control" name="anioCad" value="">
//         </div>
//         <div class="form-group">
//             <label for="anioCad">Fecha de caducidad</label>
//             <input type="date" class="form-control" name="anioCad" value="">
//         </div>
//         <div class="form-group">
//             <p class="destacado">Ingredientes</p>
//         </div>
//
//         <div id ="add-opciones">
//             <div class="form-group">
//                 <label for="anioCad">Nombre</label>
//                 <input type="text" class="form-control" name="anioCad" value="Miel">
//
//             </div>
//             <div class="form-group">
//                 <label for="anioCad">Cantidad</label>
//                 <input type="text" class="form-control" name="" value="2">
//             </div>
//             <div class="form-group">
//                 <label for="anioCad">Nombre</label>
//                 <input type="text" class="form-control" name="anioCad" value="Agua">
//
//             </div>
//             <div class="form-group">
//                 <label for="anioCad">Cantidad</label>
//                 <input type="text" class="form-control" name="" value="1">
//             </div>
//         </div>
//
//
//         <div class="form-group">
//             <input type="submit" class = "btn btn-default boton" name="" value="Guarda">
//         </div>
//
//     </form>
// </div>
// ';
//
//








//
