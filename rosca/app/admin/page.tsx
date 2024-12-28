"use client";
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
      <div className="max-w-7xl mx-auto">
        <UserTable users={users} />
      </div>
    </div>
  );
}