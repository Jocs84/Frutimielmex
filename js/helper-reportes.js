// *********************************************************************************
// ***
// *** HELPER-REPORTES.JS contiene las cadenas de los elementos HTML que, una vez agregadas
// *** al DOM, mostrará los elementos que se necesitan agregar dinamicamente en
// *** el archivo REPORTES.HTML.
// *** Este archivo contiene los elementos siguientes:
// ***
// ***
// ***
// ***
// ***
// *********************************************************************************


//
// **************************************
// ***
// *** ELEMENTOS GENERALES
// ***
// **************************************

// Variable que contiene todas las opciones de reportes
// predefinidos que existen en la sección de alimentación.
var HTMLOpcionesApiarios = '<h2>MUAJAJA</h2>';

// Variable que contiene todas las opciones de reportes
// predefinidos que existen en la sección de alimentación.
var HTMLOpcionesAlimentos = "<a href='' id='opc-bitacora'>Bitacora de alimentación p/apiario</a><a href='' id='opc-alimen'>Alimentos existentes</a><a href='' id='opc-ingr'>Ingredientes existentes</a><a href='' id='opc-prep'>Preparaciones existentes</a><a href='' id='opc-precioxali'>Precio por alimentos</a>";


var HTMLOption = "<option value='%valor%'>%nombre%</option>";

var HTMLAOpciones = "<a href='' id='%ida%' class='%clase%'>%nombre%</a>";

var HTMLBotonImp = '<button type="button" id="btnImprimir" class="btn btn-default boton"><img src="../img/printer-white.png"></button>';
var HTMLBotonDesc = '<button type="button" id="btnDescargar" class="btn btn-default boton"><img src="../img/descarga.png"></button>';

//
// **************************************
// ***
// *** ELEMENTOS ALIMENTACIÓN
// ***
// **************************************

// Variable que contiene todas las opciones de reportes
// predefinidos que existen en la sección de alimentación.
var HTMLRepAlimentosEx = '<h2>MUAJAJA</h2>';

// Variable que contiene todas las opciones de reportes
// predefinidos que existen en la sección de alimentación.
var HTMLRepAlimentosTitulo = '<h4>Alimentos existentes</h4>';

// Variable que contiene todas las opciones de reportes
// predefinidos que existen en la sección de alimentación.
var HTMLRepAlimentosCuerpo = '<table class="table table-striped"><thead><tr><td>Nombre alimento</td><td>Consistencia</td><td>Unidad de medición</td><td>Caducidad</td></tr></thead><tbody id="insertarDatos"></tbody></table>';

// Variable que contiene todas las opciones de reportes
// predefinidos que existen en la sección de alimentación.
var HTMLRepAlimentosRenglon = '<tr><td>%nombre%</td><td>%consistencia%</td><td>%unimed%</td><td>%cad%</td></tr>';
