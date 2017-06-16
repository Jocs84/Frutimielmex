<?php
    /**
    * Cosulta la información de un usuario a través de su username y password
    * (Para iniciar sesión)
    * y genera el JSON
    */

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $busqueda = $_POST['buscarAlimento'];

        $retorno = generar::buscarAlimentoNombre($busqueda);
        if ($retorno) {
            // $datos["estado"] = "1";
            // // $muajaja = json_encode($retorno);
            // $datos["datos"] = $retorno;
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