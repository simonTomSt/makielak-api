/*
  Warnings:

  - Changed the type of `name` on the `Content` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('HOME_PAGE', 'ABOUT_US', 'SERVICES', 'CERTIFICATES', 'CONTACT', 'FOOTER');

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "name",
ADD COLUMN     "name" "ContentType" NOT NULL;
