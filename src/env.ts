import dotenv from "dotenv";
dotenv.config();
const env = process.env;

const PORT = Number(env.PORT);
const DATABASE_URL = env.DATABASE_URL as string;
const DOMAIN = env.DOMAIN as string;

export { PORT, DATABASE_URL, DOMAIN };
