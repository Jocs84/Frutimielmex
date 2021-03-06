<?php

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        // Decodificando formato Json
        $body = json_decode(file_get_contents("php://input"), true);

        // Insertar user
        $retorno = generar::insert(
            $body['username'],
            $body['password']);

        if ($retorno) {
            // Código de éxito
            print json_encode(
                array(
                    'estado' => '1',
                    'mensaje' => 'Creación exitosa')
            );
        } else {
            // Código de falla
            print json_encode(
                array(
                    'estado' => '2',
                    'mensaje' => 'Creación fallida')
            );
        }
    }
 ?>
