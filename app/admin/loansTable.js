"use client";
import Table from "@/components/common/table";
import Modal from "@/components/common/modal";
import LoanForm from "@/components/common/loanForm";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const headers = ["Issued to", "Issue Date", "Initial Amount", "Interest Rate", "Amount to Pay", "Status"];

const adaptLoansForTable = (loans) => {
    return loans.map((loan) => ({
        id: loan.id,
        "issued to": `${loan.user.firstName} ${loan.user.lastName}`,
        "issue date": new Date(loan.issueDate).toLocaleDateString(),
        "initial amount": loan.amount,
        "interest rate": `${loan.interestRate}%`,
        "amount to pay": `${loan.amount + (loan.interestRate / 100 * loan.amount)}`,
        status: loan.status,
    }));
};

export default function LoansTable({ users, loans }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeletingInProgress, setIsDeletingInProgress] = useState(false);
	const [selectedLoan, setSelectedLoan] = useState(null);
	const queryClient = useQueryClient();

	const { mutate: deleteLoan, isPending: isDeleting } = useMutation({
		mutationFn: (loan) => {
			return fetch("/api/loans", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: loan.id }),
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["loans"] });
			setSelectedLoan(null);
		},
	});

	const onAddHandler = () => {
		setSelectedLoan(null);
		setIsModalOpen(true);
	};

	const onEditHandler = (loanFromTable) => {
		const selectedLoan = loans.find((loan) => loan.id === loanFromTable.id);
		setSelectedLoan(selectedLoan);
		setIsModalOpen(true);
	};

	const onDeleteHandler = (loan) => {
		setSelectedLoan(loan);
		setIsDeletingInProgress(true);
	};

	const handleConfirmDelete = () => {
		if (selectedLoan) {
			deleteLoan(selectedLoan);
		}
	};

	return (
		<>
			<Table
				title="Loans"
				headers={headers}
				items={adaptLoansForTable(loans)}
				onEdit={onEditHandler}
				onDelete={onDeleteHandler}
				onAdd={onAddHandler}
			/>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<LoanForm users={users || []} loan={selectedLoan} onCancel={() => setIsModalOpen(false)} />
			</Modal>
			{selectedLoan && (
				<Modal isOpen={isDeletingInProgress} onClose={() => setIsDeletingInProgress(false)}>
					<div className="text-center">
						<h3 className="text-lg font-medium text-gray-900">
							Confirm Deletion
						</h3>
						<p className="mt-2 text-sm text-gray-500">
							Are you sure you want to delete the loan issued to {selectedLoan["issued to"]}? This action cannot be undone.
						</p>
						<div className="mt-4 flex justify-center gap-2">
							<button
								type="button"
								className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
								onClick={handleConfirmDelete}
							>
								{isDeleting ? "Deleting..." : "Confirm"}
							</button>
							<button
								type="button"
								className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
								onClick={() => setSelectedLoan(null)}
							>
								Cancel
							</button>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}
