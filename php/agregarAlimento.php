<?php

    // Agrega un registro a la tabla alimento, así
    // como las tablas artificial y natural, según sea
    // el caso.
    //
    // Necesita del archivo movimientos.php
    //
    // Recibe por el método POST las siguientes variables columna
    // eN el formato
    //   VAR: FUNCION VARIABLE - CLAVE EN POST
    //     • nombre: nombre del alimento - 'nombreAli'
    //     • consistencia: consistencia del alimento - 'Consistencia'
    //     • unidadmed: unidad de medida del alimento - 'UnidadMedicion'
    //     • fecha: fecha de caducidad del alimento,
    //              formato aaaa-mm-dd - 'anioCad'
    //     • tipo: tipo de alimento, Natural o Artificial - 'tipo'
    //     • extra: información extra que irá almacenada en la tabla
    //              Natural o Artificial, dependiendo de la
    //              variable anterior - 'extra'



    require 'movimientos.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

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


        // Se llama a la función insertarAlimento() con
        //     $nombre,
        //     $consistencia,
        //     $unidadmed,
        //     $dia,
        //     $mes,
        //     $anio
        // Para agregar un nuevo alimento a la tabla Alimentos,
        // la cual tendrá un retorno si es se agregó el nuevo registro,
        // de lo contrario, no retornará.
        $retorno = generar::insertarAlimento(
            $nombre,$consistencia,$unidadmed,$dia,$mes,$anio
        );

        // Si retorna, entonces se procede a agregar en la tabla
        // Artificial o Natural, dependiendo del valor de $tipo
        // y enviar el valor extra que corresponde a la información
        // del alimento respecto al tipo
        // Si es correcto retorna un JSON con un estado 1 y el mensaje
        // "elemento agrgado"
        // Si no es correcto, retorna un JSON con un estado 2 y un
        // mensaje "No se regristró"
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
