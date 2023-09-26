require("dotenv").config();

const db_url = process.env.DB_URL;

module.exports = {
  db: {
    url: db_url,
  },
  api: {
    port: 3000,
  },
};
