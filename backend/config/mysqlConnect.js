const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hospital_db", "root", "Root@2248", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully!");

    await sequelize.sync();
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectMySQL,
};
