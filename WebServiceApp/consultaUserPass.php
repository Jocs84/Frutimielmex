<?php
    /**
    * Cosulta la información de un usuario a través de su username y password
    * (Para iniciar sesión)
    * y genera el JSON
    */

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        // Decodificando formato Json
        $body = json_decode(file_get_contents("php://input"), true);

        //llamando a la clase generar y al método getByUserPass
        $retorno = generar::iniciarSesion(
            $body['username'],
            $body['password']);

        if ($retorno) {
            // Código de éxito
            print json_encode(
                array(
                    'estado' => '1',
                    'mensaje' => 'Usuario y Contraseña existente')
            );
        } else {
            // Código de falla
            print json_encode(
                array(
                    'estado' => '2',
                    'mensaje' => 'Usuario o contraseña erronea')
            );
        }

    }

 ?>
