import { Sequelize } from "sequelize";
import "dotenv/config";

const DATABASE: string = process.env.DB_NAME ?? "";
const USERNAME: string = process.env.DB_USERNAME ?? "";
const PASSWORD: string = process.env.DB_PASSWORD ?? "";
const HOST: string = process.env.DB_HOST ?? "";

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: "mysql",
});

export default sequelize;
