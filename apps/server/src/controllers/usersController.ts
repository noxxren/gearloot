import { Context } from "hono";
import * as usersServices from "@/services/users/usersServices";
import { handlerApiResponse } from "@/helper/helper";
import { User } from "@honokit/shared/types";

const getAllUsers = async (c: Context) => {
  const res = usersServices.fetchAllUsers()

  return handlerApiResponse(c, res)
}
const findUserByFields = async (c: Context) => {
  const queries = c.req.query()
  let areAllParamsEmpty = Object.values(queries).every(value => value.trim() === '')

  if (areAllParamsEmpty) {
    const res = usersServices.fetchAllUsers()
    return handlerApiResponse(c, res)
  }

  const params = Object.entries(queries).reduce((acc, [key, value]) => {
    if (value.trim()) acc[key] = value
    return acc
  }, {} as Record<string, string>)

  const res = usersServices.fetchUserByField(params)
  return handlerApiResponse(c, [])
}
const getUserById = async (c: Context) => {
  const id = c.req.param('id')
  if (!id) return c.json({ error: 'Id must not be empty' }, 400)

  const res = usersServices.fetchUserByField({ id: id.toString() })
  return handlerApiResponse(c, res)
}

export { getAllUsers, findUserByFields, getUserById }