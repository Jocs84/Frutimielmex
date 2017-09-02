<?php
    /**
    * Cosulta la información de un usuario a través de su username y password
    * (Para iniciar sesión)
    * y genera el JSON
    */

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $idPreparacion = $_POST['IdPreparacion'];
        $idIngrediente = $_POST['IdIngrediente'];


        $retorno = generar::elimPreparacion(
            $idPreparacion,$idIngrediente
        );
        if ($retorno) {
            $array = array(
                'estado' => '1',
                'mensaje' => 'Elemento agregado'
            );
            print json_encode($array);

        }else {
            //enviar respuesta con un JSON
            $array = array(
                'estado' => '2',
                'mensaje' => 'No se registro'
            );
            print json_encode($array);

        }

    }

 ?>
