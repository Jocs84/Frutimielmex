<?php
    /**
    * Recibe parámetros para su posterior guardado en base de datos de la tabla usuarios
    */

    require 'movimientosUsuarios.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $nombre = $_POST['NomUsuario']; // el nombre [x] debe llamarse igual de como se está enviando en el ajax, nombre del campo
        $apusuario = $_POST['ApUsuario'];
        $amusuario = $_POST['AmUsuario'];
        $nickusuario = $_POST['NickUsuario'];
        $passusuario = $_POST['PassUsuario'];

        $retorno = generar::insertarUsuario(
            $nombre,$apusuario,$amusuario,$nickusuario,$passusuario
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
