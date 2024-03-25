require("dotenv").config();

const config = {
  db: {
    name: process.env.DATABASE_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  email: {
    username: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
  },
  server: {
    port: process.env.SERVER_PORT,
    tmpDir: process.env.TEMP_DIR || "/tmp",
    basePath: process.env.BASE_PATH || __dirname,
  },
  frontend: {
    host: process.env.FRONTEND_HOST,
  },
}; 

exports.config = config;
