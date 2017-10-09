<?php
    /**
    * Cosulta la información de un usuario a través de su username y password
    * (Para iniciar sesión)
    * y genera el JSON
    */

    require 'movimientosUsuarios.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $nombre = $_POST['NomUsuario'];
        $apusuario = $_POST['ApUsuario'];
        $amusuario = $_POST['AmUsuario'];
        $nickusuario = $_POST['NickUsuario'];
        $passusuario = $_POST['PassUsuario'];
        $id = $_POST['id'];

        $retorno = generar::updateUsuario(
            $id,$nombre,$apusuario,$amusuario,$nickusuario,$passusuario
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
