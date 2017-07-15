
$( document ).ready(function() {
    // alimentacion();
    //
    $(document).on('click','#opc-alimentacion',function(e){
        e.preventDefault();
        $("#opc-contenedor").empty();
        alimentacion();
    });



    //Prueba de como se iniciaría la inserción
    $(document).on('click','#opc-medicacion',function(e){
        e.preventDefault();
        $("#opc-contenedor").empty();
        //Cambia la sentencia de abajo por el llamado a la función,
        // como lo hice con alimentacion ;)
        $("#opc-contenedor").append("<h2>MUAJAJA</h2>");
    });

});







//************************* FUNCION ALIMENTACION

// Manipula todos los eventos del apartado de alimentación
// dentro de apiario.html


alimentacion = function(){

    var jsonBusq;

    // Inserta los controles para gestión de alimentos
    $("#opc-contenedor").append(HTMLcontAlimentacion);
    $("#opc-contenedor").append(HTMLcontGestiones);
    // Inserta los controles para gestionar Ingredientes
    $("#agr-gestiones").append(HTMLgestIngredinetes);
    // Inserta los controles para gestionar Alimentos
    $("#agr-gestiones").append(HTMLgestAlimentos);
    // Inserta los controles para gestionar Preparaciones
    $("#agr-gestiones").append(HTMLgestPreparaciones);


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
            url: "../php/llenadoDatosFormAlimentos.php",
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
            data: $("#formBuscar").serialize(),
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
    $(document).on('click', '.edElem', function(e) {
        e.preventDefault();
        var padre = $(this).parent().parent();
        var nom = $(padre).children(':first-child').text();

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
            url: "../php/llenadoDatosFormAlimentos.php",
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


        for (var i = 0; i < jsonBusq.length; i++) {
            if(jsonBusq[i]["IdAlimento"] === nom ){
                $("#frmEdAlimento").children(':first-child').children(':nth-child(2)').val(jsonBusq[i]["NombreAlimento"]);
                $("#frmEdAlimento").children(':nth-child(2)').children(':nth-child(2)').val(jsonBusq[i]["Consistencia"]);
                $("#unidadMedicion").val(jsonBusq[i]["UnidadMedicion"]);
                alert(jsonBusq[i]["UnidadMedicion"]);
                var fecha = jsonBusq[i]["DiaCadAli"] + "-" + jsonBusq[i]["MesCadAli"] + "-" + jsonBusq[i]["AnioCadAli"];
                $("#frmEdAlimento").children(':nth-child(4)').children(':nth-child(2)').val(fecha);
            }
        }


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
            data: $("#formBuscarEl").serialize(),
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












}
