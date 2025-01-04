import Table from "@/components/common/table";
const headers = ["Name", "Email", "Role", "Status", "Phone"];
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function UsersTable({ users }) {
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
    }

    const onDeleteHandler = (user) => {
        deleteUser(user);
        queryClient.invalidateQueries({ queryKey: ["users"] });
    }

    return <Table items={users} headers={headers} onEdit={onEditHandler} onDelete={onDeleteHandler} title="Users" />
}
