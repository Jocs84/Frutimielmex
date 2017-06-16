
$( document ).ready(function() {
    // $("#opc-alimentación").click(function(){
        alimentacion();
    // });

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




alimentacion = function(){

    // Inserta los controles para gestión de alimentos
    $("#opc-contenedor").append(HTMLcontAlimentacion);
    $("#opc-contenedor").append(HTMLcontGestiones);
    // Inserta los controles para gestionar Ingredientes
    $("#agr-gestiones").append(HTMLgestIngredinetes);
    // Inserta los controles para gestionar Alimentos
    $("#agr-gestiones").append(HTMLgestAlimentos);
    // Inserta los controles para gestionar Preparaciones
    $("#agr-gestiones").append(HTMLgestPreparaciones);


    // Evento del boton Agregar Alimento, el cual despliega
    // El formulario para agregar el alimento
    $("#btnAgregarAlimento").click(function(){
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLAgregarAlimento);
        $("#agregarAlimento").append(HTMLFormAgregarAlimento);
        $("#seleccionantinatu").append(HTMLSelectTipoAlimentacion);

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
                   //  Vacia el contenedor en caso de busquedas anteriores
                    $("#insBusq").empty();
                    //agrega la estructura de la tabla contenedora de la busqueda
                    $("#insBusq").append(HTMLTablaBusqueda);
                    for (var i = 0; i < data.length; i++) {
                        var rem = HTMLElementEncontrado.replace("%NOMBRE%",data[i]["NombreAlimento"]);
                        rem = rem.replace("%FECHA%",data[i]["DiaCadAli"] + "/" + data[i]["MesCadAli"] + "/" + data[i]["AnioCadAli"]);
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

    // $(".edElem").click(function(){
    //     var padre = $(this).parent();
    //     var nom = $(padre+":first").text();
    //     alert(nom);
    // });

}
