import app from "./app";

const APP_PORT = process.env.APP_PORT || 3070;

app.listen(APP_PORT, () => {
  console.log(`Server is runnint at ${APP_PORT}`);
})