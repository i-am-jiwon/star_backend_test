
import express from "express";
import cors from "cors";
import memberRouter from "./routes/Member";


const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", memberRouter);

app.listen(8000, () => {
  console.log("====      Auth - Server is On...!!!      ====");
});