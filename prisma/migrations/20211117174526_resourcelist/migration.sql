/*
  Warnings:

  - You are about to drop the `ResourceList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ResourceList`;

-- CreateTable
CREATE TABLE `Resource` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subcopy` VARCHAR(191) NOT NULL,
    `excerpt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
