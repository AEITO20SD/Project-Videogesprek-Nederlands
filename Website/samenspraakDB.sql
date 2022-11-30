-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: db.fys.cloud    Database: fys_docent_1_kahoot
-- ------------------------------------------------------
-- Server version	8.0.12

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
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` VALUES (1,'Nederlands','Superleuk!');
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment_has_video`
--

DROP TABLE IF EXISTS `assignment_has_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment_has_video` (
  `assignmentId` int(11) NOT NULL,
  `videoId` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`assignmentId`,`videoId`),
  KEY `fk_Assignment_has_Video_Video1_idx` (`videoId`),
  KEY `fk_Assignment_has_Video_Assignment1_idx` (`assignmentId`),
  CONSTRAINT `fk_Assignment_has_Video_Assignment1` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`id`),
  CONSTRAINT `fk_Assignment_has_Video_Video1` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_has_video`
--

LOCK TABLES `assignment_has_video` WRITE;
/*!40000 ALTER TABLE `assignment_has_video` DISABLE KEYS */;
INSERT INTO `assignment_has_video` VALUES (1,1,0),(1,2,1);
/*!40000 ALTER TABLE `assignment_has_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docent`
--

DROP TABLE IF EXISTS `docent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `emailAddress` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docent`
--

LOCK TABLES `docent` WRITE;
/*!40000 ALTER TABLE `docent` DISABLE KEYS */;
INSERT INTO `docent` VALUES (1,'Lennard','Fonteijn','lennard@hva.nl','test123456'),(2,'Justin','Alink','justin@horizon.nl','test123456');
/*!40000 ALTER TABLE `docent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docent_has_assignment`
--

DROP TABLE IF EXISTS `docent_has_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docent_has_assignment` (
  `assignmentId` int(11) NOT NULL,
  `docentId` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  PRIMARY KEY (`assignmentId`,`docentId`),
  KEY `fk_Assignment_has_Docent_Docent1_idx` (`docentId`),
  KEY `fk_Assignment_has_Docent_Assignment1_idx` (`assignmentId`),
  CONSTRAINT `fk_Assignment_has_Docent_Assignment1` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`id`),
  CONSTRAINT `fk_Assignment_has_Docent_Docent1` FOREIGN KEY (`docentId`) REFERENCES `docent` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docent_has_assignment`
--

LOCK TABLES `docent_has_assignment` WRITE;
/*!40000 ALTER TABLE `docent_has_assignment` DISABLE KEYS */;
INSERT INTO `docent_has_assignment` VALUES (1,1,0),(1,2,1);
/*!40000 ALTER TABLE `docent_has_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant`
--

DROP TABLE IF EXISTS `participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `submissionTime` datetime NOT NULL,
  `roomId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_room_idx` (`roomId`),
  CONSTRAINT `fk_room` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant`
--

LOCK TABLES `participant` WRITE;
/*!40000 ALTER TABLE `participant` DISABLE KEYS */;
INSERT INTO `participant` VALUES (1,'Ben Dover','2022-11-29 15:45:00',1),(2,'John Koos','2022-11-29 16:00:00',1);
/*!40000 ALTER TABLE `participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant_has_video`
--

DROP TABLE IF EXISTS `participant_has_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_has_video` (
  `videoId` int(11) NOT NULL,
  `participantId` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`videoId`,`participantId`),
  KEY `fk_Video_has_Participant_Participant1_idx` (`participantId`),
  KEY `fk_Video_has_Participant_Video1_idx` (`videoId`),
  CONSTRAINT `fk_Video_has_Participant_Participant1` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`),
  CONSTRAINT `fk_Video_has_Participant_Video1` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant_has_video`
--

LOCK TABLES `participant_has_video` WRITE;
/*!40000 ALTER TABLE `participant_has_video` DISABLE KEYS */;
INSERT INTO `participant_has_video` VALUES (1,1,0),(1,2,1),(2,1,1),(2,2,0);
/*!40000 ALTER TABLE `participant_has_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(10) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime DEFAULT NULL,
  `ownerId` int(11) NOT NULL,
  `assignmentId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_docent1_idx` (`ownerId`),
  KEY `fk_assignment1_idx` (`assignmentId`),
  CONSTRAINT `fk_assignment1` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`id`),
  CONSTRAINT `fk_docent1` FOREIGN KEY (`ownerId`) REFERENCES `docent` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'test','2022-11-29 00:00:00','2022-11-29 23:59:00',1,1),(2,'test','2022-11-30 00:00:00','2022-11-30 23:59:00',1,1);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `assignmentId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_assignment_idx` (`assignmentId`),
  CONSTRAINT `fk_assignment` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (1,'Start',NULL,1),(2,'End',NULL,1);
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-29 15:53:38
