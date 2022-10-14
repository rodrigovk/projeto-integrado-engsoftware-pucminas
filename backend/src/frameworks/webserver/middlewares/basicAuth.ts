import { authController } from '@controllers/auth/index';
import { RequestHandler } from 'express';
import expressBasicAuth from 'express-basic-auth';

export default function basicAuth(checkAdmin: boolean): RequestHandler {
  return expressBasicAuth({
    authorizeAsync: true,
    authorizer: async (username: any, password: any, callback: any) => {
      try {
        if (checkAdmin)
          await authController.executeUseCaseAdmin(username, password);
        else
          await authController.executeUseCase(username, password);
        return callback(null, true);
      } catch (err) {
        throw err; //return callback(null, false);
      }
    },
  })
}