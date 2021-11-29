/*
  Warnings:

  - You are about to drop the column `excerpt` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `subcopy` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the `ResourceItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resourceCollectionId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Resource` DROP COLUMN `excerpt`,
    DROP COLUMN `subcopy`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `link` VARCHAR(191) NOT NULL,
    ADD COLUMN `resourceCollectionId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `ResourceItem`;

-- CreateTable
CREATE TABLE `ResourceCollection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `excerpt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SnippetCollection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Snippet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `snippetCollectionId` INTEGER NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
