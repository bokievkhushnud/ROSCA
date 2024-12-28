"use client";
import UserForm from "@/components/forms/user-form";
import UserTable from "@/components/tables/user-table";
import { getUsers } from "@/app/actions";
import { useEffect, useState } from "react";
import type { User } from "@prisma/client";

export default function AdminPage() {
  const [users, setUsers] = useState<Partial<User>[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Add User Form */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Add User
          </h1>
          <UserForm />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Users</h2>
          <UserTable users={users} />
        </div>
      </div>
    </div>
  );
}