// *********************************************************************************
// ***
// *** HELPER-MOVILIDAD.JS contiene las cadenas de los elementos HTML que, una vez agregadas
// *** al DOM, mostrará los elementos que se necesitan agregar dinamicamente.
// *** Este archivo contiene los elementos siguientes:
// ***     -AGREGAR MOVILIDAD
// ***     -EDITAR MOVILIDAD
// ***
// ***
// *********************************************************************************


// aqui// Elemento que contiene la estructura básica de la interfaz de
// movilidad en apiario
var HTMLcontMovilidad = '<div id="cont-movilidad"><div><div class="cont-titulo-seg"><p class="titulo-segmento">Movilidad</p></div></div></div>';
var HTMLcontGestionesMov = '<div><div id="agr-gestiones-mov" class="col-md-5"></div><div id="insertar-gestion-mov" class="col-md-5 col-md-offset-2"></div></div>';

// Elemento con los botones de gestionar movilidad.
var HTMLgestMovilidad='<div class="contenedor-chico"><div><p class="destacado">Gestionar Movilidad</p></div><div><button id="btnAgregarMovilidad" class="btn btn-default boton">Agregar</button><button id="btnModificiarMovilidad" class="btn btn-default boton">Modificar</button></div></div>';


// Variable que contiene la estructura del titulo para la sección Agregar Movilidad
// *Se inserta en el el contenedor #insertar-gestion
var HTMLAgregarMovilidad = '<div id="agregarMovlidad"><div><p class="destacado mas-font">Agregar movilidad</p></div></div>';

var HTMLFormMovilidad = '<form id = "%FORMULARIO%" action="" method="post"><div class="form-group"><label for="NomApiario">Nombre Apiario</label><select id="NomApiario" name="IdApiario" class="form-control"></select></div><div class="form-group"><label for="LatitudNueva">Latitud Nueva</label><input type="text" class="form-control" name="LatitudNueva" value=""></div><div class="form-group"><label for="LongitudNueva">Longitud Nueva</label><input type"text" name="LongitudNueva" class="form-control" value=""><div class="form-group"><label for="AltitudNueva">Altitud Nueva</label><input type="text" class="form-control" name="AltitudNueva" value=""></div><div class="form-group"><label for="LatitudAnt">Latidud Anterior</label><input type="text" class="form-control" name="LatitudAnt" value=""></div><div class="form-group"><label for="LongAnt">Longitud Anterior</label><input type="text" class="form-control" name="LongAnt" value=""></div><div class="form-group"><label for="AltitudAnt">Altitud Anterior</label><input type="text" class="form-control" name="AltitudAnt" value=""></div><div class="form-group" id="ListEstado"><label for="Estado">Estado</label><select id="Estado" name="Estado" class="form-control"><option value="Colima">Colima</option><option value="Jalisco">Jalisco</option></select></div><div class="form-group" id="ListMunicipio"><label for="Municipio">Municipio</label><select id="Municipio" name="Municipio" class="form-control"></select></div><div class="form-group"><label for="Localidad">Localidad</label><select id="Localidad" name="Localidad" class="form-control"></select></div><div class="form-group"><label for="NomPredio">Nombre Predio</label><select id="NomPredio" name="NomPredio" class="form-control"></select></div><div class="form-group"><label for="NomZona">Nombre Zona</label><select id="NomZona" name="NomZona" class="form-control"></select></div><div class="form-group"><label for="FechaLlegada">Fecha de llegada</label><input type="date" class="form-control" name="FechaLlegada" value="" placeholder="DD-MM-AAAA"></div><div class="form-group"><label for="FechaFin">Fecha Fin</label><input type="date" class="form-control" name="FechaFin" value="" placeholder="DD-MM-AAAA"></div><div class="form-group"><input type="submit" class="btn btn-default boton" name="" value="Guardar"></div></form>';


// OPTION para insertar a cualquier SELECT
// Cambiar ** por el valor requerido y
// %data% por la cadena que se requiera para dicho valor
var HTMLAgregarOptionSelect = '<option value="**">%data%</option>';
