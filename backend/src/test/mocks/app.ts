import { createApp } from "../../app";
import { createPlanController } from "../../controllers/planController";
import { createPlanPreferencesController } from "../../controllers/planPreferencesController";
import { createInMemoryPlanPreferencesService } from "../../services/inMemoryPlanPreferencesService";
import { createInMemoryPlanService } from "../../services/inMemoryPlanService";

export type App = ReturnType<typeof mockApp>;

export const mockApp = () => {
  const planService = createInMemoryPlanService();
  const planPreferencesService = createInMemoryPlanPreferencesService();

  const planController = createPlanController(
    planService,
    planPreferencesService
  );
  const planPreferencesController = createPlanPreferencesController(
    planPreferencesService
  );

  return {
    app: createApp(planController, planPreferencesController),

    planService,
    planPreferencesService,

    planController,
    planPreferencesController,
  };
};
