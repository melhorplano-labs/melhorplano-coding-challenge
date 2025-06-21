import { createApp } from "./app";
import { createPlanController } from "./controllers/planController";
import { createInMemoryPlanService } from "./services/inMemoryPlanService";

const PORT = process.env.PORT || 3001;

const planService = createInMemoryPlanService();
const planController = createPlanController(planService);
const app = createApp(planController);

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
