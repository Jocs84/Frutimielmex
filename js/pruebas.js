// $(".alert-success").fadeTo(2000, 500).slideUp(500, function(){
//     $(".alert-success").slideUp(500);
// });

// $(".alert-success").alert('close'); }, 8000);



$( document ).ready(function() {
    $("#boton-pro").click(function(){
        $("#muajaja").append('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>¡Éxito!</strong> Tu regitro ha sido eliminado correctamente.</div>');
    });
    window.setTimeout(function() {
        $(".alert-success").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
        });
    }, 4000);
});
