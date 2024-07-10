const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();

const ap = require("./routes/userRoutes.js");
const port = process.env.PORT || 5001;
connectDB();
app.use(express.json());
app.use(cors());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Customer Support Ticket System API",
      version: "1.0.0",
      description: "API documentation for managing customer support tickets",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/user/", require("./routes/userRoutes"));
app.use("/api/user/", require("./routes/ticketsRoutes"));

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
