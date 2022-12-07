-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 05 dec 2022 om 12:52
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
-- Database: `samenspraakdb`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `assignment`
--

CREATE TABLE `assignment` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `assignment`
--

INSERT INTO `assignment` (`id`, `name`, `description`) VALUES
(1, 'Nederlands', 'Superleuk!');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `assignment_has_video`
--

CREATE TABLE `assignment_has_video` (
  `assignmentId` int(11) NOT NULL,
  `videoId` int(11) NOT NULL,
  `order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `assignment_has_video`
--

INSERT INTO `assignment_has_video` (`assignmentId`, `videoId`, `order`) VALUES
(1, 1, 1),
(1, 4, 2),
(1, 7, 3),
(1, 10, 4),
(1, 13, 5);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `docent`
--

CREATE TABLE `docent` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `emailAddress` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `docent`
--

INSERT INTO `docent` (`id`, `firstName`, `lastName`, `emailAddress`, `password`) VALUES
(1, 'Lennard', 'Fonteijn', 'lennard@hva.nl', 'test123456'),
(2, 'Justin', 'Alink', 'justin@horizon.nl', 'test123456');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `docent_has_assignment`
--

CREATE TABLE `docent_has_assignment` (
  `assignmentId` int(11) NOT NULL,
  `docentId` int(11) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `docent_has_assignment`
--

INSERT INTO `docent_has_assignment` (`assignmentId`, `docentId`, `role`) VALUES
(1, 1, 0),
(1, 2, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `participant`
--

CREATE TABLE `participant` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `submissionTime` datetime NOT NULL,
  `roomId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `participant`
--

INSERT INTO `participant` (`id`, `name`, `submissionTime`, `roomId`) VALUES
(1, 'Ben Dover', '2022-11-29 15:45:00', 1),
(2, 'John Koos', '2022-11-29 16:00:00', 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `participant_has_video`
--

CREATE TABLE `participant_has_video` (
  `videoId` int(11) NOT NULL,
  `participantId` int(11) NOT NULL,
  `order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `participant_has_video`
--

INSERT INTO `participant_has_video` (`videoId`, `participantId`, `order`) VALUES
(1, 1, 0),
(1, 2, 1),
(2, 1, 1),
(2, 2, 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `token` varchar(10) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime DEFAULT NULL,
  `ownerId` int(11) NOT NULL,
  `assignmentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `room`
--

INSERT INTO `room` (`id`, `token`, `startTime`, `endTime`, `ownerId`, `assignmentId`) VALUES
(1, 'test', '2022-11-29 00:00:00', '2022-11-29 23:59:00', 1, 1),
(2, 'test', '2022-11-30 00:00:00', '2022-11-30 23:59:00', 1, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `video`
--

CREATE TABLE `video` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `assignmentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `video`
--

INSERT INTO `video` (`id`, `name`, `url`, `assignmentId`) VALUES
(1, 'video1', 'videos/1.1.mp4', 1),
(2, 'video2', 'videos/1.2.mp4', 1),
(3, 'video3', 'videos/1.3.mp4', 1),
(4, 'video4', 'videos/2.1.mp4', 1),
(5, 'video5', 'videos/2.2.mp4', 1),
(6, 'video6', 'videos/2.3.mp4', 1),
(7, 'video7', 'videos/3.1.mp4', 1),
(8, 'video8', 'videos/3.2.mp4', 1),
(9, 'video9', 'videos/3.3.mp4', 1),
(10, 'video10', 'videos/4.1.mp4', 1),
(11, 'video11', 'videos/4.2.mp4', 1),
(12, 'video12', 'videos/4.3.mp4', 1),
(13, 'video13', 'videos/5.1.mp4', 1),
(14, 'video14', 'videos/5.2.mp4', 1),
(15, 'video15', 'videos/5.3.mp4', 1);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `assignment_has_video`
--
ALTER TABLE `assignment_has_video`
  ADD PRIMARY KEY (`assignmentId`,`videoId`),
  ADD KEY `fk_Assignment_has_Video_Video1_idx` (`videoId`),
  ADD KEY `fk_Assignment_has_Video_Assignment1_idx` (`assignmentId`);

--
-- Indexen voor tabel `docent`
--
ALTER TABLE `docent`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `docent_has_assignment`
--
ALTER TABLE `docent_has_assignment`
  ADD PRIMARY KEY (`assignmentId`,`docentId`),
  ADD KEY `fk_Assignment_has_Docent_Docent1_idx` (`docentId`),
  ADD KEY `fk_Assignment_has_Docent_Assignment1_idx` (`assignmentId`);

--
-- Indexen voor tabel `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_room_idx` (`roomId`);

--
-- Indexen voor tabel `participant_has_video`
--
ALTER TABLE `participant_has_video`
  ADD PRIMARY KEY (`videoId`,`participantId`),
  ADD KEY `fk_Video_has_Participant_Participant1_idx` (`participantId`),
  ADD KEY `fk_Video_has_Participant_Video1_idx` (`videoId`);

--
-- Indexen voor tabel `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_docent1_idx` (`ownerId`),
  ADD KEY `fk_assignment1_idx` (`assignmentId`);

--
-- Indexen voor tabel `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_assignment_idx` (`assignmentId`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `assignment`
--
ALTER TABLE `assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `docent`
--
ALTER TABLE `docent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `participant`
--
ALTER TABLE `participant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `video`
--
ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `assignment_has_video`
--
ALTER TABLE `assignment_has_video`
  ADD CONSTRAINT `fk_Assignment_has_Video_Assignment1` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Assignment_has_Video_Video1` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `docent_has_assignment`
--
ALTER TABLE `docent_has_assignment`
  ADD CONSTRAINT `fk_Assignment_has_Docent_Assignment1` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Assignment_has_Docent_Docent1` FOREIGN KEY (`docentId`) REFERENCES `docent` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `participant`
--
ALTER TABLE `participant`
  ADD CONSTRAINT `fk_room` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `participant_has_video`
--
ALTER TABLE `participant_has_video`
  ADD CONSTRAINT `fk_Video_has_Participant_Participant1` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Video_has_Participant_Video1` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `fk_assignment1` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_docent1` FOREIGN KEY (`ownerId`) REFERENCES `docent` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `fk_assignment` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
