import { Request, Response } from "express";

export const createRoute = (handler: (req: Request) => Promise<any>) => {
  return async (req: Request, res: Response) => {
    try {
      const result = await handler(req);
      res.json(result);
    } catch (error) {
      // TODO: error handling and logging
      res.status(500).json({ error: { message: "Internal server error" } });
    }
  };
};
