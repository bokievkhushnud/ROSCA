import type { UserRole, UserStatus } from "@prisma/client";

export interface UserFormData {
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phone: string;
	role: UserRole;
	status: UserStatus;
}
