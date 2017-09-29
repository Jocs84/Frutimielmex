<?php

    // Editar los campos de un registro de la tabla Alimentos,
    // así como los ingredinetes de este.
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST las siguientes variables
    // eN el formato
    //   VAR: FUNCION VARIABLE - CLAVE EN POST
    //     • id: ID del alimento a editar - 'id'
    //     • nombre: nombre del alimento a editar - 'nombreAli'
    //     • consistencia: consistencia del alimento a editar - 'Consistencia'
    //     • unidadmed: unidad de medida del alimento a
    //                  editar - 'UnidadMedicion'
    //     • fecha: fecha de caducidad del alimento a
    //              editar - 'anioCad'
    //     • tipo: tipo del alimento a editar, Natural o Artificial - 'tipo'
    //     • extra: información extra que irá almacenada en la tabla
    //              Natural o Artificial, dependiendo de la
    //              variable anterior - 'extra'



    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $id = $_POST['id'];
        $nombre = $_POST['nombreAli'];
        $consistencia = $_POST['Consistencia'];
        $unidadmed = $_POST['UnidadMedicion'];
        $fecha = $_POST['anioCad'];


        // Para manejar la fecha, dado que la base de datos tiene
        // dia, mes y año separados, se  la variable $fechaa
        // a través de los guiones (-) y almacena los valores
        // en el arreglo $token
        $token = strtok($fecha,"-");
        // Se crea un arreglo para almacenar los valores de
        // $dia, $mes y $anio, para su siguiente asignación a
        // dichas variables
        $data = array();
        // Variable para controlar el ciclo para obtener
        // $dia, $mes y $anio
        $i = 0;

        // Si $fecha se encuentra vacían a $dia, $mes y $anio
        // se les asignará un valor 0
        if ($fecha === "") {
            $dia = 0;
            $mes = 0;
            $anio = 0;
        }else{
            // Si $fecha tiene un valor, entonces se procede
            // a obtener los valores para $dia, $mes y $anio
            while ($token !== false){
                $data[$i] =  $token;
                $token = strtok("-");
                $i++;
            }
            $dia = $data[2];
            $mes = $data[1];
            $anio = $data[0];
        }

        $tipo = $_POST['tipo'];
        $extra = $_POST['extra'];


        $retorno = generar::editarAlimento(
            $id,$nombre,$consistencia,$unidadmed,$dia,$mes,$anio
        );
        // if ($retorno) {
        //     if($tipo == "Artificial"){
        //         $retorno = generar:: buscarGeneral($id);
        //         if ($retorno) {
        //             $array = array(
        //                 'estado' => '1',
        //                 'mensaje' => 'Elemento editado'
        //             );
        //             print json_encode($array);
        //         }else {
        //             $retorno = generar:: eliminarReg("natural","IdAlimento",$id);
        //             $retorno = generar:: insertarAlimentoArtificial()
        //             $array = array(
        //                 'estado' => '2',
        //                 'mensaje' => 'No se registró'
        //             );
        //             print json_encode($array);
        //         }
            // }else{
            //     $retorno = generar::insertarAlimentoNatural(
            //         $extra
            //     );
            //     if ($retorno) {
            //         $array = array(
            //             'estado' => '1',
            //             'mensaje' => 'Elemento agregado'
            //         );
            //         print json_encode($array);
            //     }else {
            //         $array = array(
            //             'estado' => '2',
            //             'mensaje' => 'No se registró'
            //         );
            //         print json_encode($array);
            //     }
            // }

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
