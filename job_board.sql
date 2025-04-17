-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Thu 17 Apr 2025
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+05:30";

CREATE DATABASE IF NOT EXISTS `job_board` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `job_board`;

-- Table: admins
CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `admins` (`id`, `name`, `lastname`, `email`, `password`, `token`) VALUES
(2, 'Ravi', 'Sharma', 'ravi.sharma@admin.in', '$2b$10$eNb5zVTz2HIU9GHWPFV3deD/r5Jkvd.F6L0qzm20AN8yGW.2iBFPK', '7_DErLsNtMgUCSE_FG0x66dWqWPsP5SJ');

-- Table: advertisements
CREATE TABLE `advertisements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `company` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `contract` varchar(255) NOT NULL,
  `salary` int(11) NOT NULL,
  `postDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `advertisements` (`id`, `title`, `description`, `company`, `location`, `contract`, `salary`, `postDate`) VALUES
(3, 'DevOps Engineer', 'Looking for an intern', 2, 'Bangalore', 'Internship', 25000, '2024-10-10'),
(4, 'Office Helper', 'We are hiring support staff', 3, 'Noida', 'Contract', 10000, '2024-10-06'),
(5, 'Data Analyst', 'Join our analytics team', 3, 'Mumbai', 'Permanent', 30000, '2024-10-08'),
(26, 'Frontend Developer', 'Creative frontend dev needed', 8, 'Chennai', 'Contract', 32000, '2024-10-12'),
(27, 'Backend Developer', 'Work with modern tech', 13, 'Hyderabad', 'Permanent', 38000, '2024-10-14'),
(28, 'IT Support', 'Tech support for clients', 14, 'Pune', 'Contract', 27000, '2024-10-13'),
(29, 'Cybersecurity Analyst', 'Secure our systems', 13, 'Bangalore', 'Permanent', 46000, '2024-10-16'),
(30, 'Cloud Architect', 'Design cloud systems', 8, 'Delhi', 'Permanent', 55000, '2024-10-17'),
(31, 'HR Assistant', 'Support recruitment team', 3, 'Noida', 'Apprenticeship', 21000, '2024-10-14'),
(32, 'UX/UI Designer', 'Design user-friendly apps', 10, 'Kolkata', 'Contract', 30000, '2024-10-15'),
(33, 'Mobile App Developer', 'Build Android/iOS apps', 7, 'Ahmedabad', 'Permanent', 39000, '2024-10-18'),
(34, 'Business Analyst', 'Analyze market data', 12, 'Nagpur', 'Internship', 25000, '2024-10-16'),
(35, 'AI Researcher', 'AI development and research', 13, 'Hyderabad', 'Permanent', 50000, '2024-10-17'),
(36, 'QA Engineer', 'Product quality testing', 14, 'Pune', 'Permanent', 35000, '2024-10-18'),
(37, 'Digital Marketing Manager', 'Marketing strategy lead', 9, 'Jaipur', 'Permanent', 42000, '2024-10-19'),
(38, 'Network Administrator', 'Network support and maintenance', 8, 'Chennai', 'Contract', 33000, '2024-10-20'),
(39, 'DevOps Engineer', 'Deploy and maintain CI/CD', 11, 'Delhi', 'Permanent', 48000, '2024-10-21'),
(40, 'Research Scientist', 'Tech innovation research', 15, 'Lucknow', 'Permanent', 47000, '2024-10-22');

-- Table: applications
CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `clientId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `advertisementId` int(11) NOT NULL,
  `motivation` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `applications` (`id`, `clientId`, `name`, `lastName`, `email`, `phoneNumber`, `location`, `advertisementId`, `motivation`) VALUES
(32, -1, 'Ankit', 'Rao', 'ankitrao@gmail.com', '9876543210', 'Bangalore', 3, 'I am highly motivated and looking for an internship opportunity.'),
(33, 17, 'Ankit', 'Rao', 'ankit.rao@clients.in', '9876543210', 'Bangalore', 5, 'I am very interested in this position.'),
(34, 17, 'Ankit', 'Rao', 'ankit.rao@clients.in', '9876543210', 'Bangalore', 5, 'Reiterating my interest.'),
(35, 17, 'Ankit', 'Rao', 'ankit.rao@clients.in', '9876543210', 'Bangalore', 4, 'Also interested in this opportunity.'),
(36, -2, 'Ravi', 'Sharma', 'ravi.sharma@admin.in', '9876543210', 'Bangalore', 4, 'Admin applying for testing.'),
(41, 18, 'Priya', 'Kumar', 'priya.kumar@client.in', '9876543210', 'Bangalore', 5, 'Highly motivated and available.'),
(42, -3, 'admin', 'test', 'admin-test@jobboard.in', '9876543210', 'Bangalore', 10, 'Test motivation text');

-- Table: clients
CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `clients` (`id`, `name`, `lastName`, `email`, `password`, `phoneNumber`, `birthDate`, `location`, `token`) VALUES
(10, 'Rohan', 'Mehta', 'rohan.mehta@gmail.com', '$2b$10$H1VOYAWFzghW3B/E1TaCz.xmb.LMnDCKOAvK7WWC9/MNQSNGdazLi', '9876543210', '2000-09-30', 'Delhi', 'K2B31vKHnYJyu8EZFLoQ43czhdrUJU8e'),
(17, 'Ankit', 'Rao', 'ankit.rao@clients.in', '$2b$10$q5XKyuJJATzLkaOohuNj8Oe/79yoFWKTqSLBRLDpsPG1.aJXIkOUW', '9876543210', '1998-06-16', 'Bangalore', 'ztl9hUBYv0_fbSwU7Yh8hJtf4H1d0wab');

-- Table: companies
CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `companies` (`id`, `name`, `location`) VALUES
(2, 'Infosys', 'Bangalore'),
(3, 'TCS', 'Noida'),
(5, 'Wipro Solutions', 'Mumbai'),
(7, 'Tech Mahindra', 'Delhi'),
(8, 'HCL Technologies', 'Chennai'),
(9, 'Reliance Digital', 'Jaipur'),
(10, 'GreenTech India', 'Kolkata'),
(11, 'Mindtree', 'Delhi'),
(12, 'Zoho Corp', 'Nagpur'),
(13, 'Fractal Analytics', 'Hyderabad'),
(14, 'Zensar', 'Pune'),
(15, 'Robosoft', 'Lucknow'),
(16, 'Tata Elxsi', 'Gurugram');

-- Indexes
ALTER TABLE `admins` ADD PRIMARY KEY (`id`);
ALTER TABLE `advertisements` ADD PRIMARY KEY (`id`), ADD KEY `company` (`company`);
ALTER TABLE `applications` ADD PRIMARY KEY (`id`), ADD KEY `advertisementId` (`advertisementId`);
ALTER TABLE `clients` ADD PRIMARY KEY (`id`);
ALTER TABLE `companies` ADD PRIMARY KEY (`id`);

-- Auto Increments
ALTER TABLE `admins` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `advertisements` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
ALTER TABLE `applications` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
ALTER TABLE `clients` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
ALTER TABLE `companies` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

-- Foreign Keys
ALTER TABLE `advertisements` ADD CONSTRAINT `advertisements_ibfk_1` FOREIGN KEY (`company`) REFERENCES `companies` (`id`);

COMMIT;
