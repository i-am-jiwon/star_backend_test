
import express from "express";
import cors from "cors";
import memberRouter from "./routes/Member";
import initData from "./initData"; 


const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", memberRouter);

initData().then(() => {
  console.log("Initial data inserted.");
}).catch((error) => {
  console.error("Error inserting initial data:", error);
});

app.listen(8000, () => {
  console.log("====      Auth - Server is On...!!!      ====");
});