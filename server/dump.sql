-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: technest
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_cart`
--

DROP TABLE IF EXISTS `api_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_cart_user_id_id_cf86ee80_fk_api_user_id` (`user_id_id`),
  CONSTRAINT `api_cart_user_id_id_cf86ee80_fk_api_user_id` FOREIGN KEY (`user_id_id`) REFERENCES `api_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_cart`
--

LOCK TABLES `api_cart` WRITE;
/*!40000 ALTER TABLE `api_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_cartproduct`
--

DROP TABLE IF EXISTS `api_cartproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_cartproduct` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `cart_id_id` int NOT NULL,
  `product_id_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_cartproduct_cart_id_id_33ae9d93_fk_api_cart_id` (`cart_id_id`),
  KEY `api_cartproduct_product_id_id_441ea0bd_fk_api_product_id` (`product_id_id`),
  CONSTRAINT `api_cartproduct_cart_id_id_33ae9d93_fk_api_cart_id` FOREIGN KEY (`cart_id_id`) REFERENCES `api_cart` (`id`),
  CONSTRAINT `api_cartproduct_product_id_id_441ea0bd_fk_api_product_id` FOREIGN KEY (`product_id_id`) REFERENCES `api_product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_cartproduct`
--

LOCK TABLES `api_cartproduct` WRITE;
/*!40000 ALTER TABLE `api_cartproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_cartproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_order`
--

DROP TABLE IF EXISTS `api_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `user_id_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_order_user_id_id_dba5007f_fk_api_user_id` (`user_id_id`),
  CONSTRAINT `api_order_user_id_id_dba5007f_fk_api_user_id` FOREIGN KEY (`user_id_id`) REFERENCES `api_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_order`
--

LOCK TABLES `api_order` WRITE;
/*!40000 ALTER TABLE `api_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_orderproduct`
--

DROP TABLE IF EXISTS `api_orderproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_orderproduct` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `order_id_id` int NOT NULL,
  `product_id_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_orderproduct_order_id_id_baf53a4c_fk_api_order_id` (`order_id_id`),
  KEY `api_orderproduct_product_id_id_6909f505_fk_api_product_id` (`product_id_id`),
  CONSTRAINT `api_orderproduct_order_id_id_baf53a4c_fk_api_order_id` FOREIGN KEY (`order_id_id`) REFERENCES `api_order` (`id`),
  CONSTRAINT `api_orderproduct_product_id_id_6909f505_fk_api_product_id` FOREIGN KEY (`product_id_id`) REFERENCES `api_product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_orderproduct`
--

LOCK TABLES `api_orderproduct` WRITE;
/*!40000 ALTER TABLE `api_orderproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_orderproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_product`
--

DROP TABLE IF EXISTS `api_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `quantity` int NOT NULL,
  `price` double NOT NULL,
  `rating` double NOT NULL,
  `picture` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_product`
--

LOCK TABLES `api_product` WRITE;
/*!40000 ALTER TABLE `api_product` DISABLE KEYS */;
INSERT INTO `api_product` VALUES (1,'Apple iMac 27\", 1TB HDD, Retina 5K Display, M3 Max',1000,1699,5,'imacmonitor.png'),(2,'Apple iPhone 15 Pro Max, 256GB, Blue Titanium',1000,1199,4.9,'iphone15promax.png'),(3,'iPad Pro 13-Inch (M4): XDR Display, 512GB',1000,799,4.9,'ipadpro.png'),(4,'PlayStation®5 Console - 1TB, PRO Controller',1000,499,4.8,'ps5controller.png'),(5,'Microsoft Xbox Series X 1TB Gaming Console',1000,499,4.8,'xbox.png'),(6,'Apple MacBook PRO Laptop with M2 chip',1000,2599,4.9,'macbookpro.png'),(7,'Apple Watch SE [GPS 40mm], Smartwatch',1000,699,4.7,'applewatch.png'),(8,'Microsoft Surface Pro, Copilot+ PC, 13 Inch',1000,899,4.9,'microsoftsurface.png');
/*!40000 ALTER TABLE `api_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_user`
--

DROP TABLE IF EXISTS `api_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_user` (
  `last_login` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(128) NOT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_user`
--

LOCK TABLES `api_user` WRITE;
/*!40000 ALTER TABLE `api_user` DISABLE KEYS */;
INSERT INTO `api_user` VALUES (NULL,1,'Zeek','Hussain','zeek@gmail.com','pbkdf2_sha256$870000$E7nmcKHqWDupjO8Pw1FBpm$LusWTzZovq8aRfpWKj5/O/giZApptIqjgayxDi+tZ68=','profile.png',1,0);
/*!40000 ALTER TABLE `api_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add product',7,'add_product'),(26,'Can change product',7,'change_product'),(27,'Can delete product',7,'delete_product'),(28,'Can view product',7,'view_product'),(29,'Can add cart',8,'add_cart'),(30,'Can change cart',8,'change_cart'),(31,'Can delete cart',8,'delete_cart'),(32,'Can view cart',8,'view_cart'),(33,'Can add order',9,'add_order'),(34,'Can change order',9,'change_order'),(35,'Can delete order',9,'delete_order'),(36,'Can view order',9,'view_order'),(37,'Can add order product',10,'add_orderproduct'),(38,'Can change order product',10,'change_orderproduct'),(39,'Can delete order product',10,'delete_orderproduct'),(40,'Can view order product',10,'view_orderproduct'),(41,'Can add cart product',11,'add_cartproduct'),(42,'Can change cart product',11,'change_cartproduct'),(43,'Can delete cart product',11,'delete_cartproduct'),(44,'Can view cart product',11,'view_cartproduct');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_api_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_api_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(8,'api','cart'),(11,'api','cartproduct'),(9,'api','order'),(10,'api','orderproduct'),(7,'api','product'),(6,'api','user'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-12-04 11:46:39.298878'),(2,'api','0001_initial','2024-12-04 11:46:39.554613'),(3,'admin','0001_initial','2024-12-04 11:46:39.637606'),(4,'admin','0002_logentry_remove_auto_add','2024-12-04 11:46:39.642892'),(5,'admin','0003_logentry_add_action_flag_choices','2024-12-04 11:46:39.647615'),(6,'contenttypes','0002_remove_content_type_name','2024-12-04 11:46:39.703737'),(7,'auth','0001_initial','2024-12-04 11:46:39.866202'),(8,'auth','0002_alter_permission_name_max_length','2024-12-04 11:46:39.906932'),(9,'auth','0003_alter_user_email_max_length','2024-12-04 11:46:39.912248'),(10,'auth','0004_alter_user_username_opts','2024-12-04 11:46:39.917313'),(11,'auth','0005_alter_user_last_login_null','2024-12-04 11:46:39.923128'),(12,'auth','0006_require_contenttypes_0002','2024-12-04 11:46:39.925267'),(13,'auth','0007_alter_validators_add_error_messages','2024-12-04 11:46:39.931120'),(14,'auth','0008_alter_user_username_max_length','2024-12-04 11:46:39.936582'),(15,'auth','0009_alter_user_last_name_max_length','2024-12-04 11:46:39.942566'),(16,'auth','0010_alter_group_name_max_length','2024-12-04 11:46:39.958565'),(17,'auth','0011_update_proxy_permissions','2024-12-04 11:46:39.970108'),(18,'auth','0012_alter_user_first_name_max_length','2024-12-04 11:46:39.976099'),(19,'sessions','0001_initial','2024-12-04 11:46:40.000325');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-04 11:54:32
