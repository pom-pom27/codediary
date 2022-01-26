import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      //Handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      //Handle relative paths in a modules
      build.onResolve({ filter: /^\.+\// }, (args: esbuild.OnResolveArgs) => {
        const url = new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
          .href;
        return { path: url, namespace: "a" };
      });

      //Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });
    },
  };
};
