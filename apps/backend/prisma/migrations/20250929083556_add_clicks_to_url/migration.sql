-- AlterTable
ALTER TABLE "public"."Url" ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Url_userId_idx" ON "public"."Url"("userId");

-- CreateIndex
CREATE INDEX "Url_shortCode_idx" ON "public"."Url"("shortCode");
