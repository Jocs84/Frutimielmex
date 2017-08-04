<?php
    /**
    * Cosulta la información de un usuario a través de su username y password
    * (Para iniciar sesión)
    * y genera el JSON
    */

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $tabla = $_POST['tabla'];
        $busqueda = $_POST['busqueda'];


        $retorno = generar::obtenerEnum($tabla,$busqueda);
        if ($retorno) {
            print json_encode($retorno);
        }else {
            //enviar respuesta con un JSON
            print json_encode(
                array(
                    'estado' => '2',
                    'mensaje' => 'No se obtuvo registro'
                )
            );
        }

    }

 ?>
