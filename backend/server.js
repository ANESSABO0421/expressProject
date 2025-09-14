import express from "express";
import dotenv from "dotenv";
import { Connection } from "./Connection.js";
import router from "./router.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json({limit:"50mb"}));

app.use(cors("*"));
app.use("/uploads", express.static("uploads"));
app.use("/apis", router);

Connection()
  .then(() => {
    app.listen(port, () => {
      console.log(`server created at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
