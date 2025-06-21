import { createApp } from "../../app";
import { createPlanController } from "../../controllers/planController";
import { createInMemoryPlanService } from "../../services/inMemoryPlanService";

export type App = ReturnType<typeof mockApp>;

export const mockApp = () => {
  const planService = createInMemoryPlanService();

  const planController = createPlanController(planService);

  return {
    app: createApp(planController),

    planService,

    planController,
  };
};
