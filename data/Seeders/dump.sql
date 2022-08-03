-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : srv-captain--digital-api-db:3306
-- Généré le : ven. 29 juil. 2022 à 01:01
-- Version du serveur :  5.7.39
-- Version de PHP : 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de données : `digital_api_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `actions`
--

CREATE TABLE `actions` (
  `id` int(11) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `modules_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `actions_profils`
--

CREATE TABLE `actions_profils` (
  `id` int(11) NOT NULL,
  `actions_id` int(11) NOT NULL,
  `profils_id` int(11) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `activities_phones`
--

CREATE TABLE `activities_phones` (
  `id` int(11) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `activity` enum('CONNECTED','DISCONNECTED','JOIN_ROOM','LEAVE_ROOM') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `phones_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `categories_services`
--

CREATE TABLE `categories_services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories_services`
--

INSERT INTO `categories_services` (`id`, `name`, `code`, `icon`, `state`, `updated_at`, `created_at`) VALUES
(1, 'Wallet', 'WALLET', NULL, 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(2, 'Vente Credit', 'AIRTIME', NULL, 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(3, 'Banque', 'BANK', NULL, 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(4, 'Assurance', 'ANSURANCE', NULL, 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(5, 'Sms', 'SMS', NULL, 'ACTIVED', NULL, '2021-05-11 09:49:31');

-- --------------------------------------------------------

--
-- Structure de la table `commission`
--

CREATE TABLE `commission` (
  `id` int(11) NOT NULL,
  `amount_start` double(17,4) NOT NULL,
  `amount_end` double(17,4) NOT NULL COMMENT '-1 pour infini ',
  `amount_commssion` double(17,4) NOT NULL,
  `taux_commission` double(17,4) NOT NULL,
  `taux_fee` double(17,4) NOT NULL,
  `amount_fee` double(17,4) NOT NULL,
  `commission_is_fixe` tinyint(1) NOT NULL,
  `fee_is_fixe` tinyint(1) NOT NULL,
  `parteners_id` int(11) NOT NULL,
  `sous_services_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commission`
--

INSERT INTO `commission` (`id`, `amount_start`, `amount_end`, `amount_commssion`, `taux_commission`, `taux_fee`, `amount_fee`, `commission_is_fixe`, `fee_is_fixe`, `parteners_id`, `sous_services_id`, `created_at`, `updated_at`, `state`) VALUES
(1, 0.0000, 200.0000, 0.0000, 1.5000, 2.0000, 0.0000, 0, 0, 1, 1, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(2, 201.0000, 1000.0000, 0.0000, 1.4000, 1.8000, 0.0000, 0, 0, 1, 1, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(3, 1001.0000, -1.0000, 0.0000, 1.0000, 1.5000, 0.0000, 0, 0, 1, 1, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(4, 0.0000, 200.0000, 0.0000, 1.5000, 2.0000, 0.0000, 0, 0, 1, 4, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(5, 201.0000, 1000.0000, 0.0000, 1.4000, 1.8000, 0.0000, 0, 0, 1, 4, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(6, 1001.0000, -1.0000, 0.0000, 1.0000, 1.5000, 0.0000, 0, 0, 1, 4, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(7, 0.0000, 200.0000, 0.0000, 1.5000, 2.0000, 0.0000, 0, 0, 1, 7, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(8, 201.0000, 1000.0000, 0.0000, 1.4000, 1.8000, 0.0000, 0, 0, 1, 7, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(9, 1001.0000, -1.0000, 0.0000, 1.0000, 1.5000, 0.0000, 0, 0, 1, 7, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(10, 0.0000, 200.0000, 0.0000, 1.5000, 2.0000, 0.0000, 0, 0, 1, 5, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(11, 201.0000, 1000.0000, 0.0000, 1.4000, 1.8000, 0.0000, 0, 0, 1, 5, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(12, 1001.0000, -1.0000, 0.0000, 1.0000, 1.5000, 0.0000, 0, 0, 1, 5, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(13, 0.0000, 200.0000, 0.0000, 1.5000, 2.0000, 0.0000, 0, 0, 1, 8, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(14, 201.0000, 1000.0000, 0.0000, 1.4000, 1.8000, 0.0000, 0, 0, 1, 8, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(15, 1001.0000, -1.0000, 0.0000, 1.0000, 1.5000, 0.0000, 0, 0, 1, 8, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(16, 0.0000, 200.0000, 0.0000, 1.5000, 2.0000, 0.0000, 0, 0, 1, 2, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(17, 201.0000, 1000.0000, 0.0000, 1.4000, 1.8000, 0.0000, 0, 0, 1, 2, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(18, 1001.0000, -1.0000, 0.0000, 1.0000, 1.5000, 0.0000, 0, 0, 1, 2, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(19, 0.0000, 200.0000, 0.0000, 1.5000, 2.0000, 0.0000, 0, 0, 1, 3, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(20, 201.0000, 1000.0000, 0.0000, 1.4000, 1.8000, 0.0000, 0, 0, 1, 3, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(21, 1001.0000, -1.0000, 0.0000, 1.0000, 1.5000, 0.0000, 0, 0, 1, 3, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(22, 0.0000, 200.0000, 0.0000, 1.5000, 2.0000, 0.0000, 0, 0, 1, 6, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(23, 201.0000, 1000.0000, 0.0000, 1.4000, 1.8000, 0.0000, 0, 0, 1, 6, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(24, 1001.0000, -1.0000, 0.0000, 1.0000, 1.5000, 0.0000, 0, 0, 1, 6, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(25, 0.0000, 200.0000, 0.0000, 1.5000, 2.0000, 0.0000, 0, 0, 1, 9, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(26, 201.0000, 1000.0000, 0.0000, 1.4000, 1.8000, 0.0000, 0, 0, 1, 9, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED'),
(27, 1001.0000, -1.0000, 0.0000, 1.0000, 1.5000, 0.0000, 0, 0, 1, 9, '2021-05-11 14:39:06', '2021-05-11 14:39:06', 'ACTIVED');

-- --------------------------------------------------------

--
-- Structure de la table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `flag` varchar(255) NOT NULL,
  `calling_codes` varchar(255) NOT NULL,
  `capital` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `country`
--

INSERT INTO `country` (`id`, `name`, `flag`, `calling_codes`, `capital`, `code`, `state`, `updated_at`, `created_at`) VALUES
(1, 'Afghanistan', 'https://restcountries.eu/data/afg.svg', '93', 'Kabul', 'AFG', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(2, 'Åland Islands', 'https://restcountries.eu/data/ala.svg', '358', 'Mariehamn', 'ALA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(3, 'Albania', 'https://restcountries.eu/data/alb.svg', '355', 'Tirana', 'ALB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(4, 'Algeria', 'https://restcountries.eu/data/dza.svg', '213', 'Algiers', 'DZA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(5, 'American Samoa', 'https://restcountries.eu/data/asm.svg', '1684', 'Pago Pago', 'ASM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(6, 'Andorra', 'https://restcountries.eu/data/and.svg', '376', 'Andorra la Vella', 'AND', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(7, 'Angola', 'https://restcountries.eu/data/ago.svg', '244', 'Luanda', 'AGO', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(8, 'Anguilla', 'https://restcountries.eu/data/aia.svg', '1264', 'The Valley', 'AIA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(9, 'Antarctica', 'https://restcountries.eu/data/ata.svg', '672', '', 'ATA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(10, 'Antigua and Barbuda', 'https://restcountries.eu/data/atg.svg', '1268', 'Saint John s', 'ATG', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(11, 'Argentina', 'https://restcountries.eu/data/arg.svg', '54', 'Buenos Aires', 'ARG', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(12, 'Armenia', 'https://restcountries.eu/data/arm.svg', '374', 'Yerevan', 'ARM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(13, 'Aruba', 'https://restcountries.eu/data/abw.svg', '297', 'Oranjestad', 'ABW', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(14, 'Australia', 'https://restcountries.eu/data/aus.svg', '61', 'Canberra', 'AUS', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(15, 'Austria', 'https://restcountries.eu/data/aut.svg', '43', 'Vienna', 'AUT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(16, 'Azerbaijan', 'https://restcountries.eu/data/aze.svg', '994', 'Baku', 'AZE', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(17, 'Bahamas', 'https://restcountries.eu/data/bhs.svg', '1242', 'Nassau', 'BHS', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(18, 'Bahrain', 'https://restcountries.eu/data/bhr.svg', '973', 'Manama', 'BHR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(19, 'Bangladesh', 'https://restcountries.eu/data/bgd.svg', '880', 'Dhaka', 'BGD', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(20, 'Barbados', 'https://restcountries.eu/data/brb.svg', '1246', 'Bridgetown', 'BRB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(21, 'Belarus', 'https://restcountries.eu/data/blr.svg', '375', 'Minsk', 'BLR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(22, 'Belgium', 'https://restcountries.eu/data/bel.svg', '32', 'Brussels', 'BEL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(23, 'Belize', 'https://restcountries.eu/data/blz.svg', '501', 'Belmopan', 'BLZ', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(24, 'Benin', 'https://restcountries.eu/data/ben.svg', '229', 'Porto-Novo', 'BEN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(25, 'Bermuda', 'https://restcountries.eu/data/bmu.svg', '1441', 'Hamilton', 'BMU', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(26, 'Bhutan', 'https://restcountries.eu/data/btn.svg', '975', 'Thimphu', 'BTN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(27, 'Bolivia (Plurinational State of)', 'https://restcountries.eu/data/bol.svg', '591', 'Sucre', 'BOL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(28, 'Bonaire, Sint Eustatius and Saba', 'https://restcountries.eu/data/bes.svg', '5997', 'Kralendijk', 'BES', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(29, 'Bosnia and Herzegovina', 'https://restcountries.eu/data/bih.svg', '387', 'Sarajevo', 'BIH', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(30, 'Botswana', 'https://restcountries.eu/data/bwa.svg', '267', 'Gaborone', 'BWA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(31, 'Bouvet Island', 'https://restcountries.eu/data/bvt.svg', '', '', 'BVT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(32, 'Brazil', 'https://restcountries.eu/data/bra.svg', '55', 'Brasília', 'BRA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(33, 'British Indian Ocean Territory', 'https://restcountries.eu/data/iot.svg', '246', 'Diego Garcia', 'IOT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(34, 'United States Minor Outlying Islands', 'https://restcountries.eu/data/umi.svg', '', '', 'UMI', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(35, 'Virgin Islands (British)', 'https://restcountries.eu/data/vgb.svg', '1284', 'Road Town', 'VGB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(36, 'Virgin Islands (U.S.)', 'https://restcountries.eu/data/vir.svg', '1 340', 'Charlotte Amalie', 'VIR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(37, 'Brunei Darussalam', 'https://restcountries.eu/data/brn.svg', '673', 'Bandar Seri Begawan', 'BRN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(38, 'Bulgaria', 'https://restcountries.eu/data/bgr.svg', '359', 'Sofia', 'BGR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(39, 'Burkina Faso', 'https://restcountries.eu/data/bfa.svg', '226', 'Ouagadougou', 'BFA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(40, 'Burundi', 'https://restcountries.eu/data/bdi.svg', '257', 'Bujumbura', 'BDI', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(41, 'Cambodia', 'https://restcountries.eu/data/khm.svg', '855', 'Phnom Penh', 'KHM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(42, 'Cameroon', 'https://restcountries.eu/data/cmr.svg', '237', 'Yaoundé', 'CMR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(43, 'Canada', 'https://restcountries.eu/data/can.svg', '1', 'Ottawa', 'CAN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(44, 'Cabo Verde', 'https://restcountries.eu/data/cpv.svg', '238', 'Praia', 'CPV', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(45, 'Cayman Islands', 'https://restcountries.eu/data/cym.svg', '1345', 'George Town', 'CYM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(46, 'Central African Republic', 'https://restcountries.eu/data/caf.svg', '236', 'Bangui', 'CAF', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(47, 'Chad', 'https://restcountries.eu/data/tcd.svg', '235', 'N Djamena', 'TCD', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(48, 'Chile', 'https://restcountries.eu/data/chl.svg', '56', 'Santiago', 'CHL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(49, 'China', 'https://restcountries.eu/data/chn.svg', '86', 'Beijing', 'CHN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(50, 'Christmas Island', 'https://restcountries.eu/data/cxr.svg', '61', 'Flying Fish Cove', 'CXR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(51, 'Cocos (Keeling) Islands', 'https://restcountries.eu/data/cck.svg', '61', 'West Island', 'CCK', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(52, 'Colombia', 'https://restcountries.eu/data/col.svg', '57', 'Bogotá', 'COL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(53, 'Comoros', 'https://restcountries.eu/data/com.svg', '269', 'Moroni', 'COM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(54, 'Congo', 'https://restcountries.eu/data/cog.svg', '242', 'Brazzaville', 'COG', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(55, 'Congo (Democratic Republic of the)', 'https://restcountries.eu/data/cod.svg', '243', 'Kinshasa', 'COD', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(56, 'Cook Islands', 'https://restcountries.eu/data/cok.svg', '682', 'Avarua', 'COK', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(57, 'Costa Rica', 'https://restcountries.eu/data/cri.svg', '506', 'San José', 'CRI', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(58, 'Croatia', 'https://restcountries.eu/data/hrv.svg', '385', 'Zagreb', 'HRV', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(59, 'Cuba', 'https://restcountries.eu/data/cub.svg', '53', 'Havana', 'CUB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(60, 'Curaçao', 'https://restcountries.eu/data/cuw.svg', '599', 'Willemstad', 'CUW', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(61, 'Cyprus', 'https://restcountries.eu/data/cyp.svg', '357', 'Nicosia', 'CYP', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(62, 'Czech Republic', 'https://restcountries.eu/data/cze.svg', '420', 'Prague', 'CZE', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(63, 'Denmark', 'https://restcountries.eu/data/dnk.svg', '45', 'Copenhagen', 'DNK', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(64, 'Djibouti', 'https://restcountries.eu/data/dji.svg', '253', 'Djibouti', 'DJI', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(65, 'Dominica', 'https://restcountries.eu/data/dma.svg', '1767', 'Roseau', 'DMA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(66, 'Dominican Republic', 'https://restcountries.eu/data/dom.svg', '1809', 'Santo Domingo', 'DOM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(67, 'Ecuador', 'https://restcountries.eu/data/ecu.svg', '593', 'Quito', 'ECU', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(68, 'Egypt', 'https://restcountries.eu/data/egy.svg', '20', 'Cairo', 'EGY', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(69, 'El Salvador', 'https://restcountries.eu/data/slv.svg', '503', 'San Salvador', 'SLV', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(70, 'Equatorial Guinea', 'https://restcountries.eu/data/gnq.svg', '240', 'Malabo', 'GNQ', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(71, 'Eritrea', 'https://restcountries.eu/data/eri.svg', '291', 'Asmara', 'ERI', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(72, 'Estonia', 'https://restcountries.eu/data/est.svg', '372', 'Tallinn', 'EST', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(73, 'Ethiopia', 'https://restcountries.eu/data/eth.svg', '251', 'Addis Ababa', 'ETH', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(74, 'Falkland Islands (Malvinas)', 'https://restcountries.eu/data/flk.svg', '500', 'Stanley', 'FLK', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(75, 'Faroe Islands', 'https://restcountries.eu/data/fro.svg', '298', 'Tórshavn', 'FRO', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(76, 'Fiji', 'https://restcountries.eu/data/fji.svg', '679', 'Suva', 'FJI', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(77, 'Finland', 'https://restcountries.eu/data/fin.svg', '358', 'Helsinki', 'FIN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(78, 'France', 'https://restcountries.eu/data/fra.svg', '33', 'Paris', 'FRA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(79, 'French Guiana', 'https://restcountries.eu/data/guf.svg', '594', 'Cayenne', 'GUF', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(80, 'French Polynesia', 'https://restcountries.eu/data/pyf.svg', '689', 'Papeetē', 'PYF', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(81, 'French Southern Territories', 'https://restcountries.eu/data/atf.svg', '', 'Port-aux-Français', 'ATF', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(82, 'Gabon', 'https://restcountries.eu/data/gab.svg', '241', 'Libreville', 'GAB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(83, 'Gambia', 'https://restcountries.eu/data/gmb.svg', '220', 'Banjul', 'GMB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(84, 'Georgia', 'https://restcountries.eu/data/geo.svg', '995', 'Tbilisi', 'GEO', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(85, 'Germany', 'https://restcountries.eu/data/deu.svg', '49', 'Berlin', 'DEU', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(86, 'Ghana', 'https://restcountries.eu/data/gha.svg', '233', 'Accra', 'GHA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(87, 'Gibraltar', 'https://restcountries.eu/data/gib.svg', '350', 'Gibraltar', 'GIB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(88, 'Greece', 'https://restcountries.eu/data/grc.svg', '30', 'Athens', 'GRC', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(89, 'Greenland', 'https://restcountries.eu/data/grl.svg', '299', 'Nuuk', 'GRL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(90, 'Grenada', 'https://restcountries.eu/data/grd.svg', '1473', 'St. George s', 'GRD', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(91, 'Guadeloupe', 'https://restcountries.eu/data/glp.svg', '590', 'Basse-Terre', 'GLP', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(92, 'Guam', 'https://restcountries.eu/data/gum.svg', '1671', 'Hagåtña', 'GUM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(93, 'Guatemala', 'https://restcountries.eu/data/gtm.svg', '502', 'Guatemala City', 'GTM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(94, 'Guernsey', 'https://restcountries.eu/data/ggy.svg', '44', 'St. Peter Port', 'GGY', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(95, 'Guinea', 'https://restcountries.eu/data/gin.svg', '224', 'Conakry', 'GIN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(96, 'Guinea-Bissau', 'https://restcountries.eu/data/gnb.svg', '245', 'Bissau', 'GNB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(97, 'Guyana', 'https://restcountries.eu/data/guy.svg', '592', 'Georgetown', 'GUY', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(98, 'Haiti', 'https://restcountries.eu/data/hti.svg', '509', 'Port-au-Prince', 'HTI', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(99, 'Heard Island and McDonald Islands', 'https://restcountries.eu/data/hmd.svg', '', '', 'HMD', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(100, 'Holy See', 'https://restcountries.eu/data/vat.svg', '379', 'Rome', 'VAT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(101, 'Honduras', 'https://restcountries.eu/data/hnd.svg', '504', 'Tegucigalpa', 'HND', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(102, 'Hong Kong', 'https://restcountries.eu/data/hkg.svg', '852', 'City of Victoria', 'HKG', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(103, 'Hungary', 'https://restcountries.eu/data/hun.svg', '36', 'Budapest', 'HUN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(104, 'Iceland', 'https://restcountries.eu/data/isl.svg', '354', 'Reykjavík', 'ISL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(105, 'India', 'https://restcountries.eu/data/ind.svg', '91', 'New Delhi', 'IND', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(106, 'Indonesia', 'https://restcountries.eu/data/idn.svg', '62', 'Jakarta', 'IDN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(107, 'Côte d Ivoire', 'https://restcountries.eu/data/civ.svg', '225', 'Yamoussoukro', 'CIV', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(108, 'Iran (Islamic Republic of)', 'https://restcountries.eu/data/irn.svg', '98', 'Tehran', 'IRN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(109, 'Iraq', 'https://restcountries.eu/data/irq.svg', '964', 'Baghdad', 'IRQ', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(110, 'Ireland', 'https://restcountries.eu/data/irl.svg', '353', 'Dublin', 'IRL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(111, 'Isle of Man', 'https://restcountries.eu/data/imn.svg', '44', 'Douglas', 'IMN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(112, 'Israel', 'https://restcountries.eu/data/isr.svg', '972', 'Jerusalem', 'ISR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(113, 'Italy', 'https://restcountries.eu/data/ita.svg', '39', 'Rome', 'ITA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(114, 'Jamaica', 'https://restcountries.eu/data/jam.svg', '1876', 'Kingston', 'JAM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(115, 'Japan', 'https://restcountries.eu/data/jpn.svg', '81', 'Tokyo', 'JPN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(116, 'Jersey', 'https://restcountries.eu/data/jey.svg', '44', 'Saint Helier', 'JEY', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(117, 'Jordan', 'https://restcountries.eu/data/jor.svg', '962', 'Amman', 'JOR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(118, 'Kazakhstan', 'https://restcountries.eu/data/kaz.svg', '76', 'Astana', 'KAZ', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(119, 'Kenya', 'https://restcountries.eu/data/ken.svg', '254', 'Nairobi', 'KEN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(120, 'Kiribati', 'https://restcountries.eu/data/kir.svg', '686', 'South Tarawa', 'KIR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(121, 'Kuwait', 'https://restcountries.eu/data/kwt.svg', '965', 'Kuwait City', 'KWT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(122, 'Kyrgyzstan', 'https://restcountries.eu/data/kgz.svg', '996', 'Bishkek', 'KGZ', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(123, 'Lao People s Democratic Republic', 'https://restcountries.eu/data/lao.svg', '856', 'Vientiane', 'LAO', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(124, 'Latvia', 'https://restcountries.eu/data/lva.svg', '371', 'Riga', 'LVA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(125, 'Lebanon', 'https://restcountries.eu/data/lbn.svg', '961', 'Beirut', 'LBN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(126, 'Lesotho', 'https://restcountries.eu/data/lso.svg', '266', 'Maseru', 'LSO', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(127, 'Liberia', 'https://restcountries.eu/data/lbr.svg', '231', 'Monrovia', 'LBR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(128, 'Libya', 'https://restcountries.eu/data/lby.svg', '218', 'Tripoli', 'LBY', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(129, 'Liechtenstein', 'https://restcountries.eu/data/lie.svg', '423', 'Vaduz', 'LIE', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(130, 'Lithuania', 'https://restcountries.eu/data/ltu.svg', '370', 'Vilnius', 'LTU', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(131, 'Luxembourg', 'https://restcountries.eu/data/lux.svg', '352', 'Luxembourg', 'LUX', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(132, 'Macao', 'https://restcountries.eu/data/mac.svg', '853', '', 'MAC', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(133, 'Macedonia (the former Yugoslav Republic of)', 'https://restcountries.eu/data/mkd.svg', '389', 'Skopje', 'MKD', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(134, 'Madagascar', 'https://restcountries.eu/data/mdg.svg', '261', 'Antananarivo', 'MDG', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(135, 'Malawi', 'https://restcountries.eu/data/mwi.svg', '265', 'Lilongwe', 'MWI', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(136, 'Malaysia', 'https://restcountries.eu/data/mys.svg', '60', 'Kuala Lumpur', 'MYS', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(137, 'Maldives', 'https://restcountries.eu/data/mdv.svg', '960', 'MalÃ©', 'MDV', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(138, 'Mali', 'https://restcountries.eu/data/mli.svg', '223', 'Bamako', 'MLI', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(139, 'Malta', 'https://restcountries.eu/data/mlt.svg', '356', 'Valletta', 'MLT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(140, 'Marshall Islands', 'https://restcountries.eu/data/mhl.svg', '692', 'Majuro', 'MHL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(141, 'Martinique', 'https://restcountries.eu/data/mtq.svg', '596', 'Fort-de-France', 'MTQ', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(142, 'Mauritania', 'https://restcountries.eu/data/mrt.svg', '222', 'Nouakchott', 'MRT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(143, 'Mauritius', 'https://restcountries.eu/data/mus.svg', '230', 'Port Louis', 'MUS', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(144, 'Mayotte', 'https://restcountries.eu/data/myt.svg', '262', 'Mamoudzou', 'MYT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(145, 'Mexico', 'https://restcountries.eu/data/mex.svg', '52', 'Mexico City', 'MEX', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(146, 'Micronesia (Federated States of)', 'https://restcountries.eu/data/fsm.svg', '691', 'Palikir', 'FSM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(147, 'Moldova (Republic of)', 'https://restcountries.eu/data/mda.svg', '373', 'ChiÈinÄu', 'MDA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(148, 'Monaco', 'https://restcountries.eu/data/mco.svg', '377', 'Monaco', 'MCO', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(149, 'Mongolia', 'https://restcountries.eu/data/mng.svg', '976', 'Ulan Bator', 'MNG', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(150, 'Montenegro', 'https://restcountries.eu/data/mne.svg', '382', 'Podgorica', 'MNE', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(151, 'Montserrat', 'https://restcountries.eu/data/msr.svg', '1664', 'Plymouth', 'MSR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(152, 'Morocco', 'https://restcountries.eu/data/mar.svg', '212', 'Rabat', 'MAR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(153, 'Mozambique', 'https://restcountries.eu/data/moz.svg', '258', 'Maputo', 'MOZ', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(154, 'Myanmar', 'https://restcountries.eu/data/mmr.svg', '95', 'Naypyidaw', 'MMR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(155, 'Namibia', 'https://restcountries.eu/data/nam.svg', '264', 'Windhoek', 'NAM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(156, 'Nauru', 'https://restcountries.eu/data/nru.svg', '674', 'Yaren', 'NRU', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(157, 'Nepal', 'https://restcountries.eu/data/npl.svg', '977', 'Kathmandu', 'NPL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(158, 'Netherlands', 'https://restcountries.eu/data/nld.svg', '31', 'Amsterdam', 'NLD', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(159, 'New Caledonia', 'https://restcountries.eu/data/ncl.svg', '687', 'Nouméa', 'NCL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(160, 'New Zealand', 'https://restcountries.eu/data/nzl.svg', '64', 'Wellington', 'NZL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(161, 'Nicaragua', 'https://restcountries.eu/data/nic.svg', '505', 'Managua', 'NIC', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(162, 'Niger', 'https://restcountries.eu/data/ner.svg', '227', 'Niamey', 'NER', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(163, 'Nigeria', 'https://restcountries.eu/data/nga.svg', '234', 'Abuja', 'NGA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(164, 'Niue', 'https://restcountries.eu/data/niu.svg', '683', 'Alofi', 'NIU', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(165, 'Norfolk Island', 'https://restcountries.eu/data/nfk.svg', '672', 'Kingston', 'NFK', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(166, 'Korea (Democratic People s Republic of)', 'https://restcountries.eu/data/prk.svg', '850', 'Pyongyang', 'PRK', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(167, 'Northern Mariana Islands', 'https://restcountries.eu/data/mnp.svg', '1670', 'Saipan', 'MNP', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(168, 'Norway', 'https://restcountries.eu/data/nor.svg', '47', 'Oslo', 'NOR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(169, 'Oman', 'https://restcountries.eu/data/omn.svg', '968', 'Muscat', 'OMN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(170, 'Pakistan', 'https://restcountries.eu/data/pak.svg', '92', 'Islamabad', 'PAK', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(171, 'Palau', 'https://restcountries.eu/data/plw.svg', '680', 'Ngerulmud', 'PLW', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(172, 'Palestine, State of', 'https://restcountries.eu/data/pse.svg', '970', 'Ramallah', 'PSE', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(173, 'Panama', 'https://restcountries.eu/data/pan.svg', '507', 'Panama City', 'PAN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(174, 'Papua New Guinea', 'https://restcountries.eu/data/png.svg', '675', 'Port Moresby', 'PNG', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(175, 'Paraguay', 'https://restcountries.eu/data/pry.svg', '595', 'Asunción', 'PRY', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(176, 'Peru', 'https://restcountries.eu/data/per.svg', '51', 'Lima', 'PER', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(177, 'Philippines', 'https://restcountries.eu/data/phl.svg', '63', 'Manila', 'PHL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(178, 'Pitcairn', 'https://restcountries.eu/data/pcn.svg', '64', 'Adamstown', 'PCN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(179, 'Poland', 'https://restcountries.eu/data/pol.svg', '48', 'Warsaw', 'POL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(180, 'Portugal', 'https://restcountries.eu/data/prt.svg', '351', 'Lisbon', 'PRT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(181, 'Puerto Rico', 'https://restcountries.eu/data/pri.svg', '1787', 'San Juan', 'PRI', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(182, 'Qatar', 'https://restcountries.eu/data/qat.svg', '974', 'Doha', 'QAT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(183, 'Republic of Kosovo', 'https://restcountries.eu/data/kos.svg', '383', 'Pristina', 'KOS', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(184, 'Réunion', 'https://restcountries.eu/data/reu.svg', '262', 'Saint-Denis', 'REU', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(185, 'Romania', 'https://restcountries.eu/data/rou.svg', '40', 'Bucharest', 'ROU', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(186, 'Russian Federation', 'https://restcountries.eu/data/rus.svg', '7', 'Moscow', 'RUS', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(187, 'Rwanda', 'https://restcountries.eu/data/rwa.svg', '250', 'Kigali', 'RWA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(188, 'Saint Barthélemy', 'https://restcountries.eu/data/blm.svg', '590', 'Gustavia', 'BLM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(189, 'Saint Helena, Ascension and Tristan da Cunha', 'https://restcountries.eu/data/shn.svg', '290', 'Jamestown', 'SHN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(190, 'Saint Kitts and Nevis', 'https://restcountries.eu/data/kna.svg', '1869', 'Basseterre', 'KNA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(191, 'Saint Lucia', 'https://restcountries.eu/data/lca.svg', '1758', 'Castries', 'LCA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(192, 'Saint Martin (French part)', 'https://restcountries.eu/data/maf.svg', '590', 'Marigot', 'MAF', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(193, 'Saint Pierre and Miquelon', 'https://restcountries.eu/data/spm.svg', '508', 'Saint-Pierre', 'SPM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(194, 'Saint Vincent and the Grenadines', 'https://restcountries.eu/data/vct.svg', '1784', 'Kingstown', 'VCT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(195, 'Samoa', 'https://restcountries.eu/data/wsm.svg', '685', 'Apia', 'WSM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(196, 'San Marino', 'https://restcountries.eu/data/smr.svg', '378', 'City of San Marino', 'SMR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(197, 'Sao Tome and Principe', 'https://restcountries.eu/data/stp.svg', '239', 'São Tomé', 'STP', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(198, 'Saudi Arabia', 'https://restcountries.eu/data/sau.svg', '966', 'Riyadh', 'SAU', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(199, 'Senegal', 'https://restcountries.eu/data/sen.svg', '221', 'Dakar', 'SEN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(200, 'Serbia', 'https://restcountries.eu/data/srb.svg', '381', 'Belgrade', 'SRB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(201, 'Seychelles', 'https://restcountries.eu/data/syc.svg', '248', 'Victoria', 'SYC', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(202, 'Sierra Leone', 'https://restcountries.eu/data/sle.svg', '232', 'Freetown', 'SLE', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(203, 'Singapore', 'https://restcountries.eu/data/sgp.svg', '65', 'Singapore', 'SGP', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(204, 'Sint Maarten (Dutch part)', 'https://restcountries.eu/data/sxm.svg', '1721', 'Philipsburg', 'SXM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(205, 'Slovakia', 'https://restcountries.eu/data/svk.svg', '421', 'Bratislava', 'SVK', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(206, 'Slovenia', 'https://restcountries.eu/data/svn.svg', '386', 'Ljubljana', 'SVN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(207, 'Solomon Islands', 'https://restcountries.eu/data/slb.svg', '677', 'Honiara', 'SLB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(208, 'Somalia', 'https://restcountries.eu/data/som.svg', '252', 'Mogadishu', 'SOM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(209, 'South Africa', 'https://restcountries.eu/data/zaf.svg', '27', 'Pretoria', 'ZAF', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(210, 'South Georgia and the South Sandwich Islands', 'https://restcountries.eu/data/sgs.svg', '500', 'King Edward Point', 'SGS', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(211, 'Korea (Republic of)', 'https://restcountries.eu/data/kor.svg', '82', 'Seoul', 'KOR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(212, 'South Sudan', 'https://restcountries.eu/data/ssd.svg', '211', 'Juba', 'SSD', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(213, 'Spain', 'https://restcountries.eu/data/esp.svg', '34', 'Madrid', 'ESP', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(214, 'Sri Lanka', 'https://restcountries.eu/data/lka.svg', '94', 'Colombo', 'LKA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(215, 'Sudan', 'https://restcountries.eu/data/sdn.svg', '249', 'Khartoum', 'SDN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(216, 'Suriname', 'https://restcountries.eu/data/sur.svg', '597', 'Paramaribo', 'SUR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(217, 'Svalbard and Jan Mayen', 'https://restcountries.eu/data/sjm.svg', '4779', 'Longyearbyen', 'SJM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(218, 'Swaziland', 'https://restcountries.eu/data/swz.svg', '268', 'Lobamba', 'SWZ', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(219, 'Sweden', 'https://restcountries.eu/data/swe.svg', '46', 'Stockholm', 'SWE', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(220, 'Switzerland', 'https://restcountries.eu/data/che.svg', '41', 'Bern', 'CHE', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(221, 'Syrian Arab Republic', 'https://restcountries.eu/data/syr.svg', '963', 'Damascus', 'SYR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(222, 'Taiwan', 'https://restcountries.eu/data/twn.svg', '886', 'Taipei', 'TWN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(223, 'Tajikistan', 'https://restcountries.eu/data/tjk.svg', '992', 'Dushanbe', 'TJK', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(224, 'Tanzania, United Republic of', 'https://restcountries.eu/data/tza.svg', '255', 'Dodoma', 'TZA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(225, 'Thailand', 'https://restcountries.eu/data/tha.svg', '66', 'Bangkok', 'THA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(226, 'Timor-Leste', 'https://restcountries.eu/data/tls.svg', '670', 'Dili', 'TLS', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(227, 'Togo', 'https://restcountries.eu/data/tgo.svg', '228', 'Lomé', 'TGO', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(228, 'Tokelau', 'https://restcountries.eu/data/tkl.svg', '690', 'Fakaofo', 'TKL', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(229, 'Tonga', 'https://restcountries.eu/data/ton.svg', '676', 'Nuku alofa', 'TON', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(230, 'Trinidad and Tobago', 'https://restcountries.eu/data/tto.svg', '1868', 'Port of Spain', 'TTO', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(231, 'Tunisia', 'https://restcountries.eu/data/tun.svg', '216', 'Tunis', 'TUN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(232, 'Turkey', 'https://restcountries.eu/data/tur.svg', '90', 'Ankara', 'TUR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(233, 'Turkmenistan', 'https://restcountries.eu/data/tkm.svg', '993', 'Ashgabat', 'TKM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(234, 'Turks and Caicos Islands', 'https://restcountries.eu/data/tca.svg', '1649', 'Cockburn Town', 'TCA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(235, 'Tuvalu', 'https://restcountries.eu/data/tuv.svg', '688', 'Funafuti', 'TUV', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(236, 'Uganda', 'https://restcountries.eu/data/uga.svg', '256', 'Kampala', 'UGA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(237, 'Ukraine', 'https://restcountries.eu/data/ukr.svg', '380', 'Kiev', 'UKR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(238, 'United Arab Emirates', 'https://restcountries.eu/data/are.svg', '971', 'Abu Dhabi', 'ARE', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(239, 'United Kingdom of Great Britain and Northern Ireland', 'https://restcountries.eu/data/gbr.svg', '44', 'London', 'GBR', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(240, 'United States of America', 'https://restcountries.eu/data/usa.svg', '1', 'Washington, D.C.', 'USA', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(241, 'Uruguay', 'https://restcountries.eu/data/ury.svg', '598', 'Montevideo', 'URY', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(242, 'Uzbekistan', 'https://restcountries.eu/data/uzb.svg', '998', 'Tashkent', 'UZB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(243, 'Vanuatu', 'https://restcountries.eu/data/vut.svg', '678', 'Port Vila', 'VUT', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(244, 'Venezuela (Bolivarian Republic of)', 'https://restcountries.eu/data/ven.svg', '58', 'Caracas', 'VEN', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(245, 'Viet Nam', 'https://restcountries.eu/data/vnm.svg', '84', 'Hanoi', 'VNM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(246, 'Wallis and Futuna', 'https://restcountries.eu/data/wlf.svg', '681', 'Mata-Utu', 'WLF', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(247, 'Western Sahara', 'https://restcountries.eu/data/esh.svg', '212', 'El Aaiún', 'ESH', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(248, 'Yemen', 'https://restcountries.eu/data/yem.svg', '967', 'Sana a', 'YEM', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(249, 'Zambia', 'https://restcountries.eu/data/zmb.svg', '260', 'Lusaka', 'ZMB', 'ACTIVED', NULL, '2021-05-11 09:49:31'),
(250, 'Zimbabwe', 'https://restcountries.eu/data/zwe.svg', '263', 'Harare', 'ZWE', 'ACTIVED', NULL, '2021-05-11 09:49:31');

-- --------------------------------------------------------

--
-- Structure de la table `message_ussds`
--

CREATE TABLE `message_ussds` (
  `id` int(11) NOT NULL,
  `content` longtext,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `sous_services_id` int(11) DEFAULT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `is_matched` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `modules_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `operation_comptes_parteners`
--

CREATE TABLE `operation_comptes_parteners` (
  `id` int(11) NOT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `amount` double(17,4) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `type_operation` enum('DEBIT','CREDIT') NOT NULL,
  `statut` enum('SUCCESS','PENDING','PROCESSING','FAILLED','CANCELED') NOT NULL DEFAULT 'PENDING',
  `date_creation` datetime DEFAULT NULL,
  `date_success` datetime DEFAULT NULL,
  `date_canceled` datetime DEFAULT NULL,
  `date_processing` datetime DEFAULT NULL,
  `date_failled` datetime DEFAULT NULL,
  `parteners_id` int(11) NOT NULL,
  `operation` enum('ANNULATION','APROVISIONNEMENT','ANNULATION_APROVISIONNEMENT','APPEL_DE_FOND','ANNULATION_APPEL_DE_FOND') NOT NULL,
  `partener_comptes_id` int(11) NOT NULL,
  `operation_comptes_parteners_id` int(11) DEFAULT NULL COMMENT 'L’id pour les annulations appels de fonds ou approvisionnement',
  `transactions_id` int(11) DEFAULT NULL COMMENT 'Id transaction pour une annulation\n',
  `solde_befor` double(17,4) NOT NULL,
  `solde_after` double(17,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `operation_parteners`
--

CREATE TABLE `operation_parteners` (
  `id` int(11) NOT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `amount` double(17,4) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `type_operation` enum('DEBIT','CREDIT') NOT NULL,
  `statut` enum('SUCCESS','PENDING','PROCESSING','FAILLED','CANCELED') NOT NULL DEFAULT 'PENDING',
  `date_creation` datetime DEFAULT NULL,
  `date_success` datetime DEFAULT NULL,
  `date_canceled` datetime DEFAULT NULL,
  `date_processing` datetime DEFAULT NULL,
  `date_failled` datetime DEFAULT NULL,
  `parteners_id` int(11) NOT NULL,
  `transactions_id` int(11) DEFAULT NULL COMMENT 'Id transaction pour une annulation',
  `operation` enum('ANNULATION','APROVISIONNEMENT','ANNULATION_APROVISIONNEMENT','APPEL_DE_FOND','ANNULATION_APPEL_DE_FOND') NOT NULL,
  `solde_befor` double(17,4) NOT NULL,
  `solde_after` double(17,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `operation_phones`
--

CREATE TABLE `operation_phones` (
  `id` int(11) NOT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `amount` double(17,4) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `type_operation` enum('DEBIT','CREDIT') NOT NULL,
  `statut` enum('SUCCESS','PENDING','PROCESSING','FAILLED','CANCELED') NOT NULL DEFAULT 'PENDING',
  `date_creation` datetime DEFAULT NULL,
  `date_success` datetime DEFAULT NULL,
  `date_canceled` datetime DEFAULT NULL,
  `date_processing` datetime DEFAULT NULL,
  `date_failled` datetime DEFAULT NULL,
  `phones_id` int(11) NOT NULL,
  `operation` enum('APPEL_DE_FONS','APPROVISIONNEMENT','ANNULATION_APPELS_FONDS','ANNULATION_APPROVISIONNEMENT') NOT NULL,
  `operation_phones_id` int(11) DEFAULT NULL COMMENT 'Le transaction ',
  `solde_before` double(17,4) NOT NULL,
  `solde_after` double(17,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `operators`
--

CREATE TABLE `operators` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `countries_id` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `operators`
--

INSERT INTO `operators` (`id`, `name`, `icon`, `code`, `state`, `countries_id`, `updated_at`, `created_at`) VALUES
(1, 'Orange', NULL, 'ORANGE_SN', 'ACTIVED', 199, NULL, '2021-05-11 09:49:31'),
(2, 'Free', NULL, 'FREE_SN', 'ACTIVED', 199, NULL, '2021-05-11 09:49:31'),
(3, 'Expresso', NULL, 'EXPRESSO_SN', 'ACTIVED', 199, NULL, '2021-05-11 09:49:31');

-- --------------------------------------------------------

--
-- Structure de la table `parteners`
--

CREATE TABLE `parteners` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `solde` double(17,4) NOT NULL DEFAULT '0.0000',
  `amount_reserved` double(17,4) NOT NULL DEFAULT '0.0000',
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `adress` longtext,
  `password` varchar(255) NOT NULL,
  `first_connection` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Premier connexion , l’utilisateur doit changer son mot de passe',
  `password_expired` datetime DEFAULT NULL,
  `password_duration_day` int(11) NOT NULL DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `parteners`
--

INSERT INTO `parteners` (`id`, `created_at`, `updated_at`, `state`, `solde`, `amount_reserved`, `name`, `phone`, `email`, `adress`, `password`, `first_connection`, `password_expired`, `password_duration_day`) VALUES
(1, '2021-05-11 09:49:31', NULL, 'ACTIVED', 5000000.0000, 0.0000, 'Intech Group', '221777293282', 'papesambandour@hotmail.com', NULL, 'ADMIN', 1, NULL, -1);

-- --------------------------------------------------------

--
-- Structure de la table `partener_comptes`
--

CREATE TABLE `partener_comptes` (
  `id` int(11) NOT NULL,
  `type_partener_compte` enum('API','CAISSE') NOT NULL,
  `parteners_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `solde` double(17,4) NOT NULL DEFAULT '0.0000',
  `amount_reserved` double(17,4) NOT NULL DEFAULT '0.0000',
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `adress` longtext,
  `first_connection` tinyint(1) NOT NULL DEFAULT '1',
  `password_expired` datetime DEFAULT NULL,
  `password_duration_day` int(11) NOT NULL DEFAULT '-1',
  `max_solde` double(17,4) NOT NULL DEFAULT '-1.0000',
  `need_solde` tinyint(1) NOT NULL DEFAULT '0',
  `app_key` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `partener_comptes`
--

INSERT INTO `partener_comptes` (`id`, `type_partener_compte`, `parteners_id`, `created_at`, `updated_at`, `state`, `solde`, `amount_reserved`, `name`, `phone`, `password`, `email`, `adress`, `first_connection`, `password_expired`, `password_duration_day`, `max_solde`, `need_solde`, `app_key`) VALUES
(1, 'API', 1, '2021-05-11 09:49:31', NULL, 'ACTIVED', 0.0000, 0.0000, 'InTech API', '221772207265', 'ADMIN', 'mohamed@intech.sn', 'Dakar', 0, NULL, -1, -1.0000, 0, 'FDDR5UFHFHTD566SS3W54HVHJF87RDYDGRDTRSRTDS56EYDTRE4DRYDY');

-- --------------------------------------------------------

--
-- Structure de la table `partener_settings`
--

CREATE TABLE `partener_settings` (
  `id` int(11) NOT NULL,
  `parteners_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `phones`
--

CREATE TABLE `phones` (
  `id` int(11) NOT NULL,
  `solde` double(17,4) NOT NULL DEFAULT '0.0000' COMMENT 'Solde reel du service lié ',
  `number` varchar(255) NOT NULL COMMENT 'Le numero de telephone ',
  `codeSecret` varchar(255) DEFAULT NULL COMMENT 'Le code secret du telephone: Code de 9 chiffre ou le code PUK',
  `pin` varchar(255) DEFAULT NULL COMMENT 'Le code pin de la push ',
  `ltd` varchar(255) DEFAULT NULL COMMENT 'L''Alitude',
  `lgd` varchar(255) DEFAULT NULL COMMENT 'Longitude',
  `imei` varchar(255) DEFAULT NULL COMMENT 'Le code imeil du telephone',
  `uid` varchar(255) DEFAULT NULL COMMENT 'Le UID du telephone',
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'INACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `socket` enum('CONNECTED','DISCONNECTED') NOT NULL DEFAULT 'DISCONNECTED',
  `amount_reserved` double(17,4) NOT NULL DEFAULT '0.0000',
  `max_solde` double(17,4) NOT NULL DEFAULT '-1.0000',
  `alert_level_1_solde` double(17,4) NOT NULL DEFAULT '500000.0000' COMMENT 'Niveaux alert 1 : mettre -1 pour ignorer l’alerte ',
  `alert_level_2_solde` double(17,4) NOT NULL DEFAULT '250000.0000' COMMENT 'Niveaux alert 2 : mettre -1 pour ignorer l’alerte ',
  `alert_level_3_solde` double(17,4) NOT NULL DEFAULT '100000.0000' COMMENT 'Niveaux alert 3 : mettre -1 pour ignorer l’alerte ',
  `alert_level_4_solde` double(17,4) NOT NULL DEFAULT '50000.0000' COMMENT 'Niveaux alert 4 : mettre -1 pour ignorer l’alerte ',
  `alert_level_5_solde` double(17,4) NOT NULL DEFAULT '25000.0000' COMMENT 'Niveaux alert 5 : mettre -1 pour ignorer l’alerte ',
  `services_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `phones`
--

INSERT INTO `phones` (`id`, `solde`, `number`, `codeSecret`, `pin`, `ltd`, `lgd`, `imei`, `uid`, `state`, `created_at`, `updated_at`, `socket`, `amount_reserved`, `max_solde`, `alert_level_1_solde`, `alert_level_2_solde`, `alert_level_3_solde`, `alert_level_4_solde`, `alert_level_5_solde`, `services_id`) VALUES
(1, 5000.0000, '777293282', '2020', '0000', NULL, NULL, NULL, NULL, 'ACTIVED', '2021-05-11 09:49:31', NULL, 'DISCONNECTED', 0.0000, -1.0000, 500000.0000, 250000.0000, 100000.0000, 50000.0000, 25000.0000, 1),
(2, 5000.0000, '766144307', '2020', '0000', NULL, NULL, NULL, NULL, 'ACTIVED', '2021-05-11 09:49:31', NULL, 'CONNECTED', 0.0000, -1.0000, 500000.0000, 250000.0000, 100000.0000, 50000.0000, 25000.0000, 5),
(3, 5000.0000, '707980987', '2020', '0000', NULL, NULL, NULL, NULL, 'ACTIVED', '2021-05-11 09:49:31', NULL, 'DISCONNECTED', 0.0000, -1.0000, 500000.0000, 250000.0000, 100000.0000, 50000.0000, 25000.0000, 6);

-- --------------------------------------------------------

--
-- Structure de la table `plateforme`
--

CREATE TABLE `plateforme` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `profils`
--

CREATE TABLE `profils` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `releve_sous_services_parteners_solde_commission`
--

CREATE TABLE `releve_sous_services_parteners_solde_commission` (
  `id` int(11) NOT NULL,
  `sous_services_parteners_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') DEFAULT 'ACTIVED',
  `type_operation` enum('DEBIT','CREDIT') NOT NULL,
  `transactions_id` int(11) NOT NULL,
  `amount` double(17,4) NOT NULL,
  `solde_befor` double(17,4) NOT NULL,
  `solde_after` double(17,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `operators_id` int(11) NOT NULL,
  `categories_services_id` int(11) NOT NULL,
  `accecpte_phone` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Permet de préciser si cette service peut accepté d’être fait par sim box\n',
  `solde` double(17,4) NOT NULL DEFAULT '0.0000' COMMENT 'Solde globale du service. Exemple solde globale de tous les telephone lié a Wallet orange(Solde orange money global du système)',
  `amount_reserved` double(17,4) NOT NULL DEFAULT '0.0000',
  `alert_level_1_solde` double(17,4) NOT NULL DEFAULT '500000.0000',
  `alert_level_2_solde` double(17,4) NOT NULL DEFAULT '250000.0000',
  `alert_level_3_solde` double(17,4) NOT NULL DEFAULT '100000.0000',
  `alert_level_4_solde` double(17,4) NOT NULL DEFAULT '50000.0000',
  `alert_level_5_solde` double(17,4) NOT NULL DEFAULT '100000.0000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`id`, `name`, `icon`, `code`, `state`, `created_at`, `updated_at`, `operators_id`, `categories_services_id`, `accecpte_phone`, `solde`, `amount_reserved`, `alert_level_1_solde`, `alert_level_2_solde`, `alert_level_3_solde`, `alert_level_4_solde`, `alert_level_5_solde`) VALUES
(1, 'Orange Money', NULL, 'ORANGE_SN_WALLET', 'ACTIVED', '2021-05-11 09:49:31', NULL, 1, 1, 1, 0.0000, 0.0000, 500000.0000, 250000.0000, 100000.0000, 50000.0000, 100000.0000),
(2, 'Free Money', NULL, 'FREE_SN_WALLET', 'ACTIVED', '2021-05-11 09:49:31', NULL, 2, 1, 1, 0.0000, 0.0000, 500000.0000, 250000.0000, 100000.0000, 50000.0000, 100000.0000),
(3, 'E Money', NULL, 'EXPRESSO_SN_WALLET', 'ACTIVED', '2021-05-11 09:49:31', NULL, 3, 1, 1, 0.0000, 0.0000, 500000.0000, 250000.0000, 100000.0000, 50000.0000, 100000.0000),
(4, 'Orange Seedo', NULL, 'ORANGE_SN_AIRTIME', 'ACTIVED', '2021-05-11 09:49:31', NULL, 1, 2, 1, 0.0000, 0.0000, 500000.0000, 250000.0000, 100000.0000, 50000.0000, 100000.0000),
(5, 'Free Izi', NULL, 'FREE_SN_AIRTIME', 'ACTIVED', '2021-05-11 09:49:31', NULL, 2, 2, 1, 0.0000, 0.0000, 500000.0000, 250000.0000, 100000.0000, 50000.0000, 100000.0000),
(6, 'Expresso Yekalma', NULL, 'EXPRESS0_SN_AIRTIME', 'ACTIVED', '2021-05-11 09:49:31', NULL, 3, 2, 1, 0.0000, 0.0000, 500000.0000, 250000.0000, 100000.0000, 50000.0000, 100000.0000);

-- --------------------------------------------------------

--
-- Structure de la table `sous_services`
--

CREATE TABLE `sous_services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ussd_code` varchar(255) DEFAULT NULL,
  `regex_message_validation` text,
  `position_validation_index` text,
  `valid_ength` int(11) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `max_limit_transaction` double(17,4) NOT NULL DEFAULT '-1.0000' COMMENT 'limite par transaction(VALEUR -1 pour infini)\n',
  `max_limit_day` double(17,4) NOT NULL DEFAULT '-1.0000' COMMENT 'imit max par jour cumulé (VALEUR -1 pour infini)',
  `max_limit_week` double(17,4) NOT NULL DEFAULT '-1.0000' COMMENT 'limit max par semaine (VALEUR -1 pour infini)',
  `max_limit_month` double(17,4) NOT NULL DEFAULT '-1.0000' COMMENT 'limit max par moi(VALEUR -1 pour infini)',
  `max_limit_trimest` double(17,4) NOT NULL DEFAULT '-1.0000' COMMENT ' limit max par trimestre (VALEUR -1 pour infini)',
  `type_operation` enum('DEBIT','CREDIT') NOT NULL,
  `services_id` int(11) NOT NULL,
  `type_services_id` int(11) NOT NULL,
  `regex_phone` varchar(255) DEFAULT '([0-9]{9})'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sous_services`
--

INSERT INTO `sous_services` (`id`, `name`, `ussd_code`, `regex_message_validation`, `position_validation_index`, `valid_ength`, `icon`, `code`, `state`, `created_at`, `updated_at`, `max_limit_transaction`, `max_limit_day`, `max_limit_week`, `max_limit_month`, `max_limit_trimest`, `type_operation`, `services_id`, `type_services_id`, `regex_phone`) VALUES
(1, 'Depot Orange Money', '#145#1*amount*number*code#', '(Depot vers )([0-9]{9})(reussi.Informations detaillees:Montant transaction:)([0-9]*.[0-9]{2})(FCFA ID de transaction:)([0-9A-Z.]*)(Frais:)([0-9]*.[0-9]{2})(FCFA Commission:)([0-9]*.[0-9]{2})(FCFA Montant Net debite:)([0-9]*.[0-9]{2})(FCFA Nouveau solde:)([0-9]*.[0-9]{2})(FCFA.Orange Money.OFMS)', '{\"phone\":2,\"amount\":4,\"transactionId\":6,\"fee\":8,\"commission\":10,\"amount_debit_from_phone\":12,\"new_balance\":14}', 16, NULL, 'ORANGE_SN_WALLET_CASHIN', 'ACTIVED', '2021-05-11 09:49:31', NULL, -1.0000, -1.0000, -1.0000, -1.0000, -1.0000, 'DEBIT', 1, 1, '([0-9]{9})'),
(2, 'Depot Free Money', NULL, NULL, NULL, NULL, NULL, 'FREE_SN_WALLET_CASHIN', 'ACTIVED', '2021-05-11 09:49:31', NULL, -1.0000, -1.0000, -1.0000, -1.0000, -1.0000, 'DEBIT', 2, 1, '([0-9]{9})'),
(3, 'Depot E Money', NULL, NULL, NULL, NULL, NULL, 'EXPRESSO_SN_WALLET_CASHIN', 'ACTIVED', '2021-05-11 09:49:31', NULL, -1.0000, -1.0000, -1.0000, -1.0000, -1.0000, 'DEBIT', 3, 1, '([0-9]{9})'),
(4, 'Retrait Orange Money', '#145#2*1*number*amount*code#', '(Retrait du )([0-9]{9})([A-Za-z0-9 ]*)( par )([0-9]{9})( reussi:)([0-9]*.[0-9]{2})(FCFA.Commission:)([0-9]*.[0-9]{2})(FCFA.Ref:)([0-9A-Z.]*)( solde:)([0-9]*.[0-9]{2})(FCFA.Merci.OFMS)', '{\"phone\":2,\"phoneSim\":5,\"amount\":7,\"transactionId\":11,\"fee\":-1,\"commission\":9,\"amount_debit_from_phone\":-1,\"new_balance\":13}', 15, NULL, 'ORANGE_SN_WALLET_CASHOUT', 'ACTIVED', '2021-05-11 09:49:31', NULL, -1.0000, -1.0000, -1.0000, -1.0000, -1.0000, 'CREDIT', 1, 2, '([0-9]{9})'),
(5, 'Retrait Free Money', NULL, NULL, NULL, NULL, NULL, 'FREE_SN_WALLET_CASHOUT', 'ACTIVED', '2021-05-11 09:49:31', NULL, -1.0000, -1.0000, -1.0000, -1.0000, -1.0000, 'CREDIT', 2, 2, '([0-9]{9})'),
(6, 'Retrait E Money', NULL, NULL, NULL, NULL, NULL, 'EXPRESSO_SN_WALLET_CASHOUT', 'ACTIVED', '2021-05-11 09:49:31', NULL, -1.0000, -1.0000, -1.0000, -1.0000, -1.0000, 'CREDIT', 3, 2, '([0-9]{9})'),
(7, 'Achat credit Orange', NULL, NULL, NULL, NULL, NULL, 'ORANGE_SN_AIRTIME_CREDIT_TELEPHONIQUE', 'ACTIVED', '2021-05-11 09:49:31', NULL, -1.0000, -1.0000, -1.0000, -1.0000, -1.0000, 'DEBIT', 4, 3, '([0-9]{9})'),
(8, 'Achat credit Free', '#145#1*amount*number*code#', '(Retrait du )([0-9]{9})([A-Za-z0-9 ]*)( par )([0-9]{9})( reussi:)([0-9]*.[0-9]{2})(FCFA.Commission:)([0-9]*.[0-9]{2})(FCFA.Ref:)([0-9A-Z.]*)( solde:)([0-9]*.[0-9]{2})(FCFA.Merci.OFMS)', '{\"phone\":2,\"phoneSim\":5,\"amount\":7,\"transactionId\":11,\"fee\":-1,\"commission\":9,\"amount_debit_from_phone\":-1,\"new_balance\":13}', 15, NULL, 'FREE_SN_AIRTIME_CREDIT_TELEPHONIQUE', 'ACTIVED', '2021-05-11 09:49:31', NULL, -1.0000, -1.0000, -1.0000, -1.0000, -1.0000, 'DEBIT', 5, 3, '([0-9]{9})'),
(9, 'Achat credit Expresso', NULL, NULL, NULL, NULL, NULL, 'EXPRESS0_SN_AIRTIME_CREDIT_TELEPHONIQUE', 'ACTIVED', '2021-05-11 09:49:31', NULL, -1.0000, -1.0000, -1.0000, -1.0000, -1.0000, 'DEBIT', 6, 3, '([0-9]{9})'),
(10, 'Achat credit Orange Money', NULL, NULL, NULL, NULL, NULL, 'ORANGE_SN_WALLET_CREDIT_TELEPHONIQUE', 'ACTIVED', '2021-05-11 09:49:31', NULL, -1.0000, -1.0000, -1.0000, -1.0000, -1.0000, 'CREDIT', 1, 3, '([0-9]{9})');

-- --------------------------------------------------------

--
-- Structure de la table `sous_services_parteners`
--

CREATE TABLE `sous_services_parteners` (
  `id` int(11) NOT NULL,
  `sous_services_id` int(11) NOT NULL,
  `parteners_id` int(11) NOT NULL,
  `solde_commission` double(17,4) DEFAULT '0.0000',
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `amount_reserved` double(17,4) NOT NULL DEFAULT '0.0000',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sous_services_parteners`
--

INSERT INTO `sous_services_parteners` (`id`, `sous_services_id`, `parteners_id`, `solde_commission`, `state`, `amount_reserved`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 0.0000, 'ACTIVED', 0.0000, '2021-05-11 09:49:31', NULL),
(2, 4, 1, 0.0000, 'ACTIVED', 0.0000, '2021-05-11 09:49:31', NULL),
(3, 10, 1, 0.0000, 'ACTIVED', 0.0000, '2021-05-11 09:49:31', NULL),
(4, 2, 1, 0.0000, 'ACTIVED', 0.0000, '2021-05-11 09:49:31', NULL),
(5, 5, 1, 0.0000, 'ACTIVED', 0.0000, '2021-05-11 09:49:31', NULL),
(6, 8, 1, 0.0000, 'ACTIVED', 0.0000, '2021-05-11 09:49:31', NULL),
(7, 3, 1, 0.0000, 'ACTIVED', 0.0000, '2021-05-11 09:49:31', NULL),
(8, 6, 1, 0.0000, 'ACTIVED', 0.0000, '2021-05-11 09:49:31', NULL),
(9, 9, 1, 0.0000, 'ACTIVED', 0.0000, '2021-05-11 09:49:31', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `sous_services_phones`
--

CREATE TABLE `sous_services_phones` (
  `id` int(11) NOT NULL,
  `sous_services_id` int(11) NOT NULL,
  `phones_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sous_services_phones`
--

INSERT INTO `sous_services_phones` (`id`, `sous_services_id`, `phones_id`, `created_at`, `updated_at`, `state`) VALUES
(1, 1, 1, '2021-05-11 09:49:31', NULL, 'ACTIVED'),
(2, 4, 1, '2021-05-11 09:49:31', NULL, 'ACTIVED'),
(3, 10, 1, '2021-05-11 09:49:31', NULL, 'ACTIVED'),
(4, 2, 2, '2021-05-11 09:49:31', NULL, 'ACTIVED'),
(5, 5, 2, '2021-05-11 09:49:31', NULL, 'ACTIVED'),
(6, 8, 2, '2021-05-11 09:49:31', NULL, 'ACTIVED'),
(7, 3, 3, '2021-05-11 09:49:31', NULL, 'ACTIVED'),
(8, 6, 3, '2021-05-11 09:49:31', NULL, 'ACTIVED'),
(9, 9, 3, '2021-05-11 09:49:31', NULL, 'ACTIVED');

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `type_operation` enum('DEBIT','CREDIT') NOT NULL,
  `sous_services_id` int(11) NOT NULL,
  `phones_id` int(11) DEFAULT NULL,
  `partener_comptes_id` int(11) NOT NULL,
  `parteners_id` int(11) NOT NULL,
  `solde` double(17,4) NOT NULL,
  `commission_amount` double(17,4) NOT NULL,
  `fee_amount` double(17,4) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `statut` enum('SUCCESS','PENDING','PROCESSING','FAILLED','CANCELED') NOT NULL DEFAULT 'PENDING',
  `date_creation` datetime DEFAULT NULL COMMENT 'Date de creation de la transaction',
  `date_success` datetime DEFAULT NULL COMMENT 'Date de succès de la transaction',
  `date_canceled` datetime DEFAULT NULL COMMENT 'Date de canceled de la transaction',
  `date_processing` datetime DEFAULT NULL COMMENT 'Date de processing de la transaction',
  `date_failled` datetime DEFAULT NULL COMMENT 'Date d’annulation de la transaction',
  `service_name` varchar(255) NOT NULL,
  `message` text,
  `transaction_id` varchar(255) NOT NULL,
  `external_transaction_id` varchar(255) NOT NULL,
  `sous_service_name` varchar(255) NOT NULL,
  `operateur_name` varchar(255) NOT NULL,
  `telephone_number_service` varchar(255) DEFAULT NULL,
  `partner_compte_name` varchar(255) NOT NULL,
  `partener_name` varchar(255) NOT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `data` longtext COMMENT 'Les données en json qui ont été envoyées par le client parteneur ',
  `amount` double(17,4) NOT NULL COMMENT 'Montant de transaction ',
  `url_ipn` varchar(255) NOT NULL COMMENT 'Le pin du call back qui doit être en HTTPS',
  `phone` varchar(45) NOT NULL COMMENT 'Le numero de telephone du receveur ou de envoyeur',
  `sous_service_transaction_id` varchar(255) DEFAULT NULL,
  `data_sended_callback` longtext COMMENT 'Les donnees envoyes par le callback',
  `data_response_callback` longtext COMMENT 'Les donnees recu par le callback',
  `callback_is_send` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'letat envoi du callback: 1- envoyee : 0 no envoyer - 2 echeque envoie',
  `code_sous_service` varchar(255) DEFAULT NULL,
  `error_message` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `type_services`
--

CREATE TABLE `type_services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `type_operation` enum('DEBIT','CREDIT') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `type_services`
--

INSERT INTO `type_services` (`id`, `name`, `code`, `state`, `created_at`, `updated_at`, `type_operation`) VALUES
(1, 'CASHIN', 'CASHIN', 'ACTIVED', '2021-05-11 09:49:31', NULL, 'DEBIT'),
(2, 'CASHOUT', 'CASHOUT', 'ACTIVED', '2021-05-11 09:49:31', NULL, 'CREDIT'),
(3, 'CREDIT TELEPHONIQUE', 'CREDIT_TELEPHONIQUE', 'ACTIVED', '2021-05-11 09:49:31', NULL, 'DEBIT');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `plateforme_id` int(11) NOT NULL,
  `profils_id` int(11) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `address` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `ussd_execution_messages`
--

CREATE TABLE `ussd_execution_messages` (
  `id` int(11) NOT NULL,
  `message` longtext,
  `state` enum('ACTIVED','INACTIVED','DELETED') NOT NULL DEFAULT 'ACTIVED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `phones_id` int(11) NOT NULL,
  `transactions_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_6a06e2b9e1a744af989693a222` (`code`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD KEY `fk_actions_modules1_idx` (`modules_id`);

--
-- Index pour la table `actions_profils`
--
ALTER TABLE `actions_profils`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_actions_has_profils_profils1_idx` (`profils_id`),
  ADD KEY `fk_actions_has_profils_actions1_idx` (`actions_id`);

--
-- Index pour la table `activities_phones`
--
ALTER TABLE `activities_phones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_bfef708683634511fbe6e9f499e` (`phones_id`);

--
-- Index pour la table `categories_services`
--
ALTER TABLE `categories_services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD UNIQUE KEY `IDX_cf8e7b85829c8639827c14a63c` (`code`);

--
-- Index pour la table `commission`
--
ALTER TABLE `commission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_commission_sous_services1_idx` (`sous_services_id`),
  ADD KEY `fk_commission_parteners1_idx` (`parteners_id`);

--
-- Index pour la table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD UNIQUE KEY `IDX_8ff4c23dc9a3f3856555bd8618` (`code`);

--
-- Index pour la table `message_ussds`
--
ALTER TABLE `message_ussds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_message_ussds_sous_services1_idx` (`sous_services_id`);

--
-- Index pour la table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD UNIQUE KEY `IDX_25b42b11ac8b697cdb2eddcef1` (`code`),
  ADD KEY `fk_modules_modules1_idx` (`modules_id`);

--
-- Index pour la table `operation_comptes_parteners`
--
ALTER TABLE `operation_comptes_parteners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_operation_parteners_parteners1_idx` (`parteners_id`),
  ADD KEY `fk_operation_comptes_parteners_transactions1_idx` (`transactions_id`),
  ADD KEY `fk_operation_comptes_parteners_partener_comptes1_idx` (`partener_comptes_id`),
  ADD KEY `fk_operation_comptes_parteners_operation_comptes_parteners1_idx` (`operation_comptes_parteners_id`);

--
-- Index pour la table `operation_parteners`
--
ALTER TABLE `operation_parteners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_operation_parteners_transactions1_idx` (`transactions_id`),
  ADD KEY `fk_operation_parteners_parteners1_idx` (`parteners_id`);

--
-- Index pour la table `operation_phones`
--
ALTER TABLE `operation_phones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_operation_phones_phones1_idx` (`phones_id`),
  ADD KEY `fk_operation_phones_operation_phones1_idx` (`operation_phones_id`);

--
-- Index pour la table `operators`
--
ALTER TABLE `operators`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD UNIQUE KEY `IDX_dee5c11486c918aaf146e591bd` (`code`),
  ADD KEY `FK_430d4375977913d05cacd90b163` (`countries_id`);

--
-- Index pour la table `parteners`
--
ALTER TABLE `parteners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_UNIQUE` (`phone`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `IDX_d0cef6e9693268015b0029cd1d` (`phone`),
  ADD UNIQUE KEY `IDX_0685affcb4991e9b37ff4eaf8c` (`email`);

--
-- Index pour la table `partener_comptes`
--
ALTER TABLE `partener_comptes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_UNIQUE` (`phone`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `IDX_a3cd3270f92b2b1e28213a480e` (`phone`),
  ADD UNIQUE KEY `IDX_d388d3fd192850c9178b6ee7cf` (`email`),
  ADD UNIQUE KEY `app_key_UNIQUE` (`app_key`),
  ADD UNIQUE KEY `IDX_2c6ce91b52191dacdf14d77a91` (`app_key`),
  ADD KEY `fk_partener_comptes_parteners1_idx` (`parteners_id`);

--
-- Index pour la table `partener_settings`
--
ALTER TABLE `partener_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_partener_settings_parteners1_idx` (`parteners_id`);

--
-- Index pour la table `phones`
--
ALTER TABLE `phones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number_UNIQUE` (`number`),
  ADD UNIQUE KEY `IDX_f6f7db95ce37aa48d13c1333ac` (`number`),
  ADD UNIQUE KEY `IDX_1249f5ed43012a10719c2862cc` (`imei`),
  ADD UNIQUE KEY `IDX_cee839e91694fb0fd55d32106d` (`uid`),
  ADD KEY `fk_phones_services1_idx` (`services_id`);

--
-- Index pour la table `plateforme`
--
ALTER TABLE `plateforme`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `profils`
--
ALTER TABLE `profils`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD UNIQUE KEY `IDX_ced29c8015f38eaa5473c8b244` (`code`);

--
-- Index pour la table `releve_sous_services_parteners_solde_commission`
--
ALTER TABLE `releve_sous_services_parteners_solde_commission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_releve_sous_services_parteners_sous_services_parteners1_idx` (`sous_services_parteners_id`),
  ADD KEY `fk_releve_sous_services_parteners_solde_commission_transact_idx` (`transactions_id`);

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD UNIQUE KEY `IDX_f019a17cb439406ab185382df9` (`code`),
  ADD KEY `fk_services_operators_idx` (`operators_id`),
  ADD KEY `FK_fc23e8fe3d2bdc94da77f70a159` (`categories_services_id`);

--
-- Index pour la table `sous_services`
--
ALTER TABLE `sous_services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD UNIQUE KEY `IDX_4dd1ee22c6234e4b07b787bc06` (`code`),
  ADD KEY `fk_sous_services_type_services1_idx` (`type_services_id`),
  ADD KEY `fk_sous_services_services1_idx` (`services_id`);

--
-- Index pour la table `sous_services_parteners`
--
ALTER TABLE `sous_services_parteners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sous_services_has_parteners_sous_services1_idx` (`sous_services_id`),
  ADD KEY `fk_sous_services_has_parteners_parteners1_idx` (`parteners_id`);

--
-- Index pour la table `sous_services_phones`
--
ALTER TABLE `sous_services_phones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sous_services_has_phones_sous_services1_idx` (`sous_services_id`),
  ADD KEY `fk_sous_services_has_phones_phones1_idx` (`phones_id`);

--
-- Index pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_9162bf9ab4e31961a8f7932974` (`transaction_id`),
  ADD UNIQUE KEY `IDX_7eb4a7fd3c043ebb17236fe037` (`external_transaction_id`),
  ADD KEY `fk_transactions_sous_services1_idx` (`sous_services_id`),
  ADD KEY `fk_transactions_phones1_idx` (`phones_id`),
  ADD KEY `fk_transactions_parteners1_idx` (`parteners_id`),
  ADD KEY `fk_transactions_partener_comptes1_idx` (`partener_comptes_id`);

--
-- Index pour la table `type_services`
--
ALTER TABLE `type_services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD UNIQUE KEY `IDX_166b3eba509f07aacfbf16c701` (`code`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_UNIQUE` (`phone`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  ADD UNIQUE KEY `IDX_a000cca60bcf04454e72769949` (`phone`),
  ADD UNIQUE KEY `IDX_1f7a2b11e29b1422a2622beab3` (`code`),
  ADD KEY `fk_users_profils1_idx` (`profils_id`),
  ADD KEY `fk_users_plateforme1_idx` (`plateforme_id`);

--
-- Index pour la table `ussd_execution_messages`
--
ALTER TABLE `ussd_execution_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_62d929ae5ad9a924b179215de48` (`phones_id`),
  ADD KEY `FK_f28098c4eef5b656aec824cf40b` (`transactions_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `actions`
--
ALTER TABLE `actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `actions_profils`
--
ALTER TABLE `actions_profils`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `activities_phones`
--
ALTER TABLE `activities_phones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categories_services`
--
ALTER TABLE `categories_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `commission`
--
ALTER TABLE `commission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;

--
-- AUTO_INCREMENT pour la table `message_ussds`
--
ALTER TABLE `message_ussds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `operation_comptes_parteners`
--
ALTER TABLE `operation_comptes_parteners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `operation_parteners`
--
ALTER TABLE `operation_parteners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `operation_phones`
--
ALTER TABLE `operation_phones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `operators`
--
ALTER TABLE `operators`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `parteners`
--
ALTER TABLE `parteners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `partener_comptes`
--
ALTER TABLE `partener_comptes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `partener_settings`
--
ALTER TABLE `partener_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `phones`
--
ALTER TABLE `phones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `plateforme`
--
ALTER TABLE `plateforme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `profils`
--
ALTER TABLE `profils`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `releve_sous_services_parteners_solde_commission`
--
ALTER TABLE `releve_sous_services_parteners_solde_commission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `sous_services`
--
ALTER TABLE `sous_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `sous_services_parteners`
--
ALTER TABLE `sous_services_parteners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `sous_services_phones`
--
ALTER TABLE `sous_services_phones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `type_services`
--
ALTER TABLE `type_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ussd_execution_messages`
--
ALTER TABLE `ussd_execution_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `actions`
--
ALTER TABLE `actions`
  ADD CONSTRAINT `FK_80e016b15a10c27a9f3de8c6589` FOREIGN KEY (`modules_id`) REFERENCES `modules` (`id`);

--
-- Contraintes pour la table `actions_profils`
--
ALTER TABLE `actions_profils`
  ADD CONSTRAINT `FK_36a14e46bd4140a19f0e30da54d` FOREIGN KEY (`actions_id`) REFERENCES `actions` (`id`),
  ADD CONSTRAINT `FK_99877f2cd80baf5c69e681e4244` FOREIGN KEY (`profils_id`) REFERENCES `profils` (`id`);

--
-- Contraintes pour la table `activities_phones`
--
ALTER TABLE `activities_phones`
  ADD CONSTRAINT `FK_bfef708683634511fbe6e9f499e` FOREIGN KEY (`phones_id`) REFERENCES `phones` (`id`);

--
-- Contraintes pour la table `commission`
--
ALTER TABLE `commission`
  ADD CONSTRAINT `FK_56db55a26dddd312c166c020296` FOREIGN KEY (`sous_services_id`) REFERENCES `sous_services` (`id`),
  ADD CONSTRAINT `FK_ca55836b272cba6dc3237596d2b` FOREIGN KEY (`parteners_id`) REFERENCES `parteners` (`id`);

--
-- Contraintes pour la table `message_ussds`
--
ALTER TABLE `message_ussds`
  ADD CONSTRAINT `FK_5b931e0037711949ffef743dfb4` FOREIGN KEY (`sous_services_id`) REFERENCES `sous_services` (`id`);

--
-- Contraintes pour la table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `FK_b7561f5cb0c2992bf81429d8f7c` FOREIGN KEY (`modules_id`) REFERENCES `modules` (`id`);

--
-- Contraintes pour la table `operation_comptes_parteners`
--
ALTER TABLE `operation_comptes_parteners`
  ADD CONSTRAINT `FK_26a61458a91ad36e2a15324eb2d` FOREIGN KEY (`transactions_id`) REFERENCES `transactions` (`id`),
  ADD CONSTRAINT `FK_769c4b64b0ed9ce81c4ebf75e24` FOREIGN KEY (`operation_comptes_parteners_id`) REFERENCES `operation_comptes_parteners` (`id`),
  ADD CONSTRAINT `FK_985c471c42e649e52485ef0b798` FOREIGN KEY (`parteners_id`) REFERENCES `parteners` (`id`),
  ADD CONSTRAINT `FK_bef46d2d4d5d2fffb88cb2df098` FOREIGN KEY (`partener_comptes_id`) REFERENCES `partener_comptes` (`id`);

--
-- Contraintes pour la table `operation_parteners`
--
ALTER TABLE `operation_parteners`
  ADD CONSTRAINT `FK_032d5b628760c3068870ff728be` FOREIGN KEY (`transactions_id`) REFERENCES `transactions` (`id`),
  ADD CONSTRAINT `FK_6a0e8502a9fde2f7ee1882eeca3` FOREIGN KEY (`parteners_id`) REFERENCES `parteners` (`id`);

--
-- Contraintes pour la table `operation_phones`
--
ALTER TABLE `operation_phones`
  ADD CONSTRAINT `FK_05c8d4a7f9ec066a4b867d26055` FOREIGN KEY (`phones_id`) REFERENCES `phones` (`id`),
  ADD CONSTRAINT `FK_975a67a3f9080470a56aa54fd04` FOREIGN KEY (`operation_phones_id`) REFERENCES `operation_phones` (`id`);

--
-- Contraintes pour la table `operators`
--
ALTER TABLE `operators`
  ADD CONSTRAINT `FK_430d4375977913d05cacd90b163` FOREIGN KEY (`countries_id`) REFERENCES `country` (`id`);

--
-- Contraintes pour la table `partener_comptes`
--
ALTER TABLE `partener_comptes`
  ADD CONSTRAINT `FK_9f3af3765396731792079c64fa2` FOREIGN KEY (`parteners_id`) REFERENCES `parteners` (`id`);

--
-- Contraintes pour la table `partener_settings`
--
ALTER TABLE `partener_settings`
  ADD CONSTRAINT `FK_a2bc228876beaf9c0a512cc88b2` FOREIGN KEY (`parteners_id`) REFERENCES `parteners` (`id`);

--
-- Contraintes pour la table `phones`
--
ALTER TABLE `phones`
  ADD CONSTRAINT `FK_684071af02827aad6620c8a17f9` FOREIGN KEY (`services_id`) REFERENCES `services` (`id`);

--
-- Contraintes pour la table `releve_sous_services_parteners_solde_commission`
--
ALTER TABLE `releve_sous_services_parteners_solde_commission`
  ADD CONSTRAINT `FK_3cb81f31a6d0aa6b616205c2d7c` FOREIGN KEY (`sous_services_parteners_id`) REFERENCES `sous_services_parteners` (`id`),
  ADD CONSTRAINT `FK_d2c15d2ea2ffc45acbdf75d1a7c` FOREIGN KEY (`transactions_id`) REFERENCES `transactions` (`id`);

--
-- Contraintes pour la table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `FK_0189b564aab345dcd2c2e9f33cb` FOREIGN KEY (`operators_id`) REFERENCES `operators` (`id`),
  ADD CONSTRAINT `FK_fc23e8fe3d2bdc94da77f70a159` FOREIGN KEY (`categories_services_id`) REFERENCES `categories_services` (`id`);

--
-- Contraintes pour la table `sous_services`
--
ALTER TABLE `sous_services`
  ADD CONSTRAINT `FK_97fbbbbf36f4639fb57d77d1bbf` FOREIGN KEY (`type_services_id`) REFERENCES `type_services` (`id`),
  ADD CONSTRAINT `FK_c92ccce1cee1588e6f2f0bd3788` FOREIGN KEY (`services_id`) REFERENCES `services` (`id`);

--
-- Contraintes pour la table `sous_services_parteners`
--
ALTER TABLE `sous_services_parteners`
  ADD CONSTRAINT `FK_9fe054d63f2e07e185b97772948` FOREIGN KEY (`parteners_id`) REFERENCES `parteners` (`id`),
  ADD CONSTRAINT `FK_c7357761853e985db994cceea6f` FOREIGN KEY (`sous_services_id`) REFERENCES `sous_services` (`id`);

--
-- Contraintes pour la table `sous_services_phones`
--
ALTER TABLE `sous_services_phones`
  ADD CONSTRAINT `FK_8dbc7af85a7425b03b5659e4060` FOREIGN KEY (`phones_id`) REFERENCES `phones` (`id`),
  ADD CONSTRAINT `FK_948f402589b7cd2261d5e19a0b9` FOREIGN KEY (`sous_services_id`) REFERENCES `sous_services` (`id`);

--
-- Contraintes pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `FK_62f2732ed0e5cdfae030835f83a` FOREIGN KEY (`partener_comptes_id`) REFERENCES `partener_comptes` (`id`),
  ADD CONSTRAINT `FK_82541d4719cc96c6e06e3621196` FOREIGN KEY (`phones_id`) REFERENCES `phones` (`id`),
  ADD CONSTRAINT `FK_ac487e9e6e4c30194fcd4dd6fe3` FOREIGN KEY (`parteners_id`) REFERENCES `parteners` (`id`),
  ADD CONSTRAINT `FK_bf51d5c315835c2439e74fa0ce8` FOREIGN KEY (`sous_services_id`) REFERENCES `sous_services` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_ac8ab4518e319a5592dd424f315` FOREIGN KEY (`plateforme_id`) REFERENCES `plateforme` (`id`),
  ADD CONSTRAINT `FK_b29831d8f0da288e760101707cb` FOREIGN KEY (`profils_id`) REFERENCES `profils` (`id`);

--
-- Contraintes pour la table `ussd_execution_messages`
--
ALTER TABLE `ussd_execution_messages`
  ADD CONSTRAINT `FK_62d929ae5ad9a924b179215de48` FOREIGN KEY (`phones_id`) REFERENCES `phones` (`id`),
  ADD CONSTRAINT `FK_f28098c4eef5b656aec824cf40b` FOREIGN KEY (`transactions_id`) REFERENCES `transactions` (`id`);
COMMIT;
