/*
  Warnings:

  - You are about to drop the column `content` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `summary` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Resource` DROP COLUMN `content`,
    ADD COLUMN `summary` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ResourceCollection` MODIFY `excerpt` VARCHAR(191) NULL;
