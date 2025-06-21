import { createApp } from "./app";
import { createPlanController } from "./controllers/planController";
import { createPlanPreferencesController } from "./controllers/planPreferencesController";
import { createInMemoryPlanPreferencesService } from "./services/inMemoryPlanPreferencesService";
import { createInMemoryPlanService } from "./services/inMemoryPlanService";

const PORT = process.env.PORT || 3001;

const planService = createInMemoryPlanService();
const planPreferencesService = createInMemoryPlanPreferencesService();

const planController = createPlanController(
  planService,
  planPreferencesService
);
const planPreferencesController = createPlanPreferencesController(
  planPreferencesService
);

const app = createApp(planController, planPreferencesController);

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
