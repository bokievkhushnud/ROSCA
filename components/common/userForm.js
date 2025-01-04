import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function EditUserForm({ user, onCancel }) {
	const [formData, setFormData] = useState({
		firstName: user.firstName || "",
		lastName: user.lastName || "",
		phone: user.phone || "",
		role: user.role || "USER",
		status: user.status || "ACTIVE",
	});

	const [errors, setErrors] = useState({});
	const queryClient = useQueryClient();

	const {
		mutate: updateUser,
		isPending: isUpdating,
		isError,
		error,
	} = useMutation({
		mutationFn: (updatedUser) => {
			return fetch("/api/users", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedUser),
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			onCancel(); // Close the modal on success
		},
	});

	const validate = () => {
		const newErrors = {};
		if (!formData.firstName) newErrors.firstName = "First name is required.";
		if (!formData.lastName) newErrors.lastName = "Last name is required.";
		if (!formData.phone) newErrors.phone = "Phone number is required.";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePhoneChange = (value) => {
        console.log(value)
		setFormData((prev) => ({ ...prev, phone: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			updateUser({ ...user, ...formData });
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<label
					htmlFor="firstName"
					className="block text-sm font-medium text-gray-700"
				>
					First Name
				</label>
				<input
					type="text"
					name="firstName"
					id="firstName"
					value={formData.firstName}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 text-gray-900 p-2"
				/>
				{errors.firstName && (
					<p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
				)}
			</div>
			<div>
				<label
					htmlFor="lastName"
					className="block text-sm font-medium text-gray-700"
				>
					Last Name
				</label>
				<input
					type="text"
					name="lastName"
					id="lastName"
					value={formData.lastName}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 text-gray-900 p-2"
				/>
				{errors.lastName && (
					<p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
				)}
			</div>
			<div>
				<label
					htmlFor="phone"
					className="block text-sm font-medium text-gray-700"
				>
					Phone
				</label>
				<PhoneInput
					country={"us"}
					value={formData.phone}
					onChange={handlePhoneChange}
					containerClass="mt-1 block w-full"
					inputClass="w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 text-gray-900 p-2"
					buttonClass="bg-white border border-gray-300"
					dropdownClass="bg-white border border-gray-300"
					searchClass="bg-white h-10 border border-gray-300"
				/>
				{errors.phone && (
					<p className="mt-1 text-sm text-red-600">{errors.phone}</p>
				)}
			</div>
			<div>
				<label
					htmlFor="role"
					className="block text-sm font-medium text-gray-700"
				>
					Role
				</label>
				<select
					name="role"
					id="role"
					value={formData.role}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 bg-white text-gray-900 p-2"
				>
					<option value="ADMIN">Admin</option>
					<option value="USER">User</option>
					<option value="SUPERADMIN">Superadmin</option>
				</select>
			</div>
			<div>
				<label
					htmlFor="status"
					className="block text-sm font-medium text-gray-700"
				>
					Status
				</label>
				<select
					name="status"
					id="status"
					value={formData.status}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 bg-white text-gray-900 p-2"
				>
					<option value="ACTIVE">Active</option>
					<option value="INACTIVE">Inactive</option>
					<option value="SUSPENDED">Suspended</option>
				</select>
			</div>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email
				</label>
				<input
					type="text"
					name="email"
					id="email"
					value={user.email}
					disabled
					className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 shadow-sm sm:text-sm h-10 text-gray-500 p-2"
				/>
			</div>
			{isError && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
			<div className="flex justify-end gap-2">
				<button
					type="button"
					onClick={onCancel}
					className="inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isUpdating}
					className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
						isUpdating ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
					}`}
				>
					{isUpdating ? "Saving..." : "Save"}
				</button>
			</div>
		</form>
	);
}
