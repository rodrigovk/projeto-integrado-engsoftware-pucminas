import { authController } from '@controllers/auth/index';
import { RequestHandler } from 'express';
import expressBasicAuth from 'express-basic-auth';

export default function basicAuth(): RequestHandler {
  return expressBasicAuth({
    authorizeAsync: true,
    authorizer: async (username: any, password: any, callback: any) => {
      try {
        await authController.handle(username, password);
        return callback(null, true);
      } catch (err) {
        throw err; //return callback(null, false);
      }
    },
  })
}