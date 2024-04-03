/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `size` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `images` (`image_id`, `name`, `size`, `user_id`, `link`, `description`) VALUES
(6, 'image1', 1024, 2, 'image1.jpg', 'ảnh này ngon');
INSERT INTO `images` (`image_id`, `name`, `size`, `user_id`, `link`, `description`) VALUES
(7, 'image2', 2048, 2, 'image2.png', 'đẹp thế nhỉ');
INSERT INTO `images` (`image_id`, `name`, `size`, `user_id`, `link`, `description`) VALUES
(8, 'image3', 3072, 3, 'image3.png', NULL);
INSERT INTO `images` (`image_id`, `name`, `size`, `user_id`, `link`, `description`) VALUES
(9, 'image4', 4096, 1, 'image4.png', NULL),
(11, 'img_1', 1422745, 2, '1712070836219_326726.jpg', 'Đây là hình 1');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;