import app from "./app";
require('dotenv').config()

const APP_PORT = process.env.APP_PORT || 3070;

app.listen(APP_PORT, () => {
  console.log(`Server is running at ${APP_PORT}`);
})