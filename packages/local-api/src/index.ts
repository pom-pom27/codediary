import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellRouter } from "./router/cell";

export const serve = (
  filename: string,
  port: number,
  dir: string,
  isProduction: boolean
) => {
  const app = express();

  app.use(createCellRouter(filename, dir));

  if (isProduction) {
    const packagePath = require.resolve("local-client/build/index.html");

    app.use(express.static(path.dirname(packagePath)));
  } else {
    app.use(
      createProxyMiddleware({
        target: "http://localhost:3000",
        ws: true,
        logLevel: "silent",
      })
    );
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
