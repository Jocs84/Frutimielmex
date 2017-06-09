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
                        LIKE  '" . $busqueda . "'";
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
         * Obtiene los campos de un usuario con un identificador
         * determinado
         *
         * @param $idUsuario Identificador del usuario
         * @return mixed
         */
        public static function logIn($Usuario,$Contrasena)
        {
            // Consulta de la meta
            $consulta = "SELECT *
                                FROM users
                                WHERE username = ?
                                AND password = ?";

            try {
                // Preparar sentencia
                $comando = Database::getInstance()->getDb()->prepare($consulta);
                // Ejecutar sentencia preparada
                $comando->execute(array($Usuario,$Contrasena));
                // Capturar primera fila del resultado
                $row = $comando->fetch(PDO::FETCH_ASSOC);
                return $row;

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
        public static function update(
            $id,
            $username,
            $password
        )
        {
            // Creando consulta UPDATE
            $consulta = "UPDATE users" .
                " SET username=?, password=? " .
                "WHERE id=?";

            // Preparar la sentencia
            $cmd = Database::getInstance()->getDb()->prepare($consulta);

            // Relacionar y ejecutar la sentencia
            $cmd->execute(array($username, $password, $id));

            return $cmd;
        }




        /**
         * Insertar una nueva meta
         *
         * @param $titulo      titulo del nuevo registro
         * @param $descripcion descripción del nuevo registro
         * @param $fechaLim    fecha limite del nuevo registro
         * @param $categoria   categoria del nuevo registro
         * @param $prioridad   prioridad del nuevo registro
         * @return PDOStatement
         */
        public static function insert(
            $username,
            $password
        )
        {
            // Sentencia INSERT
            $comando = "INSERT INTO users ( " .
                "username," .
                " password)" .
                " VALUES( ?,?)";

            // Preparar la sentencia
            $sentencia = Database::getInstance()->getDb()->prepare($comando);

            return $sentencia->execute(
                array(
                    $username,
                    $password
                )
            );

        }



        /**
         * Eliminar el registro con el identificador especificado
         *
         * @param $idMeta identificador de la meta
         * @return bool Respuesta de la eliminación
         */
        public static function delete($idMeta)
        {
            // Sentencia DELETE
            $comando = "DELETE FROM users WHERE id=?";

            // Preparar la sentencia
            $sentencia = Database::getInstance()->getDb()->prepare($comando);

            return $sentencia->execute(array($id));
        }
    }
 ?>
