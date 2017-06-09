
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
        $.ajax({
            type: "POST",
            url: "../php/llenadoDatosFormAlimentos.php",
            data: {"tabla":"Alimentos","busqueda" : "UnidadMedicion"},
            success: function(data){
                // val insertar = HTMLAgregarOptionSelec.replace("**",data[eldato]);
                // insertar = insertar.replace("%data%",data[eldato])
                // $('#UnidadMedicion').append(insertar);


            },
            dataType: 'json'
       });

    });


    // Evento del boton Modificar Alimento, el cual buscador
    // para después proceder a editar los datos.
    $("#btnModificiarAlimento").click(function(){
        $("#insertar-gestion").empty();
        $("#insertar-gestion").append(HTMLModificarAlimento);
    });

    $("#formBuscar").submit(function(e){
    //     $(".table .table-striped").append(HTMLTablaBusqueda);
    //     $("#insertarBusqueda").append(HTMLElementEncontrado);
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../php/buscarPorNombre.php",
            // data: $("#formBuscar").serialize(),
            data: $("#formBuscar").serialize(),
            success: function(data){
                console.log("Muajaja");
            },
            dataType: 'json'
       });

        console.log("MUAJAJA");
    });

    // $("#formBuscar").ajaxForm(url:'../php/buscarPorNombre.php', type: 'POST');

}
