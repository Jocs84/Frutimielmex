<?php
    /**
    * Estructuras de
    *   Busqueda
    *   Eliminar
    *   Agregar
    */
    require 'database.php';

    class generar{
        function __construct(){
        }


        /**
         * Retorna los valores ENUM de una columna de una tabla dada
         * @param Nombre de la tabla y nombre de la columna.
         * @return array Datos del registro
         */
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


        /**
         * Retorna todos registros de los alimentos
         * @param
         * @return array Datos del registro
         */
        public static function buscarAlimentoNombre($busqueda)
        {
            $consulta = "SELECT *
                        FROM alimentos
                        WHERE NombreAlimento
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



        /**
         * Obtiene los campos de un usuario con un identificador
         * determinado
         *
         * @param $NombreAlimento Identificador del Alimentos
         * @return mixed
         */
        public static function obtenerAlimentost($NombreAlimento)
        {

            $likebusq = '%' . $NombreAlimento . '%';
            // Consulta de la meta
            $consulta = "SELECT NombreAlimento,
                                DiaCadAli,
                                MesCadAli,
                                AnioCadAli
                                FROM Alimentos
                                WHERE NombreAlimento
                                LIKE  " . $likebusq;

            try {
                // Preparar sentencia
                $comando = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $comando->execute(array($idUsuario));
                // Capturar primera fila del resultado
                $row = $comando->fetch(PDO::FETCH_ASSOC);
                return $row;

            } catch (PDOException $e) {
                // Aquí puedes clasificar el error dependiendo de la excepción
                // para presentarlo en la respuesta Json
                return -1;
            }
        }



        /**
         * Actualiza un registro de la bases de datos basado
         * en los nuevos valores relacionados con un identificador
         *
         * @param $id            identificador
         * @param $username      nuevo titulo
         * @param $password      nueva descripcion
         */
        public static function updateAlimento(
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




        /**
         * Insertar una nueva meta
         *
         * @param $titulo
         * @return PDOStatement
         */
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

        public static function insertarAlimentoArtificial(
            $extra
        ){
            $consulta = "SELECT MAX(`IdAlimento`) as `IdAlimento` from `alimentos`";
            $busca = Database::getInstance()->getDb()->prepare($consulta);
            $busca->execute();
            $j = $busca->fetch(PDO::FETCH_ASSOC);
            // $j = json_encode($busca);

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



        /**
         * Eliminar el registro con el identificador especificado
         *
         * @param
         * @return
         */
        public static function eliminarReg($tabla,$elemento,$registro){
            // Sentencia DELETE
            $consulta = "DELETE FROM `" . $tabla . "` WHERE `" . $elemento . "` =" . $registro;

            // Preparar la sentencia
            // $sentencia = Database::getInstance()->getDb()->prepare($comando);

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



















        /**
         * Insertar una nueva meta
         *
         * @param $titulo
         * @return PDOStatement
         */
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



        /**
         * Retorna todos registros de los alimentos
         * @param
         * @return array Datos del registro
         */
        public static function buscarIngredienteNombre($busqueda)
        {
            $consulta = "SELECT *
                        FROM ingredientes
                        WHERE NombreIngrediente
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



        /**
         * Actualiza un registro de la bases de datos basado
         * en los nuevos valores relacionados con un identificador
         *
         * @param $id            identificador
         * @param $username      nuevo titulo
         * @param $password      nueva descripcion
         */
        public static function updateIngrediente(
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






























        /**
         * Insertar una nueva meta
         *
         * @param $titulo
         * @return PDOStatement
         */
        public static function insertarEncabPreparacion(
            $idAlimento,$idEmpleado,$diaPrep,$mesPrep,$anioPrep,
            $diaCadPrep,$mesCadPrep,$anioCadPrep
        )
        {
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


        public static function insertarPreparacion(
            $idIngrediente,$cantIngrediente
        ){
            $consulta = "SELECT MAX(`IdPreparacion`) as `IdPreparacion` from `encabpreparacion`";
            $busca = Database::getInstance()->getDb()->prepare($consulta);
            $busca->execute();
            $j = $busca->fetch(PDO::FETCH_ASSOC);
            // $j = json_encode($busca);

            $id = $j['IdPreparacion'];
            // Sentencia INSERT

            $comando = "INSERT INTO `preparacion`
                        (`IdPreparacion`, `IdIngrediente`, `CantIngrediente`) VALUES ";

            for ($i=0; $i < count($idIngrediente); $i++) {
                if($i != 0){
                    $comando = $comando . ",";
                }
                $comando = $comando . "(". $id .",". $idIngrediente[$i] .",". $cantIngrediente[$i] .")";
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




        /**
         * Retorna todos registros de los alimentos
         * @param
         * @return array Datos del registro
         */
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



        /**
         * Retorna todos registros de los alimentos
         * @param
         * @return array Datos del registro
         */
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







        public static function modificarEncabPreparacion(
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


        /**
         * Eliminar el registro con el identificador especificado
         *
         * @param
         * @return
         */
        public static function elimPreparacion($idPreparacion,$idIngrediente){
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

            $consulta = $consulta . ")"

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
