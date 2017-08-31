<?php

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {


        $tabla = $_POST['tabla'];

        $retorno = generar::buscarCP($tabla);
        if ($retorno) {

            print json_encode($retorno);
        }else {
            //enviar respuesta con un JSON
            $array = array(
                'estado' => '2',
                'mensaje' => 'No se obtuvo registro'
            );
            print json_encode($array);

        }

    }

 ?>
