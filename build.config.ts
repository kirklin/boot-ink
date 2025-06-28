import type { ChildProcess } from "node:child_process";
import { spawn } from "node:child_process";
import { defineBuildConfig } from "unbuild";

let appProcess: ChildProcess | null = null;

function startApp() {
  appProcess = spawn("node", ["dist/app.mjs"], {
    stdio: "inherit",
  });
}

export default defineBuildConfig({
  entries: ["src/app"],
  declaration: true,
  clean: true,
  hooks: {
    "build:done": () => {
      if (appProcess && !appProcess.killed) {
        appProcess.once("exit", () => {
          startApp();
        });
        appProcess.kill("SIGKILL");
      } else {
        startApp();
      }
    },
  },
});
