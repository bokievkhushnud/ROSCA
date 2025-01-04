export const adaptUsersForTable = (users) => {
    return users.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone,
    }));
  }