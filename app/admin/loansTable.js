"use client";
import Table from "@/components/common/table";
import Modal from "@/components/common/modal";
import LoanForm from "@/components/common/loanForm";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const headers = ["Issued to", "Issue Date", "Initial Amount", "Interest Rate", "Amount to Pay", "Status"];

const adaptLoansForTable = (loans) => {
    return loans.map((loan) => ({
        id: loan.id,
        "issued to": `${loan.user.firstName} ${loan.user.lastName}`, // Match header "Issued to"
        "issue date": new Date(loan.issueDate).toLocaleDateString(), // Match header "Issue Date"
        "initial amount": loan.amount, // Match header "Initial Amount"
        "interest rate": `${loan.interestRate}%`, // Match header "Interest Rate"
        "amount to pay": `${loan.amount + (loan.interestRate/100 * loan.amount)}`, // Match header "Amount to Pay"
        status: loan.status, // Match header "Status"
    }));
};

export default function LoansTable({ users, loans }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const onAddHandler = () => {
		setIsModalOpen(true);
	};


	return (
		<>
			<Table
				title="Loans"
				headers={headers}
				items={adaptLoansForTable(loans)}
				onEdit={() => {}}
				onDelete={() => {}}
				onAdd={onAddHandler}
			/>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<LoanForm users={users || []} onCancel={() => setIsModalOpen(false)} />
			</Modal>
		</>
	);
}
