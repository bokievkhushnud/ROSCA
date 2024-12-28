"use client";
import { useState } from "react";
import type { UserFormData } from "@/types/users";
import type { UserRole, UserStatus } from "@prisma/client";
import { createUser } from "@/app/actions";

interface UserFormProps {
  initialData?: Partial<UserFormData>;
}

export default function UserForm({ initialData }: UserFormProps) {


  return (
    <form action={createUser} className="space-y-4">
      {/* Username */}
      <div className="flex flex-col">
        <label htmlFor="username" className="mb-1 text-gray-600 font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-gray-600 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 text-gray-600 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* First Name */}
      <div className="flex flex-col">
        <label htmlFor="firstName" className="mb-1 text-gray-600 font-medium">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label htmlFor="lastName" className="mb-1 text-gray-600 font-medium">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <label htmlFor="phone" className="mb-1 text-gray-600 font-medium">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Role */}
      <div className="flex flex-col">
        <label htmlFor="role" className="mb-1 text-gray-600 font-medium">
          Role
        </label>
        <select
          id="role"
          name="role"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPERADMIN">Super Admin</option>
        </select>
      </div>

      {/* Status */}
      <div className="flex flex-col">
        <label htmlFor="status" className="mb-1 text-gray-600 font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition-colors"
      >
        Add User
      </button>
    </form>
  );
}