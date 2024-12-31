import UserTable from "@/components/tables/user-table";
import LoanTable from "@/components/tables/loan-table";
import { getUsers, getLoans, getContributions } from "@/app/actions";
import ContributionTable from "@/components/tables/contribution-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin",
	description: "Admin",
};

export default async function AdminPage() {
	const users = await getUsers();
	const loans = await getLoans();
	const contributions = await getContributions();
	return (
		<div className="min-h-screen p-6">
			<h1 className="text-2xl font-bold">Admin</h1>
			<div className="mt-6">
				<UserTable users={users} />
			</div>
			<div className="mt-6">
				<LoanTable loans={loans} users={users} />
			</div>
			<div className="mt-6">
				<ContributionTable
					contributions={contributions}
					users={users}
					loans={loans}
				/>
			</div>
		</div>
	);
}
