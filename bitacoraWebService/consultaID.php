<?php
    /**
    * Cosulta la información de un usuario a través de su ID
    * y genera el JSON
    */

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        if (isset($_GET['id'])) {
            //obtener parametro id
            $parametro = $_GET['id'];
            //tratar el retorno
            $retorno = generar::getById($parametro);
            if ($retorno) {
                $datos["estado"] = "1";
                $datos["datos"] = $retorno;
                print json_encode($datos);
            }else {
                //enviar respuesta con un JSON
                print json_encode(
                    array(
                        'estado' => '2',
                        'mensaje' => 'No se obtuvo registro'
                    )
                );
            }
        }else {
            //No se obtvo el ID
            print json_encode(
                array(
                    'estado' => '3',
                    'mensaje' => 'ID necesario'
                )
            );
        }
    }

 ?>
