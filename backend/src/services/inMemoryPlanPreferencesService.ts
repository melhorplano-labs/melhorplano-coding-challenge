import { PlanPreferencesService } from "../contracts/services/planPreferencesService";
import { PlanPreferences } from "../models/planPreferences";

export function createInMemoryPlanPreferencesService(): PlanPreferencesService & {
  preferences: PlanPreferences[];
} {
  const PREFERENCES: PlanPreferences[] = [];

  return {
    preferences: PREFERENCES,

    async createOrUpdatePreferences(userId, preferences) {
      const existingIndex = this.preferences.findIndex(
        (preference) => preference.userId === userId
      );

      if (existingIndex !== -1) {
        Object.assign(this.preferences[existingIndex], preferences);
        return this.preferences[existingIndex];
      }

      const lastId = !this.preferences.length
        ? 0
        : Math.max(...this.preferences.map(({ id }) => id));

      const created = { id: lastId + 1, userId, ...preferences };
      this.preferences.push(created);
      return created;
    },

    async findPreferences(userId) {
      const preferences = this.preferences.find(
        (preferences) => preferences.userId === userId
      );
      return preferences ?? null;
    },
  };
}
