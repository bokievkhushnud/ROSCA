import Table from "@/components/common/table";
const headers = ["Name", "Email", "Role", "Status", "Phone"];

export default function UsersTable({ users }) {
    return <Table items={users} headers={headers} onEdit={() => {}} onDelete={() => {}} title="Users" />
}