"use client";
import type { LoanFormData } from "@/types/loans";
import type { LoanStatus, User } from "@prisma/client";
import { createLoan } from "@/app/actions";

interface LoanFormProps {
	initialData?: Partial<LoanFormData>;
	onSubmit: (data: LoanFormData) => void;
	users: Partial<User>[];
}

export default function LoanForm({
	initialData,
	onSubmit,
	users,
}: LoanFormProps) {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const data: LoanFormData = {
			amount: Number(formData.get("amount")),
			interestRate: Number(formData.get("interestRate")),
			userId: Number(formData.get("userId")),
			status: String(formData.get("status")) as LoanStatus,
		};
		await createLoan(data);
		onSubmit(data);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid grid-cols-1 gap-6">
				<div>
					<label
						htmlFor="userId"
						className="block text-sm font-medium text-gray-900"
					>
						User
					</label>
					<select
						id="userId"
						name="userId"
						required
						className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
					>
						<option value="">Select a user</option>
						{users.map((user) => (
							<option key={user.id} value={user.id}>
								{user.firstName} {user.lastName}
							</option>
						))}
					</select>
				</div>

				<div>
					<label
						htmlFor="amount"
						className="block text-sm font-medium text-gray-900"
					>
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
					<label
						htmlFor="interestRate"
						className="block text-sm font-medium text-gray-900"
					>
						Interest Rate (%)
					</label>
					<input
						id="interestRate"
						type="number"
						name="interestRate"
						step="0.01"
						required
						className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
					/>
				</div>

				<div>
					<label
						htmlFor="status"
						className="block text-sm font-medium text-gray-900"
					>
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
						<option value="ACTIVE">Active</option>
						<option value="PAID">Paid</option>
						<option value="REJECTED">Rejected</option>
					</select>
				</div>
			</div>

			<div className="flex justify-end">
				<button
					type="submit"
					className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
				>
					Add Loan
				</button>
			</div>
		</form>
	);
}
