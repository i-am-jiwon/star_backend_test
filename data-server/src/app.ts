import express from 'express';
import cors from "cors";
import supplyRoutes from './routes/Data';
import budgetRoutes from './routes/Data';

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// 비품 및 예산 라우트 설정
app.use('/api/data', supplyRoutes);
app.use('/api/data', budgetRoutes);


app.listen(8001, () => {
    console.log("====      Data - Server is On...!!!      ====");
});