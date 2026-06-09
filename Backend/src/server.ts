import dotenv from "dotenv";
import app from "./app";
import { testConnection } from "./config/database";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

async function startServer() {
    try {
        await testConnection();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error(err);
    }
}

startServer();