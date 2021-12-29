/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the `SnippetCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Snippet` DROP COLUMN `categoryName`,
    ADD COLUMN `collectionId` INTEGER NULL;

-- DropTable
DROP TABLE `SnippetCategory`;

-- CreateTable
CREATE TABLE `SnippetCollection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` MEDIUMTEXT NULL,

    UNIQUE INDEX `SnippetCollection_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
