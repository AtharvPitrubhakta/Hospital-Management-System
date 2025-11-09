require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: parseInt(process.env.DB_PORT, 10),
    logging: false,
  }
);

const connectPostgreSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully!");

    await sequelize.sync();
  } catch (err) {
    console.error("PostgreSQL connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectPostgreSQL,
};
