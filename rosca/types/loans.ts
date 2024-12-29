import type { LoanStatus, User } from "@prisma/client";

export interface LoanFormData {
  amount: number;
  interestRate: number;
  userId: number;
  status: LoanStatus;
} 