import { Context, Next } from "hono";

export const honokitMiddlewareLogger = () => {
  return async (c: Context, next: Next) => {
    const { method, path } = c.req;
    const start = performance.now();

    console.log('REQ')

    try {
      await next();

      const duration = (performance.now() - start).toFixed(2);
      const status = c.res.status;

      console.log(`STATUS - "${status}" | PATH - "${path}" | DURATION - "${duration}ms"`)
    } catch (e) {
      console.log(`ERROR - ${method} - ${path}`)
      throw e
    }
  }
}