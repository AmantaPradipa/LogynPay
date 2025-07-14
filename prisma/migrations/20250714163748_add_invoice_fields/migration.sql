/*
  Warnings:

  - Made the column `externalId` on table `Invoice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "externalId" SET NOT NULL;
