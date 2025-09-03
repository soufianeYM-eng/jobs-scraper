/*
  Warnings:

  - The primary key for the `job_alert` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."job_alert" DROP CONSTRAINT "job_alert_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "job_alert_pkey" PRIMARY KEY ("id");
