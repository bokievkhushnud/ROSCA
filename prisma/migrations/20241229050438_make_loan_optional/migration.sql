-- DropForeignKey
ALTER TABLE "Contribution" DROP CONSTRAINT "Contribution_loanId_fkey";

-- AlterTable
ALTER TABLE "Contribution" ALTER COLUMN "loanId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
