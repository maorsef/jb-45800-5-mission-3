import express from "express";
import cors from "cors";
import router from "./utils/router";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
});

export default app;
