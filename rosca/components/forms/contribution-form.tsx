"use client";
import { useState } from "react";
import type { ContributionFormData } from "@/types/contributions";
import type { ContributionStatus, ContributionType, User, Loan } from "@prisma/client";
import { createContribution } from "@/app/actions";

interface ContributionFormProps {
  initialData?: Partial<ContributionFormData>;
  onSubmit: (data: ContributionFormData) => void;
  users: Partial<User>[];
  loans: Partial<Loan>[];
}

export default function ContributionForm({ initialData, onSubmit, users, loans }: ContributionFormProps) {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<ContributionType>("CONTRIBUTION");

  // Filter loans for the selected user
  const userLoans = loans.filter(loan => loan.userId === selectedUserId && loan.status === "ACTIVE");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: ContributionFormData = {
      amount: Number(formData.get("amount")),
      userId: Number(formData.get("userId")),
      status: String(formData.get("status")) as ContributionStatus,
      contributionType: String(formData.get("contributionType")) as ContributionType,
      description: String(formData.get("description")),
      loanId: formData.get("loanId") ? Number(formData.get("loanId")) : undefined,
    };
    await createContribution(data);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-900">
            Member
          </label>
          <select
            id="userId"
            name="userId"
            required
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
            className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
          >
            <option value="">Select a member</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contributionType" className="block text-sm font-medium text-gray-900">
            Type
          </label>
          <select
            id="contributionType"
            name="contributionType"
            required
            onChange={(e) => setSelectedType(e.target.value as ContributionType)}
            className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
          >
            <option value="CONTRIBUTION">Contribution</option>
            <option value="LOAN_REPAYMENT">Loan Repayment</option>
            <option value="FINE">Fine</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Show loan selector only when type is LOAN_REPAYMENT and user is selected */}
        {selectedType === "LOAN_REPAYMENT" && selectedUserId && (
          <div>
            <label htmlFor="loanId" className="block text-sm font-medium text-gray-900">
              Select Loan
            </label>
            <select
              id="loanId"
              name="loanId"
              required
              className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
            >
              <option value="">Select a loan</option>
              {userLoans.map((loan) => (
                <option key={loan.id} value={loan.id}>
                  Loan #{loan.id} - ${loan.amount} ({loan.status})
                </option>
              ))}
            </select>
            {userLoans.length === 0 && (
              <p className="mt-1 text-sm text-red-500">No active loans found for this user</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            name="amount"
            step="0.01"
            required
            className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-900">
            Status
          </label>
          <select
            id="status"
            name="status"
            required
            className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
          >
            <option value="PENDING">Pending</option>
            <option value="RECEIVED">Received</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
        >
          Add Contribution
        </button>
      </div>
    </form>
  );
} 