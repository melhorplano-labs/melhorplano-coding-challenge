import { Request, Response } from "express";
import { getProfiles } from "../services/profileService";

export function allProfiles(req: Request, res: Response) {
  const profiles = getProfiles();
  res.json(profiles);
}
