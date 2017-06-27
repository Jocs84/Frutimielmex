
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
        $("#agregarAlimento").append(HTMLFormAgregarAlimento);
        $("#seleccionantinatu").append(HTMLSelectTipoAlimentacion);
        $("#artinatu").append(HTMLAgregarArtificial);

        // AJAX para cargar las unidades de medida de un select
    //     $.ajax({
    //         type: "POST",
    //         url: "../php/llenadoDatosFormAlimentos.php",
    //         data: {"tabla":"Alimentos","busqueda" : "UnidadMedicion"},
    //         success: function(data){
    //             // val insertar = HTMLAgregarOptionSelec.replace("**",data[eldato]);
    //             // insertar = insertar.replace("%data%",data[eldato])
    //             // $('#UnidadMedicion').append(insertar);
       //
       //
    //         },
    //         dataType: 'json'
    //    });

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
        }else{
            $("#artinatu").empty();
            $("#artinatu").append(HTMLAgregarNatural);
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
            // data: {"buscarAlimento":"torta"},
            success: function(data){
                if(data.estado == '2'){

                }else{


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


    $(document).on('click', '.edElem', function(e) {
        e.preventDefault();
        var padre = $(this).parent().parent();
        var nom = $(padre).children(':first-child').text();
        alert(nom);
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

    $(document).on('click', '.elElem', function(e) {
        e.preventDefault();
        var padre = $(this).parent().parent();
        var nom = $(padre).children(':first-child').text();
        alert(nom);
        // $(padre).parent().prepend(HTMLEliminarConf.replace("%MENSAJE%","alimento"));
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
                    alert("Se eliminó");
                    // $("#insertarBusqueda").children(':first-child').remove();
                    // $(padre).parent().prepend(HTMLEliminarConf.replace("%MENSAJE%","ELIMINADO"));
                }
            },
            dataType: 'json'
       });
    });

    // $(document).on('click', '.cancelarAccion', function(e) {
    //     $("#insertarBusqueda").children(':first-child').remove();
    // });

    // $(document).on('click', '.eliElem', function(e) {
    //     var padre = $(this).parent().parent().parent();
    //     var nom = $(padre).children(':first-child').text();
    //     alert(nom);
    //
    //     /*
    //     $.ajax({
    //         type: "POST",
    //         url: "../php/eliminarPorId.php",
    //         data: '{"eliminar":' + nom + ', "tabla":"alimentos", "elemento":"IdAlimento"}',
    //         dataType: 'jsonp',
    //         success: function(data){
    //             alert(data.estado);
    //             if(data.estado == '2'){
    //                 alert("MUAJA");
    //                 $("#insertarBusqueda").children(':first-child').remove();
    //                 $(padre).parent().prepend(HTMLEliminarConf.replace("%MENSAJE%","no eliminado"));
    //             }else{
    //                 alert("GATO");
    //                 $("#insertarBusqueda").children(':first-child').remove();
    //                 $(padre).parent().prepend(HTMLEliminarConf.replace("%MENSAJE%","ELIMINADO"));
    //
    //             }
    //         }
    //    });*/
    //
    // });











}
