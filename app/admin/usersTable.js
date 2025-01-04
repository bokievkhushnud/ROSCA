"use client";
import Table from "@/components/common/table";
import Modal from "@/components/common/modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const headers = ["Name", "Email", "Role", "Status", "Phone"];

export default function UsersTable({ users }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const { mutate: deleteUser, isPending: isDeleting } = useMutation({
		mutationFn: (user) => {
			return fetch("/api/users", {
				method: "DELETE",
				body: JSON.stringify({ id: user.id }),
			});
		},
	});

	const queryClient = useQueryClient();

	const onEditHandler = (user) => {
		console.log(user);
	};

	const onDeleteHandler = (user) => {
		setSelectedUser(user);
		setIsModalOpen(true);
	};

	const handleConfirmDelete = () => {
		if (selectedUser) {
			deleteUser(selectedUser);
			queryClient.invalidateQueries({ queryKey: ["users"] });
		}
		setIsModalOpen(false);
	};

	return (
		<>
			<Table
				items={users}
				headers={headers}
				onEdit={onEditHandler}
				onDelete={onDeleteHandler}
				title="Users"
				isDeleting={isDeleting}
			/>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className="text-center">
					<h3 className="text-lg font-medium text-gray-900">
						Confirm Deletion
					</h3>
					<p className="mt-2 text-sm text-gray-500">
						Are you sure you want to delete {selectedUser?.name}? This action
						cannot be undone.
					</p>
					<div className="mt-4 flex justify-center gap-2">
						<button
							type="button"
							className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
							onClick={handleConfirmDelete}
						>
							Confirm
						</button>
						<button
							type="button"
							className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
							onClick={() => setIsModalOpen(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}
