require("dotenv").load();

module.exports = {
  database: process.env.DATABASE,
  secret: process.env.SECRET
}