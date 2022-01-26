import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "../../plugins/fetch-plugin";
import { unpkgPathPlugin } from "../../plugins/unpkg-path-plugin";

let services: esbuild.Service;

const bundler = async (rawCode: string) => {
  if (!services) {
    services = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  try {
    const result = await services.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: { "process.env.NODE_ENV": "'production'", global: "window" },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });

    return { code: result.outputFiles[0].text, err: "" };
  } catch (err: any) {
    //TODO: Potentialy bug
    // if (err instanceof Error) {
    //   return { code: "", err: err.message };
    // }
    return { code: "", err: err.message };
  }
};

export default bundler;
