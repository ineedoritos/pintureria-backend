/*
  Warnings:

  - You are about to drop the column `categoria` on the `material` table. All the data in the column will be lost.
  - You are about to alter the column `tipo` on the `material` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `material` DROP COLUMN `categoria`,
    MODIFY `tipo` ENUM('PRODUCTO', 'PINTURA') NOT NULL DEFAULT 'PRODUCTO';
