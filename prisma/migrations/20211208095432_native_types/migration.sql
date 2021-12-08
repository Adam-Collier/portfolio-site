-- AlterTable
ALTER TABLE `Resource` MODIFY `description` VARCHAR(250) NOT NULL;

-- AlterTable
ALTER TABLE `ResourceCollection` MODIFY `description` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Snippet` MODIFY `code` LONGTEXT NOT NULL;
