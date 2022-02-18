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
        await fs.writeFile(
          fullPath,
          `[
  {
    "content": "**CodeDiary**\n----------\nThis is an interactive coding environment. You can write javascript, see it excecuted and write comprehensive documention using markdown.\n\n- Add then click any text cell (including this one) to edit it.\n- The code in each code editor is joined together into one file. if you define a variable in cel #1, you can refer to it in any following cell.\n- You can show any react component, string, number or anything else by calling \`render\` function. This is a function built into this enviroment. Call render multiple time to show multiple values.\n- Re-order or delete cells using the button on the top right.\n- Add new cell by hovering on the divider between each cell.\n\nAll of your changes get saved to the file you named with or the default codenote1.js. You can change the file name by \`run npx codediary serve name-file.js\`. ",
    "type": "text",
    "id": "8m6"
  },
  {
    "content": "import { useState } from 'react';\n\nconst Increment = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n      <h3>Count: {count}</h3>\n    </div>\n  );\n};\n\n//display any variable or react component\nrender(<Increment/>);\n\n\n\nconst Decrement = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <button onClick={() => setCount(count - 1)}>Decrement</button>\n      <h3>Count: {count}</h3>\n    </div>\n  );\n};\n\n\n\n\n",
    "type": "code",
    "id": "vdf"
  },
  {
    "content": "//The code in each code editor is joined together into one file. \r\n//if you define a variable in cel #1, you can refer to it in any following cell.\r\n\r\nrender(<Decrement/>);",
    "type": "code",
    "id": "8za"
  }
]`,
          "utf-8"
        );
        res.send([]);
      } else {
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
