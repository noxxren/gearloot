import { Hono } from 'hono'
import { findUserByFields, getAllUsers, getUserById } from "@/controllers/usersController";

const user = new Hono();

user.get('/', getAllUsers)
user.get('/search', findUserByFields)
user.get('/:id', getUserById)

export default user

