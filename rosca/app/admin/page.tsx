import UserTable from "@/components/tables/user-table";
import { getUsers } from "@/app/actions";

export default async function AdminPage() {
  const users = await getUsers()
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <UserTable users={users} />
      </div>
    </div>
  );
}