-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tu_mercado
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Cliente_ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) DEFAULT NULL,
  `Direccion` varchar(20) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Email` varchar(20) DEFAULT NULL,
  `Password` varchar(60) NOT NULL,
  `Apellido` varchar(30) DEFAULT NULL,
  `Token` varchar(255) DEFAULT NULL,
  `Confirmado` tinyint(1) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `foto_user` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Cliente_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ezequiel',NULL,NULL,'ezequiel@gmail.com','$2a$08$nN71P/Bl77wOe3UfjDi3aeAh8oMwMHbaAheqK..dHtfboZrXGspyO',NULL,NULL,1,'admin',NULL),(5,'Ezequiel','Bolivar2445','5422884','eze@gmail.com','$2a$08$UG2hqbTuIxeBZGOb69IkgOoSoOme20zz3kuX7YVAEpo','Reyes',NULL,NULL,'user',NULL),(6,'Ezequiel','Bolivar2445','5422884','ezer@gmail.com','$2a$08$r34QRPi72sTiANNYBmxDL.TpO6V5ocz2.7YSRbTrOF9','Reyes',NULL,NULL,'user',NULL),(7,'Ezequiel','Bolivar2445','5422884','ezereyes@gmail.com','$2a$08$u.P2e199R1qS5wOwGqsWNOwPNiFnRbYC9AQDZLjDHyX','Reyes',NULL,NULL,'user',NULL),(13,'Robin','San Juan247','5545655','robin@gmail.com','$2a$08$CuuA4KBSISTMeA1qk0Czq.8zux/USSdBB/iYjp39VEHY3UBTfo5aK','Hood','$2a$08$04e7r7B9Nrr8dqjT4gHaxO7PxNqgUveFpehUVlppkTRtS4GB3lOmy',1,'user','1720844184280.jpeg'),(38,'Benicio','Flores2546','16516513206516','benicio@gmail.com','$2a$08$JoXr8ITCp2c/dpv.o4CeEeCVOi9cItyxcq/IYDvILMZm0HjaXnY1i','Flores','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImlhdCI6MTcyMDU0MjQ4NSwiZXhwIjoxNzIwNTQ2MDg1fQ.UI0qga-F0BgctRkFiBooIuPx_UTvYOElA5KzdWC13qU',NULL,'user','1720721331613.jpeg'),(41,'Romulo','Alvarado2551','2234789541','romulo@gmail.com','$2a$08$vBqbg6Tmjv9CiXYnfCHi4.mquz2WPbj5YXRKeQEbhlcE4wVSMmBgW','Perez',NULL,1,'user',NULL),(43,'Jorge','Giacobini2204','2235478625','jorgee@gmail.com','$2a$08$z/psjTH7viimGCAVvbBK3u8aVCHdbj/xiR2ASLT0SvbBP0SbCDQe6','Linarez',NULL,1,'user',NULL),(44,'Francisco','Colombia2526','2235478960','francisco@gmail.com','$2a$08$FF7.dShEp87cd/n5PGMG6OsUofNeFlp8zq/QeEde1BmZcemE/CaRu','Pere',NULL,1,'user',NULL),(45,'Jorge','Giacobini2204','2235478625','jorgee@gmail.com','$2a$08$d2BAIBrQUz.WMaZZZQYj0uV695SD54C71a2Frz.gHtr4BtuwZvu.2','Linarez','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImlhdCI6MTcyMDk3MzA4NiwiZXhwIjoxNzIwOTc2Njg2fQ.BftDDg9jS1QnLW4xftWL4vMCyp1Y46NREN1ijQvshcU',NULL,'user',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-15 21:19:31
