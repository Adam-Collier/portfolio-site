/*
  Warnings:

  - You are about to drop the column `snippetCollectionId` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the `SnippetCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Snippet` DROP COLUMN `snippetCollectionId`,
    ADD COLUMN `categoryId` INTEGER NULL;

-- DropTable
DROP TABLE `SnippetCollection`;

-- CreateTable
CREATE TABLE `SnippetCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SnippetCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
