<?php

    // Archivo que contiene las siguientes funciones:
    //     • iniciarSesion
    //
    // Necesita del archivo database.php
    //
    require 'database-ppal.php';

    class generar{
        function __construct(){
        }


        // ********************************************
        // *
        // *   FUNCIONES BASICAS
        // *
        // ********************************************

        //  **
        //  * CONSULTA DE USUARIO PARA INICIAR SESIÓN
        //  *
        //  * @param $usuario,$contrasena
        //  * @return PDOStatement
        //  *
        //  **
        public static function iniciarSesion($usuario,$contrasena){
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











    }
 ?>
