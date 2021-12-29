/*
  Warnings:

  - You are about to drop the column `code` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `content` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `SnippetCollection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Snippet` DROP COLUMN `code`,
    DROP COLUMN `description`,
    ADD COLUMN `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `SnippetCollection` ADD COLUMN `description` MEDIUMTEXT NOT NULL,
    ADD COLUMN `excerpt` VARCHAR(250) NULL;
