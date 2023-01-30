-- MySQL dump 10.13  Distrib 8.0.31, for macos12.6 (arm64)
--
-- Host: 127.0.0.1    Database: laposte
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `difficulty`
--

DROP TABLE IF EXISTS `difficulty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `difficulty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `difficulty`
--

/*!40000 ALTER TABLE `difficulty` DISABLE KEYS */;
INSERT INTO `difficulty` VALUES (1,'Débutant'),(2,'Intermédiaire'),(3,'Avancé');
/*!40000 ALTER TABLE `difficulty` ENABLE KEYS */;

--
-- Table structure for table `hashtag`
--

DROP TABLE IF EXISTS `hashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hashtag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag`
--

/*!40000 ALTER TABLE `hashtag` DISABLE KEYS */;
INSERT INTO `hashtag` VALUES (1,'phone'),(2,'internet'),(3,'login'),(4,'telephone'),(5,'chargeur'),(6,'appareil'),(7,'batterie'),(8,'electrique'),(9,'prise'),(10,'chargement'),(11,'charge'),(12,'rechargement'),(13,'recherche'),(14,'navigateur'),(15,'web'),(16,'information'),(17,'mail'),(18,'email'),(19,'adresse'),(20,'boite'),(21,'creer'),(22,'creation'),(23,'proteger'),(24,'securite'),(25,'fausse'),(26,'proche'),(27,'mots'),(28,'cle'),(29,'utiliser'),(30,'itineraire'),(31,'cheque'),(32,'energie'),(33,'etat'),(34,'aide'),(35,'azeeaz');
/*!40000 ALTER TABLE `hashtag` ENABLE KEYS */;

--
-- Table structure for table `theme`
--

DROP TABLE IF EXISTS `theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theme` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theme`
--

/*!40000 ALTER TABLE `theme` DISABLE KEYS */;
INSERT INTO `theme` VALUES (1,'Utiliser ligne bleue','/image/telephone.png'),(2,'Utiliser mon téléphone','/image/phone3.gif'),(3,'Aller sur internet','/image/internet.gif'),(4,'Vie Courante','/image/vie_courante.png'),(5,'Me divertir','/image/divertir.png'),(6,'Mes mails','/image/mail3.gif'),(7,'Communiquer','/image/communiquer.png'),(8,'Utiliser mon téléphone en sécurité','/image/securite.gif'),(9,'Se déplacer','/image/deplacer.gif'),(10,'Se faire aider','/image/aide.gif');
/*!40000 ALTER TABLE `theme` ENABLE KEYS */;

--
-- Table structure for table `tuto_hashtag`
--

DROP TABLE IF EXISTS `tuto_hashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `tuto_hashtag` (
--   `tutorial_id` int NOT NULL,
--   `hashtag_id` int NOT NULL,
--   PRIMARY KEY (`tutorial_id`,`hashtag_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;
CREATE TABLE tuto_hashtag (
    tutorial_id INTEGER REFERENCES tutorial (id) ON DELETE CASCADE,
    hashtag_id INTEGER REFERENCES hashtag (id) ON DELETE CASCADE,
    PRIMARY KEY (tutorial_id, hashtag_id)  
) ;
--
-- Dumping data for table `tuto_hashtag`
--

/*!40000 ALTER TABLE `tuto_hashtag` DISABLE KEYS */;
INSERT INTO `tuto_hashtag` VALUES (1,1),(1,2),(2,2),(2,7),(2,8),(3,15),(4,2),(4,13),(4,14),(5,5),(5,6),(5,7),(5,8),(5,9),(5,10),(5,11),(5,12),(13,35);
/*!40000 ALTER TABLE `tuto_hashtag` ENABLE KEYS */;

--
-- Table structure for table `tutorial`
--

DROP TABLE IF EXISTS `tutorial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutorial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `theme_id` int DEFAULT '1',
  `difficulty_id` int NOT NULL DEFAULT '1',
  `title` varchar(255) NOT NULL,
  `objective` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `step` longtext NOT NULL,
  `author` varchar(255) NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `creation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `edition_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `theme_id` (`theme_id`),
  KEY `difficulty_id` (`difficulty_id`),
  CONSTRAINT `tutorial_ibfk_1` FOREIGN KEY (`theme_id`) REFERENCES `theme` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tutorial_ibfk_2` FOREIGN KEY (`difficulty_id`) REFERENCES `difficulty` (`id`) ON DELETE SET DEFAULT
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorial`
--

/*!40000 ALTER TABLE `tutorial` DISABLE KEYS */;
INSERT INTO `tutorial` VALUES (3,5,2,'quizz','reussir quiz','<p>Quizz</p>','[{\"id\":1,\"type\":\"quiz\",\"content\":[{\"id\":1,\"question\":\"qui est le plus beau\",\"answers\":[{\"id\":1,\"text\":\"Leon\",\"correct\":true},{\"id\":2,\"text\":\"Saak\",\"correct\":false},{\"id\":3,\"text\":\"Leon\",\"correct\":false}]}]}]','admin',0,'2023-01-23 09:50:52','2023-01-23 09:50:52'),(4,3,1,'Comment chercher une information ?','effectuer une recherche sur internet','<p><strong>Internet : Un oc&eacute;an</strong></p>','[{\"id\":1,\"type\":\"image\",\"content\":\"<p><img style=\\\"display: block; margin-left: auto; margin-right: auto;\\\" src=\\\"/images/fa8dad65-e93d-4110-87f2-00bb34b512e0internet.png\\\" alt=\\\"\\\" width=\\\"800\\\" height=\\\"254\\\"></p>\"},{\"id\":2,\"type\":\"image\",\"content\":\"<p><img style=\\\"display: block; margin-left: auto; margin-right: auto;\\\" src=\\\"/images/6e2de84e-be38-4cea-bd4d-ea4f3413ed70icones.png\\\" alt=\\\"\\\" width=\\\"900\\\" height=\\\"471\\\"></p>\"},{\"id\":3,\"type\":\"quiz\",\"content\":[{\"id\":1,\"question\":\" A votre avis, à quoi servent ces icones ?\",\"answers\":[{\"id\":1,\"text\":\"Ouvrir des fichiers\",\"correct\":false},{\"id\":2,\"text\":\"Aller sur Internet\",\"correct\":true},{\"id\":3,\"text\":\"Je ne sais pas\",\"correct\":false}]}]}]','admin',0,'2023-01-23 09:50:52','2023-01-23 09:50:52'),(5,2,1,'Charger un appareil','reussir a mettre un appareil en charge','<h1 class=\"fr-view\">Introduction</h1>','[{\"id\":1,\"type\":\"editor\",\"content\":\"<p style=\\\"text-align: center;\\\"><strong>Les tablettes et smartphone fonctionnent avec une batterie...</strong><br><strong>Ce qui n&eacute;cessite de les charger r&eacute;guli&egrave;rement avec le courant electrique.</strong></p>\"},{\"id\":2,\"type\":\"image\",\"content\":\"<p><img style=\\\"display: block; margin-left: auto; margin-right: auto;\\\" src=\\\"/images/cef604b2-4fd4-4a05-8555-1177793d12c3batt.png\\\" alt=\\\"\\\" width=\\\"512\\\" height=\\\"512\\\"></p>\"},{\"id\":3,\"type\":\"image\",\"content\":\"<p><img style=\\\"display: block; margin-left: auto; margin-right: auto;\\\" src=\\\"/images/2f98bc4d-b21d-4019-b867-8cc355e97289tablette.png\\\" alt=\\\"\\\" width=\\\"900\\\" height=\\\"433\\\"></p>\"},{\"id\":4,\"type\":\"quiz\",\"content\":[{\"id\":1,\"question\":\"Sur la tablette ci-dessus, ou se situe le \\\"port de charge\\\" ?\",\"answers\":[{\"id\":1,\"text\":\"Réponse A\",\"correct\":true},{\"id\":2,\"text\":\"Réponse B\",\"correct\":false},{\"id\":3,\"text\":\"Réponse C\",\"correct\":false}]}]}]','admin',0,'2023-01-23 09:50:52','2023-01-23 09:50:52'),(6,8,3,'Protéger ses proches','savoir lire une info','<h2>La mauvaise ou fausse... nouvelle !</h2>','[{\"id\":1,\"type\":\"image\",\"content\":\"<p><img style=\\\"display: block; margin-left: auto; margin-right: auto;\\\" src=\\\"/images/f57a30e4-6453-460c-addf-baa8741472e2secu.png\\\" alt=\\\"\\\" width=\\\"484\\\" height=\\\"394\\\"></p>\"},{\"id\":2,\"type\":\"quiz\",\"content\":[{\"id\":1,\"question\":\" A votre avis, quels sont les éléments qui font douter Anita ?\",\"answers\":[{\"id\":1,\"text\":\"La source de l information\",\"correct\":false},{\"id\":2,\"text\":\" Elle n a entendu personne en parler \",\"correct\":false},{\"id\":3,\"text\":\"La photo ne ressemble pas à une vraie photo\",\"correct\":false}]}]}]','admin',0,'2023-01-23 09:50:52','2023-01-23 09:50:52'),(8,6,1,' Introduction','repondre','<p>&nbsp;Introduction</p>','[{\"id\":1,\"type\":\"image\",\"content\":\"<p><img style=\\\"display: block; margin-left: auto; margin-right: auto;\\\" src=\\\"/images/2b582137-2a72-48de-8a48-3a55a1067e81mail.png\\\" alt=\\\"\\\" width=\\\"900\\\" height=\\\"503\\\"></p>\"},{\"id\":2,\"type\":\"quiz\",\"content\":[{\"id\":1,\"question\":\"Avez-vous une boîte mail ?\",\"answers\":[{\"id\":1,\"text\":\"Oui\",\"correct\":false},{\"id\":2,\"text\":\"Non\",\"correct\":true}]}]}]','admin',0,'2023-01-23 09:50:52','2023-01-23 09:50:52'),(11,4,2,'Découvrir le cheque energie','reussir','<p>Cheque energie</p>','[{\"id\":1,\"type\":\"image\",\"content\":\"<p><img style=\\\"display: block; margin-left: auto; margin-right: auto;\\\" src=\\\"/images/5e592599-1f00-4a75-97ef-3367ae563a4bcheque.png\\\" alt=\\\"\\\" width=\\\"700\\\" height=\\\"438\\\"></p>\"},{\"id\":2,\"type\":\"quiz\",\"content\":[{\"id\":1,\"question\":\" Est-ce que vous connaissez le chèque énergie ?\",\"answers\":[{\"id\":1,\"text\":\"Oui, mais je ne sais pas l utiliser\",\"correct\":false},{\"id\":2,\"text\":\"Oui, je l ai déjà utilisé \",\"correct\":false},{\"id\":3,\"text\":\"Non, c est pour ça que je suis ici\",\"correct\":true}]},{\"id\":2,\"question\":\" A votre avis, qu est-ce que le chèque énergie ?\",\"answers\":[{\"id\":1,\"text\":\"Un bon de réduction mis en place par les fournisseurs d énergie\",\"correct\":false},{\"id\":2,\"text\":\"Une déduction d impôts\",\"correct\":false},{\"id\":3,\"text\":\"Une aide de l Etat pour payer sa facture d énergie \",\"correct\":true},{\"id\":4,\"text\":\"Je ne sais pas\",\"correct\":false}]},{\"id\":3,\"question\":\"Qui a le droit au chèque énergie ?\",\"answers\":[{\"id\":1,\"text\":\"Tout le monde\",\"correct\":false},{\"id\":2,\"text\":\"Uniquement les locataires d appartement\",\"correct\":false},{\"id\":3,\"text\":\"Toute personne déclarée avec un revenu fiscal inférieur à 10 800€\",\"correct\":true}]},{\"id\":4,\"question\":\"A votre avis, que faut-il faire pour obtenir le chèque énergie ? \",\"answers\":[{\"id\":1,\"text\":\"Remplir un formulaire de demande chaque année\",\"correct\":false},{\"id\":2,\"text\":\" Pas de démarche, le chèque est envoyé automatiquement chaque année\",\"correct\":true},{\"id\":3,\"text\":\"Prendre rendez-vous sur internet avec un conseiller spécialisé\",\"correct\":false}]}]}]','admin',0,'2023-01-23 09:50:52','2023-01-23 09:50:52'),(12,4,1,'video','test url','<p>a voir</p>','[{\"id\":1,\"type\":\"video\",\"content\":\"<p><iframe src=\\\"https://www.youtube.com/embed/-j8TMdLAAmc\\\" width=\\\"560\\\" height=\\\"314\\\" allowfullscreen=\\\"allowfullscreen\\\"></iframe></p>\"}]','admin',0,'2023-01-23 09:50:52','2023-01-23 09:50:52');
/*!40000 ALTER TABLE `tutorial` ENABLE KEYS */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','adminlaposte@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$CIEbKZNo6pCTTsu8tgQU2Q$T4Iidc3Kbnksn02Q6C2v+NF+8590r4UcHAhckpBll/Q',1),(2,'Romain','Timmer','timmer@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$IiwgyuOQ6m8uekQH4Tz/Qg$GQr4Y1wC/2BXn2TF/qPApUxqU7pZxXao7AXgu1wX5kk',1),(3,'Rémy','Bernardin','bernardin@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$W5LUI7siqBwBAVUpolk+sw$v6rdgSw0Y8by65NXjMB3HIxDAULTuKd98+2Xw/+3SUw',0),(4,'Lucas','Fasilleau','fasilleau@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$1t06KFrossBRrBAGepe9uQ$h3qFJ46mWsgcrJ+y7WhrVd4RLqhGVZ1PafAtoouTmxk',0),(5,'Léon','Versavel','versavel@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$dvW02UvenzYp2hVvtviP6w$gp1lRRDpVUZBe91mvB/bgbRqtxY6dGSA37J93opOkCQ',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

--
-- Table structure for table `user_journey`
--

DROP TABLE IF EXISTS `user_journey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `user_journey` (
--   `user_id` int NOT NULL,
--   `tutorial_id` int NOT NULL,
--   `rating` int DEFAULT NULL,
--   `comment` varchar(255) DEFAULT NULL,
--   `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (`user_id`,`tutorial_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE user_journey (
    user_id INTEGER REFERENCES user (id) ON DELETE CASCADE,
    tutorial_id INTEGER REFERENCES tutorial (id) ON DELETE CASCADE,
    rating INTEGER,
    comment varchar(255),
    creation_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, tutorial_id)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_journey`
--

/*!40000 ALTER TABLE `user_journey` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_journey` ENABLE KEYS */;

--
-- Dumping routines for database 'laposte'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-23 12:06:22
