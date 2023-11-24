import "tsconfig-paths/register";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import router from "./routers";
import { DATABASE_URL, DOMAIN, PORT } from "./env";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cors());

async function main() {
  try {
    await mongoose.connect(DATABASE_URL);
    app.use(router);
    app.listen(PORT, () => console.log(`Server running on ${DOMAIN}`));
    console.log("Server starting...");
  } catch (err) {
    console.error("Server stopping...", err);
  }
}

main();
