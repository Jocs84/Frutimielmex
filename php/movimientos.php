<?php

    // Archivo que contiene las siguientes funciones:
    //     • obtenerEnum
    //     • insertarAlimento
    //     • insertarAlimentoArtificial
    //     • insertarAlimentoNatural
    //     • insertarIngrediente
    //     • insertarEncabPreparacion
    //     • insertarPreparacion
    //     • insertarPreparacionMod
    //     • buscarAlimePrep
    //     • buscarGeneral
    //     • buscarPorId
    //     • buscarPorNombre
    //     • buscarPreparacion
    //     • editarAlimento
    //     • editarIngrediente
    //     • editarEncabPreparacion
    //     • eliminarReg
    //     • elimIngPreparacion
    //
    // Necesita del archivo database.php
    //
    require 'database.php';

    class generar{
        function __construct(){
        }


        // ********************************************
        // *
        // *   FUNCIONES BASICAS
        // *
        // ********************************************

        //  **
        //  * OBTENER LOS VALORES DEL ENUM DE UNA COLUMNA (GENERAL)
        //  *
        //  * @param $tabla, $busqueda
        //  * @return PDOStatement
        //  *
        //  **
        public static function obtenerEnum($tabla,$busqueda){
            $consulta = "SHOW COLUMNS FROM " . $tabla . " LIKE '" . $busqueda . "'";;
            // $consulta = "DESCRIBE" . $tabla;

            try {
                $comando = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $comando->execute();
                return $comando->fetchAll(PDO::FETCH_ASSOC);

            } catch (PDOException $e) {
                return false;
            }
        }







        // ********************************************
        // *
        // *   FUNCIONES PARA AGREGAR
        // *
        // ********************************************



        //  **
        //  * INSERTAR UN NUEVO ALIMENTO (GENERAL)
        //  *
        //  * @param $nombre, $consistencia, $unidadmed, $dia, $mes, $anio
        //  * @return PDOStatement
        //  *
        //  **
        public static function insertarAlimento(
            $nombre,$consistencia,$unidadmed,$dia,$mes,$anio
        )
        {
            // Sentencia INSERT
            $comando = "INSERT INTO `alimentos`(
                    `IdAlimento`,
                    `NombreAlimento`,
                    `Consistencia`,
                    `UnidadMedicion`,
                    `DiaCadAli`,
                    `MesCadAli`,
                    `AnioCadAli`)
                    VALUES
                    (NULL ,  '". $nombre."',  '". $consistencia."',
                    '". $unidadmed."',  ". $dia.",  ". $mes.",  ". $anio.")";

            try {
                $sentencia = Database::getInstance()->getDb()->prepare($comando);
                // Ejecutar sentencia preparada
                $sentencia->execute();
                $json = json_encode($sentencia);
                return $json;
            } catch (PDOException $e) {
                echo $e;
                return false;
            }
        }


        //  **
        //  * INSERTAR UN NUEVO ALIMENTO (ARTIFICIAL)
        //  *
        //  * @param $extra
        //  * @return PDOStatement
        //  *
        //  **
        public static function insertarAlimentoArtificial(
            $extra
        ){
            $consulta = "SELECT MAX(`IdAlimento`) as `IdAlimento` from `alimentos`";
            $busca = Database::getInstance()->getDb()->prepare($consulta);
            $busca->execute();
            $j = $busca->fetch(PDO::FETCH_ASSOC);

            $id = $j['IdAlimento'];
            // Sentencia INSERT
            $comando = "INSERT INTO `Artificial`(`IdAlimento`, `TipoAlimento`)
                        VALUES (". $id .",'". $extra ."')";
            try {
                $sentencia = Database::getInstance()->getDb()->prepare($comando);
                // Ejecutar sentencia preparada
                $sentencia->execute();
                $json = json_encode($sentencia);
                return $json;
            } catch (PDOException $e) {
                echo $e;
                return false;
            }
        }


        //  **
        //  * INSERTAR UN NUEVO ALIMENTO (NATURAL)
        //  *
        //  * @param $extra
        //  * @return PDOStatement
        //  *
        //  **
        public static function insertarAlimentoNatural(
            $extra
        ){
            $consulta = "SELECT MAX(`IdAlimento`) as `IdAlimento` from `alimentos`";
            $busca = Database::getInstance()->getDb()->prepare($consulta);
            $busca->execute();
            $j = $busca->fetch(PDO::FETCH_ASSOC);

            $id = $j['IdAlimento'];
            // Sentencia INSERT
            $comando = "INSERT INTO `Natural`(`IdAlimento`, `LugarObtencion`)
                        VALUES (". $id .",'". $extra ."')";
            try {
                $sentencia = Database::getInstance()->getDb()->prepare($comando);
                // Ejecutar sentencia preparada
                $sentencia->execute();
                $json = json_encode($sentencia);
                return $json;
            } catch (PDOException $e) {
                echo $e;
                return false;
            }
        }


        //  **
        //  * INSERTAR UN NUEVO INGREDIENTE
        //  *
        //  * @param $nombre, $unidadmed, $precio, $dia,$mes, $anio
        //  * @return PDOStatement
        //  *
        //  **
        public static function insertarIngrediente(
            $nombre,$unidadmed,$precio,$dia,$mes,$anio
        )
        {
            // Sentencia INSERT
            $comando = "INSERT INTO `ingredientes`
                        (`IdIngrediente`,
                        `NombreIngrediente`,
                        `PrecioIngrediente`,
                        `UnidadMedida`,
                        `DiaCadIng`,
                        `MesCadIng`,
                        `AnioCadIng`)
                        VALUES (NULL,
                            '". $nombre . "',
                            '". $precio . "',
                            '". $unidadmed . "',
                            '". $dia  . "',
                            '". $mes . "',
                            '". $anio . "')";
            try {
                $sentencia = Database::getInstance()->getDb()->prepare($comando);
                // Ejecutar sentencia preparada
                $sentencia->execute();
                $json = json_encode($sentencia);
                return $json;
            } catch (PDOException $e) {
                echo $e;
                return false;
            }
        }



        //  **
        //  * INSERTAR UNA NUEVA PREPARACIÓN - TABLA encabpreparacion
        //  *
        //  * @param $idAlimento, $idEmpleado, $diaPrep, $mesPrep, $anioPrep,
        //  *        $diaCadPrep, $mesCadPrep, $anioCadPrep
        //  * @return PDOStatement
        //  *
        //  **
        public static function insertarEncabPreparacion(
            $idAlimento,$idEmpleado,$diaPrep,$mesPrep,$anioPrep,
            $diaCadPrep,$mesCadPrep,$anioCadPrep
        ){
            // Sentencia INSERT
            $comando = "INSERT INTO `encabpreparacion`
                        (`IdPreparacion`,
                        `IdAlimento`,
                        `IdEmpleado`,
                        `PrecioPreparacion`,
                        `DiaPrep`,
                        `MesPrep`,
                        `AnioPrep`,
                        `DiaCadPrep`,
                        `MesCadPrep`,
                        `AnioCadPrep`)
                        VALUES (NULL,
                            ". $idAlimento .",
                            ". $idEmpleado .",
                            0,
                            ". $diaPrep .",
                            ". $mesPrep .",
                            ". $anioPrep .",
                            ". $diaCadPrep .",
                            ". $mesCadPrep .",
                            ". $anioCadPrep .")";
            try {
                $sentencia = Database::getInstance()->getDb()->prepare($comando);
                // Ejecutar sentencia preparada
                $sentencia->execute();
                $json = json_encode($sentencia);
                return $json;
            } catch (PDOException $e) {
                echo $e;
                return false;
            }
        }


        //  **
        //  * INSERTAR INGREDIENTES DE PREPARACIÓN - TABLA preparacion
        //  *
        //  * @param $idIngrediente, $cantIngrediente
        //  * @return PDOStatement
        //  *
        //  **
        public static function insertarPreparacion(
            $idIngrediente,$cantIngrediente
        ){
            $consulta = "SELECT MAX(`IdPreparacion`) as `IdPreparacion` from `encabpreparacion`";
            $busca = Database::getInstance()->getDb()->prepare($consulta);
            $busca->execute();
            $j = $busca->fetch(PDO::FETCH_ASSOC);

            $id = $j['IdPreparacion'];
            // Sentencia INSERT
            $comando = "INSERT INTO `preparacion`
                        (`IdPreparacion`, `IdIngrediente`, `CantIngrediente`) VALUES ";

            for ($i=0; $i < count($idIngrediente); $i++) {
                if($i != 0){$comando = $comando . ",";}
                $comando = $comando . "(". $id .",". $idIngrediente[$i] .",". $cantIngrediente[$i] .")";
            }

            try {
                $sentencia = Database::getInstance()->getDb()->prepare($comando);
                // Ejecutar sentencia preparada
                $sentencia->execute();
                $json = json_encode($sentencia);
                return $json;
            } catch (PDOException $e) {
                echo $e;
                return false;
            }
        }


        //  **
        //  * INSERTAR INGREDIENTES DE PREPARACIÓN - TABLA preparacion
        //  * (Edición)
        //  *
        //  * @param $idPreparacion, $idIngrediente, $cantIngrediente
        //  * @return PDOStatement
        //  *
        //  **
        public static function insertarPreparacionMod(
            $idPreparacion,$idIngrediente,$cantIngrediente
        ){
            $comando = "INSERT INTO `preparacion`
                            (`IdPreparacion`, `IdIngrediente`, `CantIngrediente`) VALUES ";

            for ($i=0; $i < count($idIngrediente); $i++) {
                if($i != 0){
                    $comando = $comando . ",";
                }
                $comando = $comando . "(". $idPreparacion .",". $idIngrediente[$i] .",". $cantIngrediente[$i] .")";
            }
            // return $comando;
            try {
                $sentencia = Database::getInstance()->getDb()->prepare($comando);
                // Ejecutar sentencia preparada
                $sentencia->execute();
                $json = json_encode($sentencia);
                return $json;

            } catch (PDOException $e) {
                echo $e;
                return false;
            }

        }










        // ********************************************
        // *
        // *   FUNCIONES PARA BUSCAR
        // *
        // ********************************************


        //  **
        //  * BUSCAR LOS ALIMENTOS EN UNA PREPARACION
        //  *
        //  * @param $busqueda
        //  * @return PDOStatement
        //  *
        //  **
        public static function buscarAlimePrep($busqueda)
        {
            $consulta = "SELECT `IdPreparacion`,
                                `IdIngrediente`,
                                `NombreIngrediente`,
                                `CantIngrediente`
                        FROM `preparacion` INNER JOIN  `ingredientes`
                        USING(`IdIngrediente`)
                        WHERE `IdPreparacion` =" . $busqueda;

            try {
                $comando = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $comando->execute();
                return $comando->fetchAll(PDO::FETCH_ASSOC);

            } catch (PDOException $e) {
                return false;
            }
        }


        //  **
        //  * BUSQUEDA GENERAL - Cualquier tabla ;)
        //  *
        //  * @param $tabla
        //  * @return PDOStatement
        //  *
        //  **
        public static function buscarGeneral($tabla)
        {
            $consulta = "SELECT *
                        FROM `" . $tabla . "`";
            try {
                $comando = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $comando->execute();
                return $comando->fetchAll(PDO::FETCH_ASSOC);

            } catch (PDOException $e) {
                return false;
            }
        }


        //  **
        //  * BUSQUEDA POR ID - Cualquier tabla ;)
        //  *
        //  * @param $tabla, $campo, $busqueda
        //  * @return PDOStatement
        //  *
        //  **
        public static function buscarPorId($tabla,$campo,$busqueda)
        {
            $consulta = "SELECT *
                        FROM `" . $tabla . "`
                        WHERE `" . $campo ."`
                        =  " . $busqueda;
            try {
                $comando = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $comando->execute();
                return $comando->fetchAll(PDO::FETCH_ASSOC);

            } catch (PDOException $e) {
                return false;
            }
        }


        //  **
        //  * BUSQUEDA POR NOMBRE - Cualquier tabla ;)
        //  *
        //  * @param $busqueda, $tabla, $columna
        //  * @return PDOStatement
        //  *
        //  **
        public static function buscarPorNombre($busqueda,$tabla,$columna)
        {
            $consulta = "SELECT *
                        FROM `". $tabla ."`
                        WHERE `". $columna . "`
                        LIKE  '%" . $busqueda . "%'";
            try {
                $comando = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $comando->execute();
                return $comando->fetchAll(PDO::FETCH_ASSOC);

            } catch (PDOException $e) {
                return false;
            }
        }



        //  **
        //  * BUSQUEDA DE PREPARACION
        //  *
        //  * @param $busqueda
        //  * @return PDOStatement
        //  *
        //  **
        public static function buscarPreparacion($busqueda)
        {
            $consulta = "SELECT `IdPreparacion`,
                                `IdAlimento`,
                                `NombreAlimento`,
                                `IdEmpleado`,
                                `PrecioPreparacion`,
                                `DiaPrep`,
                                `MesPrep`,
                                `AnioPrep`,
                                `DiaCadPrep`,
                                `MesCadPrep`,
                                `AnioCadPrep`
                        FROM `encabpreparacion` INNER JOIN  `alimentos`
                        USING(`IdAlimento`)
                        WHERE `NombreAlimento` LIKE  '%" . $busqueda . "%'";


            try {
                $comando = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $comando->execute();
                return $comando->fetchAll(PDO::FETCH_ASSOC);

            } catch (PDOException $e) {
                return false;
            }
        }







        // ********************************************
        // *
        // *   FUNCIONES PARA EDITAR
        // *
        // ********************************************


        //  **
        //  * EDITAR REGISTRO DE ALIMENTO
        //  *
        //  * @param $id ,$nombre ,$consistencia, $unidadmed, $dia, $mes, $anio
        //  * @return PDOStatement
        //  *
        //  **
        public static function editarAlimento(
            $id,$nombre,$consistencia,$unidadmed,$dia,$mes,$anio
        )
        {
            // Creando consulta UPDATE
            $consulta = "UPDATE `alimentos`
                            SET `NombreAlimento`= '". $nombre ."',
                            `Consistencia`='". $consistencia ."',
                            `UnidadMedicion`='".$unidadmed."',
                            `DiaCadAli`=". $dia .",
                            `MesCadAli`= ". $mes .",
                            `AnioCadAli`= ". $anio ."
                            WHERE `IdAlimento`=  " . $id;

            try {
                $sentencia = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $sentencia->execute();
                $json = json_encode($sentencia);
                return $json;

            } catch (PDOException $e) {
                echo $e;
                return false;
            }
        }



        //  **
        //  * EDITAR REGISTRO DE INGREDIENTE
        //  *
        //  * @param $id, $nombre, $unidadmed, $precio, $dia, $mes, $anio
        //  * @return PDOStatement
        //  *
        //  **
        public static function editarIngrediente(
            $id,$nombre,$unidadmed,$precio,$dia,$mes,$anio
        ){
            // Creando consulta UPDATE
            $consulta = "UPDATE `ingredientes` SET
                        `NombreIngrediente`= '". $nombre ."',
                        `PrecioIngrediente`= '". $precio ."',
                        `UnidadMedida`= '". $unidadmed ."',
                        `DiaCadIng`= ". $dia .",
                        `MesCadIng`= ". $mes .",
                        `AnioCadIng`= ". $anio ."
                        WHERE `IdIngrediente` = " . $id;

            try {
                $sentencia = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $sentencia->execute();
                $json = json_encode($sentencia);
                return $json;

            } catch (PDOException $e) {
                echo $e;
                return false;
            }
        }

        //  **
        //  * EDITAR REGISTRO DE ENCABPREPARACION
        //  *
        //  * @param $idPreparacion ,$idAlimento, $idEmpleado, $diaPrep,
        //  *         $mesPrep, $anioPrep, $diaCadPrep, $mesCadPrep, $anioCadPrep
        //  * @return PDOStatement
        //  *
        //  **
        public static function editarEncabPreparacion(
            $idPreparacion,$idAlimento,$idEmpleado,$diaPrep,$mesPrep,$anioPrep,
            $diaCadPrep,$mesCadPrep,$anioCadPrep
        )
        {
            // Creando consulta UPDATE
            $consulta = "UPDATE `encabpreparacion`
                            SET `IdAlimento`= '". $idAlimento."',
                            `IdEmpleado`= '". $idEmpleado ."',
                            `DiaPrep`= '". $diaPrep ."',
                            `MesPrep`= '". $mesPrep ."',
                            `AnioPrep`= '". $anioPrep ."',
                            `DiaCadPrep`= '". $diaCadPrep ."',
                            `MesCadPrep`= '". $mesCadPrep ."',
                            `AnioCadPrep`= '". $anioCadPrep ."'
                            WHERE `IdPreparacion` =" . $idPreparacion;

            try {
                $sentencia = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $sentencia->execute();
                $json = json_encode($sentencia);
                return $json;

            } catch (PDOException $e) {
                echo $e;
                return false;
            }
        }













        // ********************************************
        // *
        // *   FUNCIONES PARA ELIMINAR
        // *
        // ********************************************


        //  **
        //  * ELIMINAR REGISTRO POR ID
        //  *
        //  * @param $tabla,$elemento,$registro
        //  * @return PDOStatement
        //  *
        //  **
        public static function eliminarReg($tabla,$elemento,$registro){
            // Sentencia DELETE
            $consulta = "DELETE FROM `" . $tabla . "` WHERE `" . $elemento . "` =" . $registro;

            try {
                $comando = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $comando->execute();
                //Retorna el numero de filas afectadas con el último movimiento
                return $comando->rowCount();

            } catch (PDOException $e) {
                return false;
            }
        }





        //  **
        //  * ELIMINAR INGREDIENTES DE LA TABLA PREPARACION
        //  *
        //  * @param $idPreparacion, $idIngrediente
        //  * @return PDOStatement
        //  *
        //  **
        public static function elimIngPreparacion($idPreparacion,$idIngrediente){
            // Sentencia DELETE
            $consulta = "DELETE FROM `preparacion`
                            WHERE (`IdPreparacion`,`IdIngrediente`)
                            IN (" ;


            for ($i=0; $i < count($idIngrediente); $i++) {
                if($i != 0){
                    $consulta = $consulta . ",";
                }
                    $consulta = $consulta . "(". $idPreparacion[$i] .",". $idIngrediente[$i].")";
            }

            $consulta = $consulta . ")";

            // return $sentencia->execute(array($id));
            try {
                $comando = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $comando->execute();
                //Retorna el numero de filas afectadas con el último movimiento
                return $comando->rowCount();

            } catch (PDOException $e) {
                return false;
            }
        }









    }
 ?>
