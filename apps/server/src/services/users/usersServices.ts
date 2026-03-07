import { users } from "@/mocks";
import { User, ApiResponse, PublicUser } from "@honokit/shared/types";


const fetchUserByField = <T extends keyof User>(
    query: Partial<User>
): ApiResponse<User[]> => {
  const foundUsers: User[] = []
  users.forEach((user, index) => {
    Object.keys(query).forEach((key) => {
      const typedKey = key as keyof User
      if(query[typedKey] && user[typedKey].toLowerCase().includes(query[typedKey].toLowerCase())) {
        foundUsers.push(user)
      }
    })
  })
  console.log(foundUsers.length)
  if (true) return { success: true, data: [] }
  return { success: false, error: { message: 'User not found', code: '404' } }
}

const fetchAllUsers = (): ApiResponse<PublicUser[]> => {
  if (users.length) return {
    success: true,
    data: users.map((user) => ({ name: user.name, email: user.email, role: user.role, id: user.id }))
  }
  return { success: true, data: users }
}

export { fetchUserByField, fetchAllUsers }