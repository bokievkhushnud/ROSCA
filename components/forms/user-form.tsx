"use client";
import type { UserFormData } from "@/types/users";
import type { UserRole, UserStatus } from "@prisma/client";
import { useState } from "react";
import { createUser } from "@/app/actions";

interface UserFormProps {
	initialData?: Partial<UserFormData>;
	onSubmit: (data: UserFormData) => void;
}

export default function UserForm({ initialData, onSubmit }: UserFormProps) {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const data: UserFormData = {
			username: String(formData.get("username")),
			email: String(formData.get("email")),
			password: String(formData.get("password")),
			firstName: String(formData.get("firstName")),
			lastName: String(formData.get("lastName")),
			phone: String(formData.get("phone")),
			role: String(formData.get("role")) as UserRole,
			status: String(formData.get("status")) as UserStatus,
		};
		await createUser(data);
		onSubmit(data);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{/* Username */}
				<div>
					<label
						htmlFor="username"
						className="block text-sm font-medium text-gray-900"
					>
						Username
					</label>
					<input
						id="username"
						type="text"
						name="username"
						required
						className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
					/>
				</div>

				{/* Email */}
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-900"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						name="email"
						required
						className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
					/>
				</div>

				{/* Password */}
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-900"
					>
						Password
					</label>
					<input
						id="password"
						type="password"
						name="password"
						required
						className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
					/>
				</div>

				{/* First Name */}
				<div>
					<label
						htmlFor="firstName"
						className="block text-sm font-medium text-gray-900"
					>
						First Name
					</label>
					<input
						id="firstName"
						type="text"
						name="firstName"
						className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
					/>
				</div>

				{/* Last Name */}
				<div>
					<label
						htmlFor="lastName"
						className="block text-sm font-medium text-gray-900"
					>
						Last Name
					</label>
					<input
						id="lastName"
						type="text"
						name="lastName"
						className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
					/>
				</div>

				{/* Phone */}
				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-900"
					>
						Phone
					</label>
					<input
						id="phone"
						type="tel"
						name="phone"
						className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
					/>
				</div>

				{/* Role */}
				<div>
					<label
						htmlFor="role"
						className="block text-sm font-medium text-gray-900"
					>
						Role
					</label>
					<select
						id="role"
						name="role"
						className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
					>
						<option value="USER">User</option>
						<option value="ADMIN">Admin</option>
						<option value="SUPERADMIN">Super Admin</option>
					</select>
				</div>

				{/* Status */}
				<div>
					<label
						htmlFor="status"
						className="block text-sm font-medium text-gray-900"
					>
						Status
					</label>
					<select
						id="status"
						name="status"
						className="mt-2 block w-full rounded-md bg-white px-4 py-2.5 text-gray-900 border border-gray-300 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-sm transition-colors"
					>
						<option value="ACTIVE">Active</option>
						<option value="INACTIVE">Inactive</option>
						<option value="SUSPENDED">Suspended</option>
					</select>
				</div>
			</div>

			<div className="flex justify-end">
				<button
					type="submit"
					className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
				>
					Add User
				</button>
			</div>
		</form>
	);
}
