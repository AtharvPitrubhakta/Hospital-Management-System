const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysqlConnect");

const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM("admin", "doctor", "receptionist"),
    allowNull: false,
  },
});

module.exports = User;
