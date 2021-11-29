/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ResourceCollection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SnippetCollection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ResourceCollection_name_key` ON `ResourceCollection`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `SnippetCollection_name_key` ON `SnippetCollection`(`name`);
