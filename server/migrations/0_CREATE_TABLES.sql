-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.6.7-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for techtrek24
CREATE DATABASE IF NOT EXISTS `techtrek24` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `techtrek24`;

-- Dumping structure for table techtrek24.country
CREATE TABLE IF NOT EXISTS `country` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  KEY `PK` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table techtrek24.country: ~1 rows (approximately)
INSERT INTO `country` (`id`, `name`) VALUES
	(1, 'Singapore');

-- Dumping structure for table techtrek24.destination
CREATE TABLE IF NOT EXISTS `destination` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `country_id` int(10) unsigned NOT NULL,
  `cost` float NOT NULL DEFAULT 0,
  `name` varchar(50) NOT NULL,
  `notes` mediumtext DEFAULT NULL,
  KEY `PK` (`id`),
  KEY `DestinationCountryFK` (`country_id`),
  CONSTRAINT `DestinationCountryFK` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table techtrek24.destination: ~5 rows (approximately)
INSERT INTO `destination` (`id`, `country_id`, `cost`, `name`, `notes`) VALUES
	(1, 1, 50, 'Marina Bay Sands', 'Iconic hotel with an infinity pool and stunning views of the city skyline. Open 24/7.'),
	(2, 1, 30, 'Gardens by the Bay', 'Futuristic park featuring Supertree Grove and Flower Dome conservatories. Open daily from 9 AM to 9 PM.'),
	(3, 1, 40, 'Sentosa Island', 'Fun-filled island resort with beaches, theme parks, and various attractions. Open daily from 10 AM to 7 PM.'),
	(4, 1, 60, 'Universal Studios Singapore', 'Amusement park with movie-themed rides and entertainment. Open daily from 10 AM to 7 PM.'),
	(5, 1, 35, 'Singapore Zoo', 'Award-winning zoo showcasing diverse wildlife species. Open daily from 8:30 AM to 6 PM.');

-- Dumping structure for table techtrek24.itinerary
CREATE TABLE IF NOT EXISTS `itinerary` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `country_id` int(10) unsigned NOT NULL DEFAULT 0,
  `user_id` int(10) unsigned NOT NULL DEFAULT 0,
  `budget` float unsigned NOT NULL DEFAULT 0,
  `title` varchar(100) NOT NULL DEFAULT '0',
  KEY `PK` (`id`),
  KEY `ItineraryCountryFK` (`country_id`),
  KEY `ItineraryUserFK` (`user_id`),
  CONSTRAINT `ItineraryCountryFK` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table techtrek24.itinerary: ~3 rows (approximately)
INSERT INTO `itinerary` (`id`, `country_id`, `user_id`, `budget`, `title`) VALUES
	(1, 1, 1, 500, 'Sightseeing in Singapore'),
	(2, 1, 1, 800, 'Singapore Adventure'),
	(3, 1, 2, 600, 'Exploring Singapore');

-- Dumping structure for table techtrek24.itinerary_destination
CREATE TABLE IF NOT EXISTS `itinerary_destination` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `destination_id` int(10) unsigned NOT NULL DEFAULT 0,
  `itineray_id` int(10) unsigned NOT NULL DEFAULT 0,
  KEY `PK` (`id`),
  KEY `IDDestinationFK` (`destination_id`),
  KEY `IDItineraryFK` (`itineray_id`),
  CONSTRAINT `IDDestinationFK` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `IDItineraryFK` FOREIGN KEY (`itineray_id`) REFERENCES `itinerary` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table techtrek24.itinerary_destination: ~6 rows (approximately)
INSERT INTO `itinerary_destination` (`id`, `destination_id`, `itineray_id`) VALUES
	(1, 1, 1),
	(2, 2, 1),
	(3, 3, 1),
	(4, 4, 2),
	(5, 5, 2),
	(6, 2, 3);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
