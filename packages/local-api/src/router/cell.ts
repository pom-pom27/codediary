import express from "express";
import path from "path";

import fs from "fs/promises";
interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}
export const createCellRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    try {
      //Read the file
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });

      res.send(JSON.parse(result));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        console.log("wawo");

        throw error;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    //Take the list of cells from the req obj

    //Serialize them
    const { cells }: { cells: Cell[] } = req.body;

    //Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    //add response success
    res.send({ status: "ok" });

    //add failed response
  });

  return router;
};
