import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/app",
  ],
  declaration: true,
  clean: true,
});
