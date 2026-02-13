-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('VERIFIED', 'UNVERIFIED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'UNVERIFIED';

-- CreateTable
CREATE TABLE "TempSchedule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TempSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempProgram" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "duration" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "lead" TEXT,
    "type" "ProgramType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "TempProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempTimer" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "duration" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "lead" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TempTimer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TempSchedule_id_title_idx" ON "TempSchedule"("id", "title");

-- CreateIndex
CREATE INDEX "TempProgram_id_title_idx" ON "TempProgram"("id", "title");

-- CreateIndex
CREATE INDEX "TempTimer_id_title_idx" ON "TempTimer"("id", "title");

-- AddForeignKey
ALTER TABLE "TempProgram" ADD CONSTRAINT "TempProgram_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "TempSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
