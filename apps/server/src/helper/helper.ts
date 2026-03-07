import { Context } from 'hono'
import { ApiResponse } from "@honokit/shared/types";
const handlerApiResponse = (c: Context, response: ApiResponse) => {

  if(response.success && response.data) {
    return c.json(response.data, 200)
  }

  let statusCode = 500
  if(response.error?.code) {
    statusCode = parseInt(response.error?.code)
  }

  return c.json({ error: response.error?.message }, statusCode)
}

export { handlerApiResponse }