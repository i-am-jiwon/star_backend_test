
import express from "express";
import cors from "cors";
import adminRouter from "./routes/Member";


const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", adminRouter);

app.listen(8000, () => {
  console.log("====      Server is On...!!!      ====");
});