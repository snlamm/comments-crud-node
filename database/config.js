
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "first_db",
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
}
