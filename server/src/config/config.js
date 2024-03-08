const fs = require('fs');

console.log(process.env.DB_PASSWORD);

module.exports = {
  development: {
    username: "root",
    password: "123456",
    database: "todo",
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
};