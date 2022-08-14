import { authController } from '@controllers/auth/index';
import { RequestHandler } from 'express';
import expressBasicAuth from 'express-basic-auth';

export default function basicAuth(): RequestHandler {
  return expressBasicAuth({
    authorizer: (username: any, password: any) => {
      console.log("1")
      try {
        authController.handle(username, password);
        console.log("2")
        return true;
      } catch (err) {
        console.log("3")
        throw err;
      }
      // const userMatches = expressBasicAuth.safeCompare(username, 'admin')
      // const passwordMatches = expressBasicAuth.safeCompare(password, 'supersecret')
      // return userMatches && passwordMatches
    }
  })
}

// import { NextFunction, Response } from 'express';
// import * as auth from 'express-basic-auth';

// export default function basicAuth(req: auth.IBasicAuthedRequest, _res: Response, _next: NextFunction) {
//   console.log('middleware: basic auth') //?

//   //const user = auth(req); //? await
//   console.log(req.auth);
//   console.log(req.auth.user);
//   console.log(req.auth.password);

//   const username: string = 'test'
//   const password: string = '123456'

//   // if (user && user.name.toLowerCase() === username.toLowerCase() && user.password === password) {
//   //     console.log('Basic Auth: success')
//   //     next()
//   // } else {
//   //     console.log('Basic Auth: failure')
//   //     res.statusCode = 401
//   //     res.end('Access denied')
//   // }
// }

// // export default basicAuth;