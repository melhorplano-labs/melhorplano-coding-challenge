import type { Express } from "express";
import { Server } from "node:http";

export type ServerMock = {
  server: Server;
  url: string;
  close: () => Promise<void>;
};

export const mockServer = (app: Express, port = 3001): ServerMock => {
  const server = app.listen(port);

  return {
    server,
    url: `http://localhost:${port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.closeAllConnections();
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      }),
  };
};
