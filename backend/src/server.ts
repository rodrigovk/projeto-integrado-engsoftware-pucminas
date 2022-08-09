// import errorHandler from "@frameworks/webserver/middlewares/error-handler";
// import express from "express";
// import "express-async-errors";
// import router from "./routes";

// const app = express();

// app.use(express.json());
// app.use(router);
// app.use(errorHandler);

// app.listen(4003, () => console.log("Server is running on PORT 4003"));

(async () => {
  const app = (await import("@frameworks/webserver/app")).default;
  app.listen(4003, () => console.log("Server is running on PORT 4003"));
})();