import type { ContributionStatus, ContributionType } from "@prisma/client";

export interface ContributionFormData {
  amount: number;
  userId: number;
  status: ContributionStatus;
  contributionType: ContributionType;
  description: string;
} 