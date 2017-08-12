
// *********************************************************************************
// ***
// *** HELPER-APIARIOS.JS contiene las cadenas de los elementos HTML que, una vez agregadas
// *** al DOM, mostrará los elementos que se necesitan agregar dinamicamente.
// *** Este archivo contiene los elementos siguientes:
// ***     -Gestion para la alimentación
// ***
// ***
// ***
// ***
// ***
// *********************************************************************************


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




//
// **************************************
// ***
// *** ELEMENTOS GENERALES
// ***
// **************************************

// OPTION para insertar a cualquier SELECT
// Cambiar ** por el valor requerido y
// %data% por la cadena que se requiera para dicho valor
var HTMLAgregarOptionSelect = '<option value="**">%data%</option>';


// Estructura de TABLE, en la que se desplegará los elementos de la busqueda de
// registros
// *insertar en .table .table-striped
// Cambiar %OPTION% por la opción que se desee realizar (eliminar o modificar)
var HTMLTablaBusqueda = '<thead><td>ID</td><td>Nombre</td><td>Fecha cad</td><td>%OPTION%</td></thead><tbody id="insertarBusqueda"></tbody>';

// Renglón o TR con la estructura para insertar un elemento que es posible editar
// a la tabla correspondiete
// Cambiar:
    // %IDALI% por el ID del elemento
    // %NOMBRE% por el nombre del elemento
    // %FECHA% por la fecha de caducidad del elemento
    // %CLASS% por la necesaria para manejar al elemento
var HTMLElementEncontradoEd = '<tr><td>%IDALI%</td><td>%NOMBRE%</td><td>%FECHA%</td><td><a class="%CLASS%" href=""><img src="../img/edit.png" alt=""></a></td></tr>';

// Renglón o TR con la estructura para insertar un elemento que es posible Eliminar
// a la tabla correspondiete
// Cambiar:
    // %IDALI% por el ID del elemento
    // %NOMBRE% por el nombre del elemento
    // %FECHA% por la fecha de caducidad del elemento
    // %CLASS% por la necesaria para manejar al elemento
var HTMLElementEncontradoEl = '<tr><td>%IDALI%</td><td>%NOMBRE%</td><td>%FECHA%</td><td><a class="%CLASS%" href=""><img src="../img/close.png" alt=""></a></td></tr>';


var HTMLAlertaNoElementos = '<div class="alert alert-warning" role="alert"><strong>¡No se encontró %MENSAJE%!</strong> Asegurate de que esté bien escrito.</div>'
var HTMLEliminarConf = '<tr class="alert alert-danger" role="alert"><td>  </td><td>¿Eliminar este %MENSAJE%</td><td><button type="button" data-dismiss="modal" class="btn btn-primary btn-danger eliElem">Eliminar</button></td><td><button type="button" data-dismiss="modal" class="btn btn-danger cancelarAccion">Cancelar</button></td></tr>';





// **************************************
// ***
// *** ELEMENTOS PARA GESTIONAR ALIMENTACIÓN
// ***     Agregar alimentos
// ***
// **************************************

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

// SELECT para seleccionar el tipo de alimento que se agregará.
// *Se agrega este elemento en el contenedor #seleccionantinatu
var HTMLSelectTipoAlimentacion = '<label for="tipo">Tipo</label><select id="tipoAlimt" class="form-control" name="tipo"><option value="Artificial">Artificial</option><option value="Natural">Natural</option></select>';

// LABEL e INPUT que se insertará en el contenedor #artinatu si es que se seleccionó
// un alimento del tipo natural.
var HTMLAgregarNatural = '<div class="form-group"><label for="extra">Lugar de obtención</label><select id="LugarObtencion" class="form-control" name="extra"></select></div>';

// LABEL e INPUT que se insertará en el contenedor #artinatu si es que se seleccionó
// un alimento del tipo artificial.
var HTMLAgregarArtificial = '<div class="form-group"><label for="extra">Tipo de alimento</label><select id="LugarObtencion" class="form-control" name="extra"></select></div>';


// **************************************
// ***
// *** ELEMENTOS PARA GESTIONAR ALIMENTACIÓN
// ***     Modificar alimentos
// ***
// **************************************

// Variable que contiene toda la estructura para buscar el elemento a modificar
// *Se inserta en el el contenedor #insertar-gestion
var HTMLModificarAlimento = '<div id="modificarrAlimento"><div><p class="destacado mas-font">Modificar alimento</p></div><form id="formBuscar" action="" method="POST"><div class="form-group"><label class="sr-only" for="buscarAlimento">Buscar</label><input type="text" class="form-control" name="nombre" placeholder="Nombre del alimento"></div><div class="form-group"><input id="btnEnviar" type="submit" class = "btn btn-default boton" name="" value="Buscar"></div></form><table id="insBusq" class="table table-striped"></table></div>';

// Variable que el encabezado del formulario cuando este servirá para editar
// la información del alimento
// *Se inserta en el el contenedor #insertar-gestion
var HTMLEditarAlimento = '<div id="agregarAlimento"><div><p class="destacado mas-font">Editar alimento</p></div></div>';


// **************************************
// ***
// *** ELEMENTOS PARA GESTIONAR ALIMENTACIÓN
// ***     Eliminar alimentos
// ***
// **************************************

// Variable que contiene toda la estructura para buscar el elemento a eliminar
// *Se inserta en el el contenedor #insertar-gestion
var HTMLEliminarAlimento = '<div id="eliminarAlimento"><div><p class="destacado mas-font">Eliminar alimento</p></div><form id="formBuscarEl" action="" method="POST"><div class="form-group"><label class="sr-only" for="nombre">Buscar</label><input type="text" class="form-control" name="nombre" placeholder="Nombre"></div><div class="form-group"><input type="submit" class = "btn btn-default boton" name="" value="Buscar"></div></form><table id="insBusq" class="table table-striped"></table></div>';







// **************************************
// ***
// *** ELEMENTOS PARA GESTIONAR ALIMENTACIÓN
// ***     Agregar ingredientes
// ***
// **************************************

// Variable que contiene la estructura del titulo para la sección Agregar Ingrediente
// *Se inserta en el el contenedor #insertar-gestion
var HTMLAgregarIngrediente = '<div id="agregarIngrediente"><div><p class="destacado mas-font">Agregar ingrediente</p></div></div>';

// Variable que contiene la estructura FORM para agregar ingrediente
// *Se inserta en el el contenedor #insertar-gestion
var HTMLFormIngrediente = '<form id = "%FORMULARIO%" action="" method="post"><div class="form-group"><label for="NombreIngrediente">Nombre</label><input type="text" class="form-control" name="NombreIngrediente" value=""></div><div class="form-group"><label for="UnidadMedida">Unidad de medida</label><select name="UnidadMedida" id = "UnidadMedida" class="form-control"></select></div><div class="form-group"><label for="PrecioIngrediente">Precio</label><input type="number" name="PrecioIngrediente" min="0.5" class="form-control" value=""></div><div class="form-group"><label for="CadIngrediente">Fecha de caducidad</label><input type="date" class="form-control" name="CadIngrediente" value="" placeholder="DD-MM-AAAA"></div><div class="form-group"><input type="submit" class = "btn btn-default boton" name="" value="Guardar"></div></form>';



// **************************************
// ***
// *** ELEMENTOS PARA GESTIONAR ALIMENTACIÓN
// ***     Modificar ingredientes
// ***
// **************************************

// Variable que contiene toda la estructura para buscar el ingrediente a modificar
// *Se inserta en el el contenedor #insertar-gestion
var HTMLModificarIngrediente = '<div id="modificarIngrediente"><div><p class="destacado mas-font">Modificar ingrediente</p></div><form id="frmbuscIng" action="" method="post"><div class="form-group"><label class="sr-only" for="buscarIng">Buscar</label><input class="form-control" name="nombre" placeholder="Nombre del ingrediente" type="text"></div><div class="form-group"><input class="btn btn-default boton" name="" value="Buscar" type="submit"></div></form><table id="insBusq" class="table table-striped"></table></div>';

// Variable que contiene la estructura del titulo para la sección modificar Ingrediente
// *Se inserta en el el contenedor #insertar-gestion
var HTMLEditarIngrediente = '<div id="agregarIngrediente"><div><p class="destacado mas-font">Modificar ingrediente</p></div></div>';



// **************************************
// ***
// *** ELEMENTOS PARA GESTIONAR ALIMENTACIÓN
// ***     Eliminar ingredientes
// ***
// **************************************

// Variable que contiene toda la estructura para buscar el ingrediente a eliminar
// *Se inserta en el el contenedor #insertar-gestion
var HTMLEliminarIngrediente = '<div id="eliminarIngrediente"><div><p class="destacado mas-font">Eliminar ingrediente</p></div><form id="frmbuscInge" action="" method="post"><div class="form-group"><label class="sr-only" for="buscarAli">Buscar</label><input type="text" class="form-control" name="nombre" placeholder="Nombre"></div><div class="form-group"><input type="submit" class = "btn btn-default boton" name="" value="Buscar"></div></form><table id="insBusq" class="table table-striped"></table></div>';





// **************************************
// ***
// *** ELEMENTOS PARA GESTIONAR ALIMENTACIÓN
// ***     Agregar preparacion
// ***
// **************************************

// Variable que contiene la estructura del título de la sección
// *Se inserta en el el contenedor #insertar-gestion
var HTMLAgregarPreparacion = '<div id="agregarPreparacion"><div><p class="destacado mas-font">Agregar preparación</p></div></div>';

// Variable que contiene la parte de la estructura FORM para agregar o editar preparación
// Cambiar:
//     %FORMULARIO% por id correspondiente, según sea el caso
// *Se inserta en el el contenedor #insertar-gestion
var HTMLFormPreparacion = '<form id="%FORMULARIO%" action="" method="post"><div class="form-group"><label for="IdAlimento">Nombre alimento</label><select id="IdAlimento" name="IdAlimento" class="form-control"></select></div><div class="form-group"><label for="IdEmpleado">Empleado</label><select id="IdEmpleado" name="IdEmpleado" class="form-control"></select></div><div class="form-group"><label for="FechaPrep">Fecha de preparación</label><input type="date" class="form-control" name="FechaPrep" value="" placeholder="DD-MM-AAAA"></div><div class="form-group"><label for="FechaCadPrep">Fecha de caducidad</label><input type="date" class="form-control" name="FechaCadPrep" value=""placeholder="DD-MM-AAAA"></div><div id ="add-opciones"></div><div class="form-group"><button id = "agrIngForm" type="button" class="btn btn-default boton" name="button">Agregar ingredientes</button></div><div class="form-group"><input type="submit" class = "btn btn-default boton" name="" value="Guarda"></div></form>';


// Variable que contiene la estructura del FORM para agregar ingredientes necesarios
// para la preparación.
// Insertar en #add-opciones
var HTMLFormPreparacionAgrIng = '<div><div class="form-group"><label for="IdIngrediente">Ingrediente</label><select name="IdIngrediente[]" class="IdIngrediente form-control"></select></div><div class="form-group"><label for="CantIngrediente">Cantidad</label><input type="num" class="form-control" name="CantIngrediente[]" value=""></div></div>';





// **************************************
// ***
// *** ELEMENTOS PARA GESTIONAR ALIMENTACIÓN
// ***     Modificar preparacion
// ***
// **************************************

// Variable que contiene toda la estructura para buscar la preparación a editar
// *Se inserta en el el contenedor #insertar-gestion
var HTMLModificarPreparacion = '<div id="modificarPreparacion"><div><p class="destacado mas-font">Modificar preparación</p></div><form id="frmbuscPrep" action="" method="post"><div class="form-group"><label class="sr-only" for="nombre">Buscar</label><input type="text" class="form-control" name="nombre" placeholder="Nombre del alimento preparado"></div><div class="form-group"><input type="submit" class = "btn btn-default boton" name="" value="Buscar"></div></form><table id="insBusq" class="table table-striped"></table></div>';


// Estructura de TABLE, en la que se desplegará los elementos de la busqueda de
// registros
// *insertar en .table .table-striped
// Cambiar %OPTION% por la opción que se desee realizar (eliminar o modificar)
var HTMLTablaBusquedaPrep = '<thead><td>ID</td><td>Alimento</td><td>Fecha cad</td><td>%OPTION%</td></thead><tbody id="insertarBusqueda"></tbody>';


// Variable que contiene la estructura del título de la sección
// *Se inserta en el el contenedor #insertar-gestion
var HTMLModificarPreparacionF = '<div id="modificarrPreparacion"><div><p class="destacado mas-font">Modificar preparación</p></div></div>';


var HTMLFormModPreparacion = '<form id="frmEdPreparacion" action="" method="post"><div class="form-group"><label for="IdAlimento">Nombre alimento</label><select id="IdAlimento" name="IdAlimento" class="form-control"></select></div><div class="form-group"><label for="IdEmpleado">Empleado</label><select id="IdEmpleado" name="IdEmpleado" class="form-control"></select></div><div class="form-group"><label for="FechaPrep">Fecha de preparación</label><input type="date" class="form-control" name="FechaPrep" value="" placeholder="DD-MM-AAAA"></div><div class="form-group"><label for="FechaCadPrep">Fecha de caducidad</label><input type="date" class="form-control" name="FechaCadPrep" value=""placeholder="DD-MM-AAAA"></div><div class="form-group" id ="ing-existentes"><label>Ingredientes</label><table id="ingEx" class="table table-striped"></table></div><div id ="add-opciones"></div>';

var HTMLFormModPreparacionBotones = '<div class="form-group"><button id = "agrIngForm" type="button" class="btn btn-default boton" name="button">Agregar ingredientes</button></div><div class="form-group"><input type="submit" class = "btn btn-default boton" name="" value="Guardar"></div></form>';


// Estructura de TABLE, en la que se desplegará los elementos de la busqueda de
// registros
// *insertar en #ingEx
var HTMLTablaIng = '<thead><td>ID</td><td>Nombre</td><td>Cant</td><td>Eliminar</td></thead><tbody id="insertarAliTab"></tbody>';

// Renglón o TR con la estructura para insertar un elemento que es posible Eliminar
// a la tabla correspondiete
// Insertar en #insertarAliTab
// Cambiar:
    // %NOMBRE% por el nombre del alimento
    // %CANT% por lacantidad del ingrediente
var HTMLElementTablaIng = '<tr><td>%ID%</td><td>%NOMBRE%</td><td>%CANT%</td><td><a class="%CLASS%" href=""><img src="../img/close.png" alt=""></a></td></tr>';

























// **************************************
// ***
// *** ELEMENTOS PARA GESTIONAR ALIMENTACIÓN
// ***     Eliminar preparacion
// ***
// **************************************

// Variable que contiene toda la estructura para buscar la preparación a editar
// *Se inserta en el el contenedor #insertar-gestion
var HTMLEliminarPreparacion = '<div id="eliminarPreparacion"><div><p class="destacado mas-font">Eliminar preparación</p></div><form id="frmbuscElPrep" action="" method="post"><div class="form-group"><label class="sr-only" for="nombre">Buscar</label><input type="text" class="form-control" name="nombre" placeholder="Nombre del alimento preparado"></div><div class="form-group"><input type="submit" class = "btn btn-default boton" name="" value="Buscar"></div></form><table id="insBusq" class="table table-striped"></table></div>';








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

//
//
