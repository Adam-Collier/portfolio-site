/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Snippet` DROP COLUMN `categoryId`,
    ADD COLUMN `categoryName` VARCHAR(191) NOT NULL;
