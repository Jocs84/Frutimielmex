
// *********************************************************************************
// ***
// *** APIARIO.JS se encarga de manipular el DOM y efectos del archivo
// *** APIARIOS.HTML.
// *** Este archivo manipula lo siguiente:
// ***     -Mostrar las diferentes opciones que se presentan en el menú de apiarios.
// ***     -Mostrar información general (Detalles) sobre los apiarios como conjunto.
// ***     -Mostrar las diferentes gestiones dentro del submenú de Alimentación
// ***          ♦ Mostrar las diferentes gestiones de Ingredientes
// ***          ♦ Mostrar las diferentes gestiones de Alimentos
// ***          ♦ Mostrar las diferentes gestiones de Preparaciones
// ***     -Mostrar las diferentes gestiones dentro del submenú de Medicación
// ***     -Mostrar las diferentes gestiones dentro del submenú de Movilidad
// ***     -Mostrar las diferentes gestiones dentro del submenú de Productividad
// ***
// *********************************************************************************





// **************************************
// ***
// *** Cuando el documento esté cargado
// ***
// **************************************

// Muestra las diferentes opciones que se presentan en el menú de apiarios,
// cargando los Detalles de los apiarios al inicio.
$( document ).ready(function() {
    // Carga por default la sección de
    // DETALLES
    // *insertar aquí una vez esté diseñado


    // Muestra las acciones a realizar cuando se de click a la opción
    // ALIMENTACIÓN
    $(document).on('click','#opc-alimentacion',function(e){
        e.preventDefault();
        $("#opc-contenedor").empty();
        alimentacion();
    });


    // Muestra las acciones a realizar cuando se de click a la opción
    // MEDICACIÓN
    //Prueba de como se iniciaría la inserción *quitar esto una vez listo*
    $(document).on('click','#opc-medicacion',function(e){
        e.preventDefault();
        $("#opc-contenedor").empty();
        //Cambia la sentencia de abajo por el llamado a la función,
        // como lo hice con alimentacion ;)
        $("#opc-contenedor").append("<h2>MUAJAJA</h2>");
    });

});






// **************************************
// ***
// *** FUNCIÓN ALIMENTACIÓN
// ***
// **************************************

// Manipula todos los eventos del apartado de alimentación
// dentro de APIARIOS.HTML
alimentacion = function(){
    // Guarda los JSON resultantes de una busqueda, así no se perderá recursos
    // al volver a buscar en BD para volver a obtener los datos.
    // Util para cuando se buscan registro que serán editados.
    var jsonBusq;

    // Guarda identificadores cuando se obtienen a través de la manupulación
    // del DOM, facilitando su posterior uso.
    // Útil para seleccionar el ID del registro a editar o eliminar.
    var nom;

    // Inserta los controles para gestión de alimentos
    $("#opc-contenedor").append(HTMLcontAlimentacion);
    $("#opc-contenedor").append(HTMLcontGestiones);
    // Inserta los controles para gestionar Ingredientes
    $("#agr-gestiones").append(HTMLgestIngredinetes);
    // Inserta los controles para gestionar Alimentos
    $("#agr-gestiones").append(HTMLgestAlimentos);
    // Inserta los controles para gestionar Preparaciones
    $("#agr-gestiones").append(HTMLgestPreparaciones);


    // **************************************
    // ***
    // *** AGREGAR INGREDIENTE
    // ***
    // **************************************

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Inserción del formulario para
    // ♦ ♦  agregar Ingrediente
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Agregar Ingrediente, el cual despliega
    // El formulario para agregar el alimento
    $("#btnAgregarIngrediente").click(function(){
        // Vacia el contenedor de elementos anteriores e inserta el formulario
        // necesario
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLAgregarIngrediente);
        // Remplaza el valor comodín de la variable por el identificador necesario
        // para su posterior manipulación. id = "frmAgrIng"
        $("#agregarIngrediente").append(HTMLFormIngrediente.replace("%FORMULARIO%","frmAgrIng"));

        // AJAX para cargar las unidades de medida de un SELECT dentro del
        // FORM id = "frmAgrIng"
        $.ajax({
            type: "POST",
            url: "../php/llenadoDatosEnum.php",
            // datos necesarios para la busqueda de los valores,
            // en formato JSON
            data: {"tabla":"ingredientes","busqueda" : "UnidadMedida"},
            success: function(data){
                // Seleccionando el campo que se necesita
                var tipos = data[0]["Type"];
                // Manipulación de cadena
                var arg = tipos.split("'");
                for (var i = 0; i < arg.length; i++) {
                    if(i%2 != 0){
                        // Insertando valores a través de la variable HTMLAgregarOptionSelect,
                        // reemplazando el comodín ** con el valor en cuestión
                        var valor = HTMLAgregarOptionSelect.replace("**",arg[i]);
                        valor = valor.replace("%data%", arg[i]);
                        $("#UnidadMedida").append(valor);
                    }
                }
            },
            dataType: 'json'
       });
    });

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de los datos del formulario
    // ♦ ♦  una vez que esté este
    // ♦ ♦  agregar Ingrediente
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del Guardar,, el cual envia la información contenida en el FORM para
    // almacenar un registro a agregarIngrediente.php, el archivo encargado de
    // trabajar con la BD.
    $(document).on('submit', '#frmAgrIng', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos al archivo PHP
        //  retornando un JSON con un mensaje de éxito o fracaso
        $.ajax({
            type: "POST",
            url: "../php/agregarIngrediente.php",
            data: $("#frmAgrIng").serialize(),
            success: function(data){
                if(data.estado == '2'){
                    alert("Error al agregar ingrediente");
                }else{
                    alert("Se agregó ingrediente");
                }
            },
            dataType: 'json'
       });

    });




    // **************************************
    // ***
    // *** MODIFICAR INGREDIENTE
    // ***
    // **************************************

    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Inserción del formulario para
    // ♦ ♦  la búsqueda del Ingrediente a modificar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Modificar Alimento, el cual insertaen el
    // DOM la estructura del FORM para la búsqueda de dicho ingrediente
    $("#btnModificarIngrediente").click(function(){
        //  Vacia el contenedor en caso de busquedas anteriores
        $("#insertar-gestion").empty();
        //Inserta el formulario de busqueda de alimentos por nombre
        $("#insertar-gestion").append(HTMLModificarIngrediente);
    });


    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Envio de la información del formulario
    // ♦ ♦  la búsqueda del Ingrediente a modificar
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Evento del boton Buscar alimento, el cual manda los datos
    // al archivo buscarPorNombre.php, y después insertar los registros
    // obtenidos al DOM.
    $(document).on('submit', '#frmbuscIng', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda del FORM
        //  e insertar el en una tabla los registros obtenidos.
        $.ajax({
            type: "POST",
            url: "../php/buscarPorNombre.php",
            // El campo del FORM serializado en formato JSON (la búsqueda a realizar),
            // así como los datos necesarios para realizar la búsqueda.
            data: $("#frmbuscIng").serialize() + "&columna=" + "NombreIngrediente"  + "&tabla=" + "ingredientes",
            success: function(data){
                // Si se recibe un error
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    // Agregar en alert de que no se encontró informacion
                    $("#insBusq").append(HTMLAlertaNoElementos.replace("%MENSAJE%","alimentos"));
                // Si se recibe un objeto JSON con el resultado de la búsqueda
                }else{
                    //Copiar el JSON de respuesta a una variable auxiliar para
                    // evitar volver a consultar la base de datos al momento de
                    // rellenar el FORM con los datos del registro necesario
                    jsonBusq = data;
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusqueda.replace("%OPTION%","Modificar"));
                    // Insertar los registros que se encontraron
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var rem = HTMLElementEncontradoEd.replace("%NOMBRE%",data[i]["NombreIngrediente"]);
                        //Poner el id del alimento
                        rem = rem.replace("%IDALI%",data[i]["IdIngrediente"]);
                        // Poner la fecha de caducidad del alimento
                        rem = rem.replace("%FECHA%",data[i]["DiaCadIng"] + "/" + data[i]["MesCadIng"] + "/" + data[i]["AnioCadIng"]);
                        rem = rem.replace("%CLASS%","edElemIng");
                        // insertar el alimento en el DOM
                        $("#insertarBusqueda").append(rem);
                    }

                }
            },
            dataType: 'json'
       });
    });



    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // ♦ ♦  Llenado de datos del formurario para editar la
    // ♦ ♦  información de los alimentos
    // ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
    // Una vez se elige el registro a editar a través de dar click
    // al icono, se insertará el formulario correspondiente, y se
    // rellenará con la información del registro.
    $(document).on('click', '.edElemIng', function(e) {
        //Previene el trabajo por default del submit
        e.preventDefault();
        var padre = $(this).parent().parent();
        nom = $(padre).children(':first-child').text();

        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLEditarIngrediente);
        $("#agregarIngrediente").append(HTMLFormIngrediente.replace("%FORMULARIO%","frmEdIng"));

        // AJAX para cargar las unidades de medida de un select
        $.ajax({
            type: "POST",
            url: "../php/llenadoDatosEnum.php",
            data: {"tabla":"alimentos","busqueda" : "UnidadMedicion"},
            success: function(data){
                var tipos = data[0]["Type"];
                var arg = tipos.split("'");
                for (var i = 0; i < arg.length; i++) {
                    if(i%2 != 0){
                        var valor = HTMLAgregarOptionSelect.replace("**",arg[i]);
                        valor = valor.replace("%data%", arg[i]);
                        $("#UnidadMedida").append(valor);
                    }
                }
            },
            dataType: 'json'
       });

    //    Poniendo los datos del registro en los campos correspóndientes
        for (var i = 0; i < jsonBusq.length; i++) {
            if(jsonBusq[i]["IdIngrediente"] === nom ){
                $("#frmEdIng").children(':first-child').children(':nth-child(2)').val(jsonBusq[i]["NombreIngrediente"]);
                $("#UnidadMedida").val(jsonBusq[i]["UnidadMedida"]);
                $("#frmEdIng").children(':nth-child(3)').children(':nth-child(2)').val(jsonBusq[i]["PrecioIngrediente"]);
                var fecha = jsonBusq[i]["DiaCadIng"] + "-" + jsonBusq[i]["MesCadIng"] + "-" + jsonBusq[i]["AnioCadIng"];
                $("#frmEdIng").children(':nth-child(4)').children(':nth-child(2)').val(fecha);
            }
        }
    });


    $(document).on('submit', '#frmEdIng', function(e) {
        e.preventDefault(e);
        // ajax para enviar los datos
        $.ajax({
            type: "POST",
            url: "../php/editarIngrediente.php",
            data: $("#frmEdIng").serialize() + "&id=" + nom,
            success: function(data){
                if(data.estado == '2'){
                    alert("Error al editar alimento");
                }else{
                    alert("Se editó el alimento");
                }
            },
            dataType: 'json'
       });

    });


    // **************
    // *********************
    // *******************************ELIMINAR INGREDIENTE
    $("#btnEliminarIngrediente").click(function(){
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLEliminarIngrediente);
    });

    // Buscar alimentos por nombre e insertarlos
    // al DOM.
    $(document).on('submit', '#frmbuscInge', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda en el form
        //  e insertar el
        $.ajax({
            type: "POST",
            url: "../php/buscarPorNombre.php",
            data: $("#frmbuscInge").serialize() + "&columna=" + "NombreIngrediente"  + "&tabla=" + "ingredientes",
            // data: {"buscarAlimento":"torta"},
            success: function(data){
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    // Agregar en alert de que no se encontró informacion
                    $("#insBusq").append(HTMLAlertaNoElementos.replace("%MENSAJE%","ingredientes"));
                }else{
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusqueda.replace("%OPTION%","Eliminar"));
                    // Insertar los registros que se encontraron
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var rem = HTMLElementEncontradoEl.replace("%NOMBRE%",data[i]["NombreIngrediente"]);
                        //Poner el id del alimento
                        rem = rem.replace("%IDALI%",data[i]["IdIngrediente"]);
                        // Poner la fecha de caducidad del alimento
                        rem = rem.replace("%FECHA%",data[i]["DiaCadIng"] + "/" + data[i]["MesCadIng"] + "/" + data[i]["AnioCadIng"]);
                        rem = rem.replace("%CLASS%","elElemIng");
                        // insertar el alimento en el DOM
                        $("#insertarBusqueda").append(rem);
                    }

                }
            },
            dataType: 'json'
       });
    });


    //Eliminar alimentación
    $(document).on('click', '.elElemIng', function(e) {
        e.preventDefault();
        var padre = $(this).parent().parent();
        var nom = $(padre).children(':first-child').text();
        $.ajax({
            type: "POST",
            url: "../php/eliminarPorId.php",
            data: {"eliminar": nom, "tabla":"ingredientes", "elemento":"IdIngrediente"},
            success: function(data){
                if(data.estado == '2'){
                    alert("No se eliminó");
                    // $("#insertarBusqueda").children(':first-child').remove();
                    // $(padre).parent().prepend(HTMLEliminarConf.replace("%MENSAJE%","no eliminado"));
                }else{
                    alert("Se eliminó elemento");
                    $(padre).remove();
                    // $(padre).parent().prepend(HTMLEliminarConf.replace("%MENSAJE%","ELIMINADO"));
                }
            },
            dataType: 'json'
       });
    });






















    // **************
    // *********************
    // ******************************* AGREGAR ALIMENTO
    // Evento del boton Agregar Alimento, el cual despliega
    // El formulario para agregar el alimento
    $("#btnAgregarAlimento").click(function(){
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLAgregarAlimento);
        $("#agregarAlimento").append(HTMLFormAlimento.replace("%FORMULARIO%","frmAgrAlimento"));
        $("#seleccionantinatu").append(HTMLSelectTipoAlimentacion);
        $("#artinatu").append(HTMLAgregarArtificial);
        var z = HTMLAgregarOptionSelect.replace("**","Energizante");
        z = z.replace("%data%", "Energizante");
        $("#LugarObtencion").append(z);
        z = HTMLAgregarOptionSelect.replace("**","De reserva");
        z = z.replace("%data%", "De reserva");
        $("#LugarObtencion").append(z);

        // AJAX para cargar las unidades de medida de un select
        $.ajax({
            type: "POST",
            url: "../php/llenadoDatosEnum.php",
            data: {"tabla":"alimentos","busqueda" : "UnidadMedicion"},
            success: function(data){
                var tipos = data[0]["Type"];
                var arg = tipos.split("'");
                for (var i = 0; i < arg.length; i++) {
                    if(i%2 != 0){
                        var valor = HTMLAgregarOptionSelect.replace("**",arg[i]);
                        valor = valor.replace("%data%", arg[i]);
                        $("#unidadMedicion").append(valor);
                    }
                }
            },
            dataType: 'json'
       });

    });

    //Detecta cambio en el SELECT de tipos alimentos
    // (Natural o artificial), y pone los campos necesarios para
    // cada tipo de alimento
    $(document).on('change','#tipoAlimt',function(){
        // Obtiene el valor del OPTION seleccionado y en base a este
        // inserta el campo necesario
        if($("#tipoAlimt").val() === "Artificial"){
            $("#artinatu").empty();
            $("#artinatu").append(HTMLAgregarArtificial);
            var z = HTMLAgregarOptionSelect.replace("**","Energizante");
            z = z.replace("%data%", "Energizante");
            $("#LugarObtencion").append(z);
            z = HTMLAgregarOptionSelect.replace("**","De reserva");
            z = z.replace("%data%", "De reserva");
            $("#LugarObtencion").append(z);
        }else{
            $("#artinatu").empty();
            $("#artinatu").append(HTMLAgregarNatural);
            var z = HTMLAgregarOptionSelect.replace("**","Colmena ajena");
            z = z.replace("%data%", "Colmena ajena");
            $("#LugarObtencion").append(z);
            z = HTMLAgregarOptionSelect.replace("**","Colmena propia");
            z = z.replace("%data%", "Colmena propia");
            $("#LugarObtencion").append(z);
        }
    });

    $(document).on('submit', '#frmAgrAlimento', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda en el form
        //  e insertar el
        $.ajax({
            type: "POST",
            url: "../php/agregarAlimento.php",
            data: $("#frmAgrAlimento").serialize(),
            success: function(data){
                if(data.estado == '2'){
                    alert("Error al agregar alimento");
                }else{
                    alert("Se agregó alimento");

                }
            },
            dataType: 'json'
       });

    });





    // **************
    // *********************
    // ******************************* MODIFICAR ALIMENTOS
    // Evento del boton Modificar Alimento, el cual buscador
    // para después proceder a editar los datos.
    $("#btnModificiarAlimento").click(function(){
        //  Vacia el contenedor en caso de busquedas anteriores
        $("#insertar-gestion").empty();
        //Inserta el formulario de busqueda de alimentos por nombre
        $("#insertar-gestion").append(HTMLModificarAlimento);
    });

    // Buscar alimentos por nombre e insertarlos
    // al DOM.
    $(document).on('submit', '#formBuscar', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda en el form
        //  e insertar el
        $.ajax({
            type: "POST",
            url: "../php/buscarPorNombre.php",
            data: $("#formBuscar").serialize() + "&columna=" + "NombreAlimento"  + "&tabla=" + "alimentos",
            // data: {"buscarAlimento":"torta"},
            success: function(data){
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    // Agregar en alert de que no se encontró informacion
                    $("#insBusq").append(HTMLAlertaNoElementos.replace("%MENSAJE%","alimentos"));
                }else{
                    jsonBusq = data;
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusqueda.replace("%OPTION%","Modificar"));
                    // Insertar los registros que se encontraron
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var rem = HTMLElementEncontradoEd.replace("%NOMBRE%",data[i]["NombreAlimento"]);
                        //Poner el id del alimento
                        rem = rem.replace("%IDALI%",data[i]["IdAlimento"]);
                        // Poner la fecha de caducidad del alimento
                        rem = rem.replace("%FECHA%",data[i]["DiaCadAli"] + "/" + data[i]["MesCadAli"] + "/" + data[i]["AnioCadAli"]);
                        rem = rem.replace("%CLASS%","edElemAli");
                        // insertar el alimento en el DOM
                        $("#insertarBusqueda").append(rem);
                    }

                }
            },
            dataType: 'json'
       });
    });



    // Llenado de datos del formurario para editarla información
    // de los alimentos
    var nom;
    $(document).on('click', '.edElemAli', function(e) {
        e.preventDefault();
        var padre = $(this).parent().parent();
        nom = $(padre).children(':first-child').text();

        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLEditarAlimento);
        $("#agregarAlimento").append(HTMLFormAlimento.replace("%FORMULARIO%","frmEdAlimento"));
        $("#seleccionantinatu").append(HTMLSelectTipoAlimentacion);
        $("#artinatu").append(HTMLAgregarArtificial);
        var z = HTMLAgregarOptionSelect.replace("**","Energizante");
        z = z.replace("%data%", "Energizante");
        $("#LugarObtencion").append(z);
        z = HTMLAgregarOptionSelect.replace("**","De reserva");
        z = z.replace("%data%", "De reserva");
        $("#LugarObtencion").append(z);

        // AJAX para cargar las unidades de medida de un select
        $.ajax({
            type: "POST",
            url: "../php/llenadoDatosEnum.php",
            data: {"tabla":"alimentos","busqueda" : "UnidadMedicion"},
            success: function(data){
                var tipos = data[0]["Type"];
                var arg = tipos.split("'");
                for (var i = 0; i < arg.length; i++) {
                    if(i%2 != 0){
                        var valor = HTMLAgregarOptionSelect.replace("**",arg[i]);
                        valor = valor.replace("%data%", arg[i]);
                        $("#unidadMedicion").append(valor);
                    }
                }
            },
            dataType: 'json'
       });

    //    Poniendo los datos del registro en los campos correspóndientes
        for (var i = 0; i < jsonBusq.length; i++) {
            if(jsonBusq[i]["IdAlimento"] === nom ){
                $("#frmEdAlimento").children(':first-child').children(':nth-child(2)').val(jsonBusq[i]["NombreAlimento"]);
                $("#frmEdAlimento").children(':nth-child(2)').children(':nth-child(2)').val(jsonBusq[i]["Consistencia"]);
                $("#unidadMedicion").val(jsonBusq[i]["UnidadMedicion"]);
                var fecha = jsonBusq[i]["DiaCadAli"] + "-" + jsonBusq[i]["MesCadAli"] + "-" + jsonBusq[i]["AnioCadAli"];
                $("#frmEdAlimento").children(':nth-child(4)').children(':nth-child(2)').val(fecha);
            }
        }

        // Buscar la información en la tabla Artificial para desplegar información
        // extra del alimento
        $.ajax({
            type: "POST",
            url: "../php/buscarPorId.php",
            data: {"busqueda":nom, "campo":"IdAlimento", "tabla": "artificial"},
            success: function(data){
                if(data.estado != '2'){
                    $("#seleccionantinatu").children(':nth-child(2)').val("Artificial");
                    $("#artinatu").children(':first-child').children(':nth-child(2)').val(data[0]["TipoAlimento"]);
                }
            },
            dataType: 'json'
       });

       // Buscar la información en la tabla Natural para desplegar información
       // extra del alimento
       $.ajax({
           type: "POST",
           url: "../php/buscarPorId.php",
           data: {"busqueda":nom, "campo":"IdAlimento", "tabla": "natural"},
           success: function(data){
               if(data.estado != '2'){
                   $("#seleccionantinatu").children(':nth-child(2)').val("Natural");
                   $("#artinatu").empty();
                   $("#artinatu").append(HTMLAgregarNatural);
                   var z = HTMLAgregarOptionSelect.replace("**","Colmena ajena");
                   z = z.replace("%data%", "Colmena ajena");
                   $("#LugarObtencion").append(z);
                   z = HTMLAgregarOptionSelect.replace("**","Colmena propia");
                   z = z.replace("%data%", "Colmena propia");
                   $("#LugarObtencion").append(z);
                   $("#artinatu").children(':first-child').children(':nth-child(2)').val(data[0]["LugarObtencion"]);
               }
           },
           dataType: 'json'
      });
    });

    // Envio de la información a base de datos para su actualización
    // dentro de la misma.
    $(document).on('submit', '#frmEdAlimento', function(e) {
        e.preventDefault(e);
        // ajax para enviar los datos
        $.ajax({
            type: "POST",
            url: "../php/editarAlimento.php",
            data: $("#frmEdAlimento").serialize() + "&id=" + nom,
            success: function(data){
                if(data.estado == '2'){
                    alert("Error al editar alimento");
                }else{
                    alert("Se editó el alimento");
                }
            },
            dataType: 'json'
       });

   });





    // **************
    // *********************
    // *******************************ELIMINAR ALIMENTO
    $("#btnEliminarAlimento").click(function(){
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLEliminarAlimento);
    });

    // Buscar alimentos por nombre e insertarlos
    // al DOM.
    $(document).on('submit', '#formBuscarEl', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda en el form
        //  e insertar el
        $.ajax({
            type: "POST",
            url: "../php/buscarPorNombre.php",
            data: $("#formBuscarEl").serialize()+ "&columna=" + "NombreAlimento"  + "&tabla=" + "alimentos",
            // data: {"buscarAlimento":"torta"},
            success: function(data){
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    // Agregar en alert de que no se encontró informacion
                    $("#insBusq").append(HTMLAlertaNoElementos.replace("%MENSAJE%","alimentos"));
                }else{
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusqueda.replace("%OPTION%","Eliminar"));
                    // Insertar los registros que se encontraron
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var rem = HTMLElementEncontradoEl.replace("%NOMBRE%",data[i]["NombreAlimento"]);
                        //Poner el id del alimento
                        rem = rem.replace("%IDALI%",data[i]["IdAlimento"]);
                        // Poner la fecha de caducidad del alimento
                        rem = rem.replace("%FECHA%",data[i]["DiaCadAli"] + "/" + data[i]["MesCadAli"] + "/" + data[i]["AnioCadAli"]);
                        rem = rem.replace("%CLASS%","elElem");
                        // insertar el alimento en el DOM
                        $("#insertarBusqueda").append(rem);
                    }

                }
            },
            dataType: 'json'
       });
    });


    //Eliminar alimentación
    $(document).on('click', '.elElem', function(e) {
        e.preventDefault();
        var padre = $(this).parent().parent();
        var nom = $(padre).children(':first-child').text();
        $.ajax({
            type: "POST",
            url: "../php/eliminarPorId.php",
            data: {"eliminar": nom, "tabla":"alimentos", "elemento":"IdAlimento"},
            success: function(data){
                if(data.estado == '2'){
                    alert("No se eliminó");
                    // $("#insertarBusqueda").children(':first-child').remove();
                    // $(padre).parent().prepend(HTMLEliminarConf.replace("%MENSAJE%","no eliminado"));
                }else{
                    alert("Se eliminó elemento");
                    $(padre).remove();
                    // $(padre).parent().prepend(HTMLEliminarConf.replace("%MENSAJE%","ELIMINADO"));
                }
            },
            dataType: 'json'
       });
    });





    // *********************
    // *********************
    // *********************
    // *****       PREPARACIONES
    // *********************
    // **************
    // *********************
    // ******************************* AGREGAR PREPARACIONES
    // Evento del boton Agregar Alimento, el cual despliega
    // El formulario para agregar el alimento
    $("#btnAgregarPreparacion").click(function(){
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLAgregarPreparacion);
        $("#agregarPreparacion").append(HTMLFormPreparacion.replace("%FORMULARIO%","frmAgrPreparacion"));
        $("#add-opciones").append(HTMLFormPreparacionAgrIng);

        // AJAX para cargar los ids y datos de los alimentos
        $.ajax({
            type: "POST",
            url: "../php/buscarGeneral.php",
            data: {"tabla":"alimentos"},
            success: function(data){
                var i = 0;
                while (data[i]) {
                    var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdAlimento"]);
                    ins = ins.replace("%data%", data[i]["NombreAlimento"]);
                    $("#IdAlimento").append(ins);
                    i++;
                }
            },
            dataType: 'json'
       });

       // AJAX para cargar los ids y datos de los empleados
    //    $.ajax({
    //        type: "POST",
    //        url: "../php/buscarGeneral.php",
    //        data: {"tabla":"empleados"},
    //        success: function(data){
    //            var i = 0;
    //            while (data[i]) {
    //                var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdAlimento"]);
    //                ins = ins.replace("%data%", data[i]["NombreAlimento"]);
    //                $("#IdAlimento").append(ins);
    //                i++;
    //            }
    //        },
    //        dataType: 'json'
    //   });

        // **********************************************************
        // dato experimental, volover a lo de arriba cuando se esté trabajando con la basecompleta
        // ++++++++++++++++++++++++++++++++
        var c = HTMLAgregarOptionSelect.replace("**","88");
        c = c.replace("%data%", "Empleado de prueba");
        $("#IdEmpleado").append(c);

        $.ajax({
            type: "POST",
            url: "../php/buscarGeneral.php",
            data: {"tabla":"ingredientes"},
            success: function(data){
                var i = 0;
                while (data[i]) {
                    var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdIngrediente"]);
                    ins = ins.replace("%data%", data[i]["NombreIngrediente"]);
                    $(".IdIngrediente").append(ins);
                    i++;
                }
            },
            dataType: 'json'
       });

    });


    // Agregar el más espacios para llenar con más ingredientes :D
    $(document).on('click', '#agrIngForm', function(e) {
        $("#add-opciones").append(HTMLFormPreparacionAgrIng);
        $.ajax({
            type: "POST",
            url: "../php/buscarGeneral.php",
            data: {"tabla":"ingredientes"},
            success: function(data){
                var i = 0;
                while (data[i]) {
                    var ins = HTMLAgregarOptionSelect.replace("**",data[i]["IdIngrediente"]);
                    ins = ins.replace("%data%", data[i]["NombreIngrediente"]);
                    $("#add-opciones").children(':last-child').children(':nth-child(1)').children(':nth-child(2)').append(ins);
                    i++;
                }
            },
            dataType: 'json'
       });

    });

    // Wnviar los datos del formulario para la
    // agregar el registro a la tabla
    //Enviar datos del Ingrediente a agregar
    $(document).on('submit', '#frmAgrPreparacion', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda en el form
        //  e insertar el
        $.ajax({
            type: "POST",
            url: "../php/agregarPreparacion.php",
            data: $("#frmAgrPreparacion").serialize(),
            success: function(data){
                if(data.estado == '2'){
                    alert("Error al agregar ingrediente");
                }else{
                    alert("Se agregó ingrediente");
                    $("#insertar-gestion").empty();
                }
            },
            dataType: 'json'
       });

    });


    // *********************AGREGAR PREPARACION

    $("#btnModificarPreparacion").click(function(){
        //  Vacia el contenedor en caso de busquedas anteriores
        $("#insertar-gestion").empty();
        //Inserta el formulario de busqueda de alimentos por nombre
        $("#insertar-gestion").append(HTMLModificarPreparacion);
    });

    // Buscar alimentos por nombre e insertarlos
    // al DOM.
    $(document).on('submit', '#frmbuscPrep', function(e) {
        //Previene el trabajo por default del submit
         e.preventDefault();
        //  Método AJAX para enviar los datos de búsqueda en el form
        //  e insertar el
        $.ajax({
            type: "POST",
            url: "../php/buscarPorNombre.php",
            data: $("#frmbuscPrep").serialize() + "&columna=" + "IdPreparacion"  + "&tabla=" + "encabpreparacion",
            // data: {"buscarAlimento":"torta"},
            success: function(data){
                if(data.estado == '2'){
                    //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    // Agregar en alert de que no se encontró informacion
                    $("#insBusq").append(HTMLAlertaNoElementos.replace("%MENSAJE%","preparacion"));
                }else{
                    jsonBusq = data;
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusqueda.replace("%OPTION%","Modificar"));
                    // Insertar los registros que se encontraron
                    for (var i = 0; i < data.length; i++) {
                        //Poner el nombre del alimento
                        var rem = HTMLElementEncontradoEd.replace("%NOMBRE%",data[i]["IdPreparacion"]);
                        //Poner el id del alimento
                        rem = rem.replace("%IDALI%",data[i]["IdAlimento"]);
                        // Poner la fecha de caducidad del alimento
                        rem = rem.replace("%FECHA%",data[i]["DiaCadAli"] + "/" + data[i]["MesCadAli"] + "/" + data[i]["AnioCadAli"]);
                        rem = rem.replace("%CLASS%","edElemAli");
                        // insertar el alimento en el DOM
                        $("#insertarBusqueda").append(rem);
                    }

                }
            },
            dataType: 'json'
       });
    });
    //
    //
    //
    // // Llenado de datos del formurario para editarla información
    // // de los alimentos
    // var nom;
    // $(document).on('click', '.edElemAli', function(e) {});



}
