import express from "express";
import cors from "cors";
import planRoutes from "./routes/planRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/plans", planRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
