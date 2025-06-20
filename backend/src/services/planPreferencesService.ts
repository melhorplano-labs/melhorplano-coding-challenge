import { PlanPreferences } from "../models/planPreferences";

export const allPreferencesMock: PlanPreferences[] = [];

export const clearAllPreferencesMock = () => {
  allPreferencesMock.splice(0);
};

export async function createOrUpdatePreferences(
  userId: number,
  preferences: Omit<PlanPreferences, "id" | "userId">
) {
  const existingIndex = allPreferencesMock.findIndex(
    (preference) => preference.userId === userId
  );

  if (existingIndex !== -1) {
    Object.assign(allPreferencesMock[existingIndex], preferences);
    return allPreferencesMock[existingIndex];
  }

  const lastId = !allPreferencesMock.length
    ? 0
    : Math.max(...allPreferencesMock.map(({ id }) => id));

  const created = { id: lastId + 1, userId, ...preferences };
  allPreferencesMock.push(created);
  return created;
}

export async function findPreferences(userId: number) {
  const preferences = allPreferencesMock.find(
    (preferences) => preferences.userId === userId
  );
  return preferences ?? null;
}
