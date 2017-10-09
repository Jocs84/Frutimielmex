// *********************************************************************************
// ***
// *** USUARIOS.JS se encarga de manipular el DOM y efectos del archivo
// *** APIARIOS.HTML respecto al módulo de alimentación.
// *** Este archivo manipula lo siguiente:
// ***     -Mostrar las diferentes gestiones dentro del submenú de Usuarios
// ***          ♦ Mostrar las diferentes gestiones de Usuarios
// ***
// *********************************************************************************



// **************************************
// ***
// *** FUNCIÓN USUARIOS
// ***
// **************************************

usuarios = function(){

var jsonBusq;
var nom;
var id;
var padre;


$("#opc-contenedor").append(HTMLcontUsuarios);
$("#opc-contenedor").append(HTMLcontGestionesUsu);
$("#agr-gestiones-usu").append(HTMLgestUsuarios);



$("#btnAgregarUsuario").click(function(){

  $("#insertar-gestion-usu").empty();
  $("#insertar-gestion-usu").append(HTMLAgregarUsuario);
  // Remplaza el valor comodín de la variable por el identificador necesario
  // para su posterior manipulación. id = "frmAgrMov"
  $("#agregarUsuario").append(HTMLFormUsuario.replace("%FORMULARIO%","frmAgrUsu")); //**checar


// envía datos de formulario para guardar en base de datos a través de archivo php
  $(document).on('submit', '#frmAgrUsu', function(e) {
      //Previene el trabajo por default del submit
       e.preventDefault();
      //  Método AJAX para enviar los datos al archivo PHP
      //  retornando un JSON con un mensaje de éxito o fracaso
      $.ajax({
          type: "POST",
          url: "../php/agregarUsuario.php",
          data: $("#frmAgrUsu").serialize(),
          success: function(data){
              if(data.estado == '2'){
                  insAlertError("agregar");
              }else{
                  insAlertExito("agregado");
                  $("#insertar-gestion-usu").empty();
              }
          },
          dataType: 'json'
     });
  });
});


// acciones del botón modificar usuario

$("#btnModificarUsuario").click(function(){

//  Vacia el contenedor en caso de busquedas anteriores
$("#insertar-gestion-usu").empty();
//Inserta el formulario de busqueda de alimentos por nombre
$("#insertar-gestion-usu").append(HTMLModificarUsuario);

});



// ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
// ♦ ♦  Envio de la información del formulario
// ♦ ♦  la búsqueda del Usuario a modificar
// ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
// Evento del boton Buscar usuario, el cual manda los datos
// al archivo buscarPorNick.php, y después insertar los registros
// obtenidos al DOM.
$(document).on('submit', '#frmbuscUsu', function(e) {
    //Previene el trabajo por default del submit
     e.preventDefault();
     //  Método AJAX para enviar los datos de búsqueda en el form
    //  e insertar el

    var datosBus = $('#frmbuscUsu').serialize();
    //alert("datos busqueda: "+ datosBus);
    //var datosBus ="H";

    $.ajax({
        type: "POST",
        url: "../php/buscarPorNick.php",
        data: datosBus  +  "&columna=" + "NickUsuario" + "&tabla=" + "usuarios",

        success: function(data){
            if(data.estado == '2'){
              //alert("Entra al estado 2");
               //  Vacia el contenedor en caso de busquedas anteriores
                $("#insBusqU").empty();
                // Agregar en alert de que no se encontró informacion
                $("#insBusqU").append(HTMLAlertaNoElementosUsu.replace("%MENSAJE%","usuarios"));
            }else{

                jsonBusq = data;
               //  Vacia el contenedor en caso de busquedas anteriores
                $("#insBusqU").empty();
                //agrega la estructura de la tabla contenedora de la busqueda
                $("#insBusqU").append(HTMLTablaBusquedaEdi.replace("%OPTION%","Modificar"));
                // Insertar los registros que se encontraron
                for (var i = 0; i < data.length; i++) {
                    //Poner el id del usuario
                    var rem = HTMLElementEncontradoEdUsu.replace("%IDUSU%",data[i]["IdUsuario"]);
                    //Poner el nickname del usuario
                    rem = rem.replace("%NICKNAME%",data[i]["NickUsuario"]);
                    // Poner la clase
                    rem = rem.replace("%CLASS%","edElemUsu");
                    // insertar el alimento en el DOM
                    $("#insertarBusquedaU").append(rem);
                }

            }
        },
        dataType: 'json'
   });

});

//***********************************************************************************************************************



// ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
// ♦ ♦  Llenado de datos del formurario para editar la
// ♦ ♦  información de los usuarios
// ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
// Una vez se elige el registro a editar a través de dar click
// al icono, se insertará el formulario correspondiente, y se
// rellenará con la información del registro.
$(document).on('click', '.edElemUsu', function(e) {
    //Previene el trabajo por default del elemento A HTML
    e.preventDefault();
    // Obtener ID del padre del elemento clicleado
    padre = $(this).parent().parent();
    // Obtener el texto (en este caso ID) del padre de la variable padre
    nom = $(padre).children(':first-child').text();
    // Vaciar la caja contenedora e insertar el formulario de usuarios
    $("#insertar-gestion-usu").empty();
    $("#insertar-gestion-usu").append(HTMLEditarUsuario);
    // insertando y modificando el ID a frmEdIUsu para su posterior manipulación
    $("#editarUsuario").append(HTMLFormUsuario.replace("%FORMULARIO%","frmEdUsu"));

   // Poniendo los datos del registro en los campos correspóndientes
   // del FORM frmEdUsu
   for (var i = 0; i < jsonBusq.length; i++) {
       // compara el ID obtenido del elemento clicleado y lo compara con
       // la info de la variable jsonBusq
       if(jsonBusq[i]["IdUsuario"] === nom ){
           $("#frmEdUsu").children(':first-child').children(':nth-child(2)').val(jsonBusq[i]["NomUsuario"]);
           $("#frmEdUsu").children(':nth-child(2)').children(':nth-child(2)').val(jsonBusq[i]["ApUsuario"]);
           $("#frmEdUsu").children(':nth-child(3)').children(':nth-child(2)').val(jsonBusq[i]["AmUsuario"]);
           $("#frmEdUsu").children(':nth-child(4)').children(':nth-child(2)').val(jsonBusq[i]["NickUsuario"]);
           $("#frmEdUsu").children(':nth-child(5)').children(':nth-child(2)').val(jsonBusq[i]["PassUsuario"]);

       }
   }
});


// ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
// ♦ ♦  Envio de los datos del formulario
// ♦ ♦  una vez que los datos han sido editados
// ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
// Evento del Guardar, el cual envia la información contenida en el FORM para
// editar un registro a editarUsuario.php, el archivo encargado de
// trabajar con la BD.
$(document).on('submit', '#frmEdUsu', function(e) {
    e.preventDefault(e);

    var vjson = $("#frmEdUsu").serialize() + "&id=" + nom;
    //alert ("valor de json: "+ vjson);

    $.ajax({
        type: "POST",
        url: "../php/editarUsuario.php",
        //data: $("#frmEdUsu").serialize() + "&id=" + nom,
        data: vjson,
        success: function(data){
                if(data.estado == '2'){
                insAlertError("modificar");
            }else{
                insAlertExito("modificado");
            }
        },
        dataType: 'json'
   });


});


//***********************************************************************************************************************



// ************ ACCIONES BOTON ELIMINAR Usuario ****************
//************************************************************
//****************************************************************

$("#btnEliminarUsuario").click(function(){

//  Vacia el contenedor en caso de busquedas anteriores
$("#insertar-gestion-usu").empty();
//Inserta el formulario de busqueda de usuarios por nombre a eliminar
$("#insertar-gestion-usu").append(HTMLEliminarUsuario);

// ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
// ♦ ♦  Envio de la información del formulario
// ♦ ♦  la búsqueda del Usuario a eliminar
// ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
// Evento del boton Buscar usuario, el cual manda los datos
// al archivo buscarPorNick.php, y después insertar los registros
// obtenidos al DOM.
$(document).on('submit', '#frmbuscUsuEli', function(e) {
    //Previene el trabajo por default del submit
     e.preventDefault();
     //  Método AJAX para enviar los datos de búsqueda en el form
    //  e insertar el

    var datosBus = $('#frmbuscUsuEli').serialize();
    //alert("datos busqueda: "+ datosBus);
    //var datosBus ="H";

    $.ajax({
        type: "POST",
        url: "../php/buscarPorNick.php",
      //  data: $("#frmbuscUsu").serialize() +  "&columna=" + "NickUsuario" + "&tabla=" + "usuarios",

             data: datosBus  +  "&columna=" + "NickUsuario" + "&tabla=" + "usuarios",

        //data: {"busqueda" : "" , "tabla" : "usuarios", "columna" : "NickUsuario"},

        success: function(data){
            if(data.estado == '2'){
              //alert("Entra al estado 2");
               //  Vacia el contenedor en caso de busquedas anteriores
                $("#insBusqUEli").empty();
                // Agregar en alert de que no se encontró informacion
                $("#insBusqUEli").append(HTMLAlertaNoElementos.replace("%MENSAJE%","usuarios"));
            }else{

                jsonBusq = data;
               //  Vacia el contenedor en caso de busquedas anteriores
                $("#insBusqUEli").empty();
                //agrega la estructura de la tabla contenedora de la busqueda
                $("#insBusqUEli").append(HTMLTablaBusquedaEli.replace("%OPTION%","Eliminar"));
                // Insertar los registros que se encontraron
                for (var i = 0; i < data.length; i++) {
                    //Poner el id del usuario
                    var rem = HTMLElementEncontradoEli.replace("%IDUSU%",data[i]["IdUsuario"]);
                    //Poner el nickname del usuario
                    rem = rem.replace("%NICKNAME%",data[i]["NickUsuario"]);
                    // Poner la clase
                    rem = rem.replace("%CLASS%","edElemUsuEli");

                    //rem = rem.replace("%MODALUSU%","modalUsu");

                    // insertar el alimento en el DOM
                    $("#insertarBusquedaUEli").append(rem);
                }

            }
        },
        dataType: 'json'
   });

});




// ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
// ♦ ♦  Envio de la información del usuario
// ♦ ♦  a eliminar
// ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
// Una vez se elige el registro a eliminar a través de dar click
// al icono, y se eliminará.
$(document).on('click', '.edElemUsuEli', function(e) {
    // Previene el funcionamiento por default de elemento A HTML

    e.preventDefault();

    // Variable auxiliar para obtener los elementos padres del elemento clicleado
    // en el DOM

    padre = $(this).parent().parent();

    // Obteniendo el ID del registro a través del elemento presente en el DOM

    nom = $(padre).children(':first-child').text();

    // AJAX que envia la información del registro a eliminar y recibe un JSON
    // con la información de la operación
    $.ajax({
        type: "POST",
        url: "../php/eliminarPorIdUsu.php",
        // JSON con los siguientes valores:
        //     • eliminar - será el ID del registro que se desea eliminar
        //     • tabla - tabla a la que pertenece el registro
        //     • elemento - campo dentro de la BD necesaria para filtrar registros
        data: {"eliminar": nom, "tabla":"usuarios", "elemento":"IdUsuario"},
        success: function(data){
            if(data.estado == '2'){
                insAlertError("eliminado");

            }else{
                //$('#modalUsu').modal('hide');
                $(padre).remove();
                insAlertExito("eliminado");

            }
        },
        dataType: 'json'
   });
});


});

// TERMINA ACCIONES DEL BOTÓN ELIMINAR USUARIOS ***************
// ************************************************************
// ************************************************************


}
// **************************************
// ***
// *** FIN FUNCIÓN USUARIOS
// ***
// **************************************
