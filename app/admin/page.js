'use client'

import PageContent from "@/components/ui/pageContent";
import Table from "@/components/common/table";
const headers = ["Name", "Email", "Role"];
const items = [
	{ id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
	{ id: 2, name: "Jane Doe", email: "jane.doe@example.com", role: "User" },
];

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
			<Table items={items} headers={headers} onEdit={() => {}} onDelete={() => {}} onAdd={() => {}} title="Users" />
			<Table items={loans} headers={headers} onEdit={() => {}} onDelete={() => {}} onAdd={() => {}} title="Loans" />
			<Table items={contributions} headers={headers} onEdit={() => {}} onDelete={() => {}} onAdd={() => {}} title="Contributions" />
		</PageContent>
	);
}
