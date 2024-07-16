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
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `Producto_ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Descripcion` varchar(400) DEFAULT NULL,
  `Precio` double DEFAULT NULL,
  `Stock` int DEFAULT NULL,
  `Tipo` varchar(20) DEFAULT NULL,
  `Foto_Url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Producto_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (2,'Heladera','Heladera con freezer',500000,179,'Electrodomestico','https://coppelar.vtexassets.com/arquivos/ids/1994868-800-auto?v=638460260269270000&width=800&height=auto&aspect=true'),(3,'Termo Lumilagro','Termo Inoxidable',30000,169,'Bazar','https://www.lumilagro.com.ar/wp-content/uploads/2020/12/termo-lumilagro-luminox-acero-1-1-800x800.jpg'),(4,'Tv Smart Samnsung','Tv Smart Samnsung 50\' UHD',750000,196,'Tecnología','https://www.rodo.com.ar/media/catalog/product/cache/fa0e57abd5b1b4b1618fda7601899c71/3/5/353037_1.jpg'),(5,'Impresora Color','HP Smart Tank 581',350000,192,'Tecnología','https://images.fravega.com/f300/2ad9d4e1fe2ba8bffac02f32f1b5d7bd.jpg.webp'),(7,'Lavarropa','Tambor y Funciones de Secado. Un tambor con diseño especial y funciones de secado efectivas',700000,70,'Electrodomestico','https://static7.depositphotos.com/1001877/779/i/950/depositphotos_7798364-stock-photo-closed-washing-machine.jpg'),(8,'Auriculares Bluetoot','Auriculares inalámbricos con sonido envolvente y micrófono incorporado.',49.99,150,'Electrónica','https://st3.depositphotos.com/8782978/19095/i/380/depositphotos_190956286-stock-photo-headphones-on-a-blue-surface.jpg'),(9,'Laptop Gamer','Laptop de alto rendimiento con tarjeta gráfica dedicada y pantalla de 15.6 pulgadas.',1200,30,'Electrónica','https://st2.depositphotos.com/1000128/8232/i/380/depositphotos_82327500-stock-photo-modern-laptops.jpg'),(10,'Smartwatch','Reloj inteligente con monitor de ritmo cardíaco y GPS integrado.',199.99,75,'Electrónica','https://st3.depositphotos.com/1000128/12778/i/380/depositphotos_127785496-stock-photo-smartphone-and-smart-watch.jpg'),(11,'Camiseta Deportiva','Camiseta de poliéster transpirable para actividades deportivas.',25,200,'Ropa','https://st5.depositphotos.com/75388132/68746/v/380/depositphotos_687469510-stock-illustration-white-grey-shirt-sport-jersey.jpg'),(12,'Bicicleta de Montaña','Bicicleta con suspensión delantera y 21 velocidades.',450,40,'Deportes','https://st2.depositphotos.com/1855397/11332/v/380/depositphotos_113323510-stock-illustration-mountain-bike-vector.jpg'),(13,'Cafetera Expreso','Cafetera de alta presión para preparar café expreso y capuchino.',89.99,60,'Hogar','https://st.depositphotos.com/2399299/2688/i/380/depositphotos_26889143-stock-photo-coffe-express.jpg'),(14,'Silla de Oficina','Silla ergonómica con soporte lumbar y ajuste de altura.',120,85,'Muebles','https://st2.depositphotos.com/1000674/5276/v/380/depositphotos_52760927-stock-illustration-office-chairs.jpg'),(15,'Teléfono Inteligente','Teléfono móvil con pantalla de 6.5 pulgadas y cámara de 48 MP.',699.99,100,'Electrónica','https://st2.depositphotos.com/1000128/5974/i/380/depositphotos_59744839-stock-photo-collection-of-modern-touchscreen-smartphones.jpg'),(16,'Mochila Escolar','Mochila con múltiples compartimentos y diseño ergonómico.',35,150,'Accesorios','https://st4.depositphotos.com/10614052/28863/i/380/depositphotos_288631826-stock-photo-school-backpack-on-white-background.jpg'),(18,'MicroComponente','Microcomponente',250000,20,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMKf0UAxMUdhsVa6soETnhQ_qPitQXLd1LDY6p3bS5k-yMdQlJ4EWp2dhCmw&s'),(19,'Pelota de Futbol','Pelota de Futbol AFA',60000,20,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTul2e0LsDV29ofkTgAW0tBu6gUcH56OU_oIA&usqp=CAU'),(22,'MicroComponente','Microcomponente',250000,20,NULL,'1720748395514.jpeg'),(23,'Secadora de Pelo','Descubre la forma más eficiente de secar y estilizar tu cabello',18000,100,NULL,'1720984291141.jpeg'),(25,'Horno','Horno Electrico',100000,20,NULL,'1720984524505.jpeg'),(26,'Planchita SilkSmooth Pro','Planchita de Pelo. Transforma tu rutina de peinado con la SilkSmooth Pro.',100000,30,NULL,'1720985146789.jpeg'),(30,'Caloventor','El Caloventor PowerHeat 3000W es la solución ideal para mantener tu espacio cálido y confortable durante los días fríos. Con una potencia impresionante de 3000 vatios, este caloventor está diseñado para calentar rápidamente habitaciones de tamaño mediano a grande, ofreciendo una distribución uniforme del calor y un ambiente acogedor en cuestión de minutos.',200000,20,NULL,'1720992056596.jpeg');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
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
