import { db } from "./config/database";

const initData = async () => {
    // 비품 데이터
    const supplies = [
        { name: "과자", price: 1000 },
        { name: "문구", price: 2000 }
    ];

    // 예산 데이터
    const budgets = [
        { name: "기획", amount: 1000000 },
        { name: "인사", amount: 2000000 }
    ];

    // 비품 삽입
    for (const supply of supplies) {
        const query = "INSERT INTO supplies (name, price) VALUES (?, ?)";
        const values = [supply.name, supply.price];

        try {
            await db.execute(query, values);
            console.log(`Supply ${supply.name} inserted successfully.`);
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                console.log(`Supply ${supply.name} already exists.`);
            } else {
                console.error(`Error inserting supply ${supply.name}:`, error);
            }
        }
    }

    // 예산 삽입
    for (const budget of budgets) {
        const query = "INSERT INTO budgets (name, amount) VALUES (?, ?)";
        const values = [budget.name, budget.amount];

        try {
            await db.execute(query, values);
            console.log(`Budget ${budget.name} inserted successfully.`);
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                console.log(`Budget ${budget.name} already exists.`);
            } else {
                console.error(`Error inserting budget ${budget.name}:`, error);
            }
        }
    }
};

export default initData;
