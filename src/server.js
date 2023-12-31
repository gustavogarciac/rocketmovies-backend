require("express-async-errors");
require("dotenv").config();

const express = require("express");
const server = express();

const AppError = require("./utils/AppError");
const routes = require("./routes");
const uploadsConfig = require("./configs/upload");
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use("/files", express.static(uploadsConfig.UPLOADS_FOLDER));
server.use(routes);

server.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

const port = process.env.PORT;
server.listen(port, () =>
  console.log(`🚀 Servidor inicializado em http://localhost:${port}`)
);
