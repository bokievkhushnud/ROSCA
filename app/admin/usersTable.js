"use client";
import Table from "@/components/common/table";
import Modal from "@/components/common/modal";
import EditUserForm from "@/components/common/userForm";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adaptUsersForTable } from "@/utils/adapters";

const headers = ["Name", "Email", "Role", "Status", "Phone"];

const getUserFromOriginalObject = (userId, users) => {
    return users.find((user) => user.id === userId);    
}

export default function UsersTable({ users }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
	const { mutate: deleteUser, isPending: isDeleting } = useMutation({
		mutationFn: (user) => {
			return fetch("/api/users", {
				method: "DELETE",
				body: JSON.stringify({ id: user.id }),
			});
		},
        onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setIsModalOpen(false);
		},
	});

	const queryClient = useQueryClient();

	const onEditHandler = (user) => {
		setSelectedUser(getUserFromOriginalObject(user.id, users));
        setIsEditing(true);
	};

	const onDeleteHandler = (user) => {
		setSelectedUser(getUserFromOriginalObject(user.id, users));
		setIsModalOpen(true);
	};

	const handleConfirmDelete = () => {
		if (selectedUser) {
			deleteUser(selectedUser);
		}
	};

	return (
		<>
			<Table
				items={adaptUsersForTable(users)}
				headers={headers}
				onEdit={onEditHandler}
				onDelete={onDeleteHandler}
				title="Users"
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
							{isDeleting ? "Deleting..." : "Confirm"}
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
            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                <EditUserForm user={selectedUser} onConfirm={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />
            </Modal>
		</>
	);
}
