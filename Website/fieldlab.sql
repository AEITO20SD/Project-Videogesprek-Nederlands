-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 28 nov 2022 om 11:16
-- Serverversie: 10.4.21-MariaDB
-- PHP-versie: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fieldlab`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `assignments`
--

CREATE TABLE `assignments` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `correctAnswers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`correctAnswers`)),
  `possibleAnswers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`possibleAnswers`)),
  `docent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `assignments`
--

INSERT INTO `assignments` (`id`, `name`, `description`, `correctAnswers`, `possibleAnswers`, `docent_id`) VALUES
(1, 'Opdracht 1', 'Zet de formele videos op de juiste volgorde', '[1, 4, 7, 10, 13]', '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]', 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `docenten`
--

CREATE TABLE `docenten` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `docenten`
--

INSERT INTO `docenten` (`id`, `name`, `last_name`, `email`, `password`) VALUES
(1, 'Edwin', 'Koolhaas', 'edwin@samenspraak.nl', 'testwachtwoord123');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `url` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `tone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `videos`
--

INSERT INTO `videos` (`id`, `name`, `url`, `category`, `tone`) VALUES
(1, 'video1', 'videos/1.1.mp4', 'intro', 'formeel'),
(2, 'video2', 'videos/1.2.mp4', 'intro', 'informeel'),
(3, 'video3', 'videos/1.3.mp4', 'intro', 'nonchalant'),
(4, 'video4', 'videos/2.1.mp4', 'gespreksonderwerp', 'formeel'),
(5, 'video5', 'videos/2.2.mp4', 'gespreksonderwerp', 'informeel'),
(6, 'video6', 'videos/2.3.mp4', 'gespreksonderwerp', 'nonchalant'),
(7, 'video7', 'videos/3.1.mp4', '', ''),
(8, 'video8', 'videos/3.2.mp4', '', ''),
(9, 'video9', 'videos/3.3.mp4', '', ''),
(10, 'video10', 'videos/4.1.mp4', '', ''),
(11, 'video11', 'videos/4.2.mp4', '', ''),
(12, 'video12', 'videos/4.3.mp4', '', ''),
(13, 'video13', 'videos/5.1.mp4', '', ''),
(14, 'video14', 'videos/5.2.mp4', '', ''),
(15, 'video15', 'videos/5.3.mp4', '', '');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_docent` (`docent_id`);

--
-- Indexen voor tabel `docenten`
--
ALTER TABLE `docenten`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `docenten`
--
ALTER TABLE `docenten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `fk_docent` FOREIGN KEY (`docent_id`) REFERENCES `docenten` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
