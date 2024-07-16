import { db } from "./config/database";
import crypto from "crypto";

const initData = async () => {
    const users = [
        {
            id: "starlawfirm",
            password: "star240711",
            name: "김스타",
            role: 5.0
        },
        {
            id: "accept guest",
            password: "guest240711",
            name: "게스트",
            role: 1.0
        }
    ];

    for (const user of users) {
        const salt = crypto.randomBytes(16).toString("hex");
        const hashedPassword = crypto
            .createHash("sha256")
            .update(salt + user.password)
            .digest("hex");

        const query = "INSERT INTO users (id, password, salt, name, role) VALUES (?, ?, ?, ?, ?)";
        const values = [user.id, hashedPassword, salt, user.name, user.role];

        try {
            await db.execute(query, values);
            console.log(`User ${user.id} inserted successfully.`);
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                console.log(`User ${user.id} already exists.`);
            } else {
                console.error(`Error inserting user ${user.id}:`, error);
            }
        }
    }
};

export default initData;
