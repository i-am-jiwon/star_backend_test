
import express from "express";
import cors from "cors";
import memberRouter from "./routes/Member";
import initData from "./initData";
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';


const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load and parse Swagger YAML file
const swaggerPath = path.join(__dirname, '../src/swagger/Swagger.yaml'); 
const swaggerDocument = fs.readFileSync(swaggerPath, 'utf8');
const swaggerJson = parse(swaggerDocument); // Convert YAML to JSON

// Setup Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use("/api/auth", memberRouter);

app.listen(8000, () => {
  console.log("====      Auth - Server is On...!!!      ====");

  setTimeout(() => {
    initData().then(() => {
      console.log("Initial data inserted.");
    }).catch((error) => {
      console.error("Error inserting initial data:", error);
    });
  }, 35000); // 35초 대기
});