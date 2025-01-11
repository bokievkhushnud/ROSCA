"use client";

import PageContent from "@/components/ui/pageContent";
import TableSkeleton from "@/components/common/tableSkeleton";
import Table from "@/components/common/table";
import UsersTable from "@/app/admin/usersTable";
import LoansTable from "@/app/admin/loansTable";
import { useQuery } from "@tanstack/react-query";
const headers = ["Name", "Email", "Role", "Status"];

const loans = [
	{
		id: 1,
		name: "John Doe",
		email: "john.doe@example.com",
		role: "Admin",
		status: "Active",
	},
	{
		id: 2,
		name: "Jane Doe",
		email: "jane.doe@example.com",
		role: "User",
		status: "Active",
	},
];

const contributions = [
	{
		id: 1,
		name: "John Doe",
		email: "john.doe@example.com",
		role: "Admin",
		status: "Active",
	},
	{
		id: 2,
		name: "Jane Doe",
		email: "jane.doe@example.com",
		role: "User",
		status: "Active",
	},
];

export default function AdminPage() {
	const {
		data: usersData,
		error: usersError,
		isLoading: isUsersLoading,
	} = useQuery({
		queryKey: ["users"],
		queryFn: () => fetch("/api/users").then((res) => res.json()),
	});

	const {
		data: loansData,
		error: loansError,
		isLoading: isLoansLoading,
	} = useQuery({
		queryKey: ["loans"],
		queryFn: () => fetch("/api/loans").then((res) => res.json()),
	});

	return (
		<PageContent title="Admin Page">
			{isUsersLoading ? <TableSkeleton /> : <UsersTable users={usersData} />}
			{isLoansLoading ? (
				<TableSkeleton />
			) : (
				<LoansTable users={usersData} loans={loansData} />
			)}
			<Table
				items={contributions}
				headers={headers}
				onEdit={() => {}}
				onDelete={() => {}}
				onAdd={() => {}}
				title="Contributions"
			/>
		</PageContent>
	);
}
