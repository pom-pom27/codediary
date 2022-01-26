import * as esbuild from "esbuild-wasm";

import localforage from "localforage";
import axios from "axios";

const fileCache = localforage.createInstance({ name: "filecache" });

export const fetchPlugin = (input: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: input,
        };
      });
      build.onLoad({ filter: /.*/ }, async (args) => {
        const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cacheResult) {
          return cacheResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args) => {
        const { data, request } = await axios.get(args.path);

        const escapedData = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = ` 
          const style = document.createElement('style');
          style.innerText = '${escapedData}';
          document.head.appendChild(style);
          `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
