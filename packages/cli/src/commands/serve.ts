import { Command } from "commander";
import { serve } from "@codediary/local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file to edit")
  .option("-p, --port  <number> ", "port to run server on", "4005")
  .action(async (filename = "codenote1.js", option: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));

      const file = path.basename(filename);
      await serve(file, parseInt(option.port), dir, isProduction);

      console.log(
        `Opened ${filename}. Navigate to http://localhost:${option.port}`
      );
    } catch (error: any) {
      if (error.code == "EADDRINUSE") {
        console.error("Port is in use. Try running on a different port.");
      } else {
        console.error("Here the problem ", error.message);
      }
      process.exit(1);
    }
  });
