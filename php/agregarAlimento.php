<?php
    /**
    * Cosulta la información de un usuario a través de su username y password
    * (Para iniciar sesión)
    * y genera el JSON
    */

    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $nombre = $_POST['nombreAli'];
        $consistencia = $_POST['Consistencia'];
        $unidadmed = $_POST['UnidadMedicion'];
        $fecha = $_POST['anioCad'];
        $token = strtok($fecha,"-");
        $data = array();
        $i = 0;
        while ($token !== false){
            $data[$i] =  $token;
            $token = strtok("-");
            $i++;
        }
        $dia = $data[0];
        $mes = $data[1];
        $anio = $data[2];
        $tipo = $_POST['tipo'];
        $extra = $_POST['extra'];


        $retorno = generar::insertarAlimento(
            $nombre,$consistencia,$unidadmed,$dia,$mes,$anio
        );
        if ($retorno) {
            if($tipo == "Artificial"){
                $retorno = generar::insertarAlimentoArtificial(
                    $extra
                );
                if ($retorno) {
                    $array = array(
                        'estado' => '1',
                        'mensaje' => 'Elemento agregado'
                    );
                    print json_encode($array);
                }else {
                    $array = array(
                        'estado' => '2',
                        'mensaje' => 'No se registró'
                    );
                    print json_encode($array);
                }
            }else{
                $retorno = generar::insertarAlimentoNatural(
                    $extra
                );
                if ($retorno) {
                    $array = array(
                        'estado' => '1',
                        'mensaje' => 'Elemento agregado'
                    );
                    print json_encode($array);
                }else {
                    $array = array(
                        'estado' => '2',
                        'mensaje' => 'No se registró'
                    );
                    print json_encode($array);
                }
            }

            // $array = array(
            //             'estado' => '1',
            //             'mensaje' => 'Elemento agregado'
            //         );
            //         print json_encode($array);

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
