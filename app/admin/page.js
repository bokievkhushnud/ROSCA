'use client'

import PageContent from "@/components/ui/pageContent";
import Table from "@/components/common/table";
import UsersTable from "@/app/admin/usersTable";
import { useQuery } from "@tanstack/react-query";
import { usersAdapter } from "@/utils/adapters";
const headers = ["Name", "Email", "Role"];

const loans = [
	{ id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
	{ id: 2, name: "Jane Doe", email: "jane.doe@example.com", role: "User" },
];

const contributions = [
	{ id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
	{ id: 2, name: "Jane Doe", email: "jane.doe@example.com", role: "User" },
];



export default function AdminPage() {
  const { data: usersData, error, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then((res) => res.json()),
  });
 
	return (
		<PageContent title="Admin Page">
      {isUsersLoading ? <div>Loading...</div> : <UsersTable users={usersAdapter(usersData)} />}
			<Table items={loans} headers={headers} onEdit={() => {}} onDelete={() => {}} onAdd={() => {}} title="Loans" />
			<Table items={contributions} headers={headers} onEdit={() => {}} onDelete={() => {}} onAdd={() => {}} title="Contributions" />
		</PageContent>
	);
}
