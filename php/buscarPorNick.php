<?php
    /**
    * Cosulta la información de un usuario a través de su username y password
    * (Para iniciar sesión)
    * y genera el JSON
    */

    require 'movimientosUsuarios.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $busqueda = $_POST['nickusuario'];
        //$busqueda = "H.sierra.gtz";
        $columna = $_POST['columna'];
        //$columna = "NickUsuario";
        $tabla = $_POST['tabla'];
        //$tabla = "usuarios";
        $retorno = generar::buscarPorNick($busqueda,$tabla,$columna);



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
