import { Profile } from "../models/profile";

export const allProfilesMock: Profile[] = [
  {
    name: "Família",
    dataCap: 1000,
    speed: 400,
  },
  {
    name: "Streaming 4K",
    dataCap: 200,
    speed: 500,
  },
  {
    name: "Gamer",
    dataCap: 500,
    speed: 800,
  },
  {
    name: "Conversação",
    dataCap: 50,
    speed: 100,
  },
  {
    name: "Cloud Provider",
    dataCap: 2000,
    speed: 2000,
  },
];

export function getProfile(profileName: string): Profile | undefined {
  return allProfilesMock.find((profile) => profile.name == profileName);
}

export function getProfiles(): Profile[] {
  return allProfilesMock;
}
