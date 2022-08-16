import { app } from "@frameworks/webserver/app";

const port = process.env.PORT || 4003;

app.listen(port, () => console.log(`Server is running on PORT ${port}`));