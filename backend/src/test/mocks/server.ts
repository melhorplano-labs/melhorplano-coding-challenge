import { Server } from "node:http";
import { makeApp } from "../../app";

export type ServerMock = {
  server: Server;
  url: string;
  close: () => Promise<void>;
};

export const mockServer = (port = 3001): ServerMock => {
  const server = makeApp().listen(port);

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
