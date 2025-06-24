import express from "express";
import cors from "cors";
import planRoutes from "./routes/planRoutes";
import profileRoutes from "./routes/profileRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/plans", planRoutes);
app.use("/profiles", profileRoutes);

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
