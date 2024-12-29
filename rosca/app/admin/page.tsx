import UserTable from "@/components/tables/user-table";
import LoanTable from "@/components/tables/loan-table";
import { getUsers, getLoans, getContributions } from "@/app/actions";
import ContributionTable from "@/components/tables/contribution-table";


export default async function AdminPage() {
  const users = await getUsers()
  const loans = await getLoans()
  const contributions = await getContributions()
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <UserTable users={users} />
      </div>
      <div className="mt-6">
        <LoanTable loans={loans} users={users} />
      </div>
      <div className="mt-6">
        <ContributionTable contributions={contributions} users={users} />
      </div>
    </div>
  );
}