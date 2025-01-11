"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function LoanForm({ users, onCancel, loan }) {

	const [formData, setFormData] = useState({
		amount: loan?.amount || 0,
		interestRate: loan?.interestRate || 2,
		status: loan?.status || "PENDING",
		issueDate: new Date(loan?.issueDate).toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
		userId: loan?.userId || (users.length > 0 ? users[0].id : null),
		description: loan?.description || "",
	});

	const [errors, setErrors] = useState({});
	const queryClient = useQueryClient();

	const { mutate: addLoan, isPending: isAdding, isError, error } = useMutation({
		mutationFn: async (newLoan) => {
			const response = await fetch("/api/loans", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newLoan),
			});
			if (!response.ok) {
				return response.json().then((err) => {
					throw new Error(err.message || "Failed to add loan");
					});
				}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["loans"] });
			onCancel(); // Close the modal on success
		},
		onError: (error) => {
			// Handle error state here
			setErrors((prev) => ({ ...prev, form: error.message }));
		},
	});

	const { mutate: updateLoan, isPending: isUpdating } = useMutation({
		mutationFn: async (updatedLoan) => {
			const response = await fetch('/api/loans', {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: loan.id, ...updatedLoan }),
			});
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["loans"] });
			onCancel(); // Close the modal on success
		},
		onError: (updatingError) => {
			setErrors((prev) => ({ ...prev, form: updatingError.message }));
		},
	});

	const validate = () => {
		const newErrors = {};
		if (!formData.amount) newErrors.amount = "Amount is required.";
		if (!formData.interestRate) newErrors.interestRate = "Interest rate is required.";
		if (!formData.userId) newErrors.userId = "User is required.";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			loan ? updateLoan(formData) : addLoan(formData);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<label htmlFor="amount" className="block text-sm font-medium text-gray-700">
					Amount (TJS)
				</label>
				<input
					type="number"
					name="amount"
					id="amount"
					value={formData.amount}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 text-gray-900 p-2"
				/>
				{errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
			</div>
			<div>
				<label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
					Interest Rate (%)
				</label>
				<input
					type="number"
					name="interestRate"
					id="interestRate"
					value={formData.interestRate}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 text-gray-900 p-2"
				/>
				{errors.interestRate && <p className="mt-1 text-sm text-red-600">{errors.interestRate}</p>}
			</div>
			<div>
				<label htmlFor="status" className="block text-sm font-medium text-gray-700">
					Status
				</label>
				<select
					name="status"
					id="status"
					value={formData.status}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 bg-white text-gray-900 p-2"
				>
					<option value="PENDING">Pending</option>
					<option value="ACTIVE">Active</option>
					<option value="PAID">Paid</option>
					<option value="REJECTED">Rejected</option>
				</select>
			</div>
			<div>
				<label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">
					Issue Date
				</label>
				<input
					type="date"
					name="issueDate"
					id="issueDate"
					value={formData.issueDate}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 text-gray-900 p-2"
				/>
			</div>
			<div>
				<label htmlFor="userId" className="block text-sm font-medium text-gray-700">
					Issued To
				</label>
				<select
					name="userId"
					id="userId"
					value={formData.userId}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 bg-white text-gray-900 p-2"
				>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.firstName} {user.lastName}
						</option>
					))}
				</select>
				{errors.userId && <p className="mt-1 text-sm text-red-600">{errors.userId}</p>}
			</div>
			<div>
				<label htmlFor="description" className="block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					name="description"
					id="description"
					value={formData.description}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 p-2"
				/>
			</div>
			{isError && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
			{errors.form && <p className="mt-1 text-sm text-red-600">{errors.form}</p>}
			<div className="flex justify-end gap-2">
				<button
					type="button"
					onClick={onCancel}
					className="inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
				>
					Cancel
				</button>
				{loan ? (
					<button
						type="submit"
						disabled={isUpdating}
						className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
							isUpdating ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
						}`}
					>
						{isUpdating ? "Updating..." : "Update"}
					</button>
				) : (
					<button
						type="submit"
					disabled={isAdding}
					className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
						isAdding ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
					}`}
				>
						{isAdding ? "Adding..." : "Add"}
					</button>
				)}
			</div>
		</form>
	);
} 