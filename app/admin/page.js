'use client'

import PageContent from "@/components/ui/pageContent";
import Table from "@/components/common/table";
import UsersTable from "@/app/admin/usersTable";
const headers = ["Name", "Email", "Role"];
const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active", phone: "1234567890" },
  { id: 2, name: "Jane Doe", email: "jane.doe@example.com", role: "User", status: "Inactive", phone: "1234567890" },
]
const loans = [
	{ id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
	{ id: 2, name: "Jane Doe", email: "jane.doe@example.com", role: "User" },
];

const contributions = [
	{ id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
	{ id: 2, name: "Jane Doe", email: "jane.doe@example.com", role: "User" },
];

export default function AdminPage() {
	return (
		<PageContent title="Admin Page">
			<UsersTable users={users} />
			<Table items={loans} headers={headers} onEdit={() => {}} onDelete={() => {}} onAdd={() => {}} title="Loans" />
			<Table items={contributions} headers={headers} onEdit={() => {}} onDelete={() => {}} onAdd={() => {}} title="Contributions" />
		</PageContent>
	);
}
