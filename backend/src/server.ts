// (async () => {
//   const app = (await import("@frameworks/webserver/app")).default;
//   app.listen(4003, () => console.log("Server is running on PORT 4003"));
// })();

import { app } from "@frameworks/webserver/app";

app.listen(4003, () => console.log("Server is running on PORT 4003"));