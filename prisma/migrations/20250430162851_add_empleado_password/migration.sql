/*
  Warnings:

  - Added the required column `password` to the `Empleado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empleado` ADD COLUMN `password` VARCHAR(255) NOT NULL;
