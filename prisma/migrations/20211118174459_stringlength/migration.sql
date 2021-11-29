-- AlterTable
ALTER TABLE `Resource` MODIFY `summary` VARCHAR(250) NOT NULL;

-- AlterTable
ALTER TABLE `ResourceCollection` MODIFY `description` VARCHAR(250) NOT NULL,
    MODIFY `excerpt` VARCHAR(250) NULL;

-- AlterTable
ALTER TABLE `Snippet` MODIFY `description` VARCHAR(250) NULL,
    MODIFY `code` VARCHAR(250) NOT NULL;
