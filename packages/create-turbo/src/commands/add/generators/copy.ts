import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import type { GeneratorArguments } from "../types";
import * as prompts from "../prompts";
import { getWorkspaceRoots } from "../utils/workspaceRoots";
import { turboLoader, turboGradient } from "../../../logger";
import { getWorkspaceList } from "../utils/workspaceList";
import { CopyFilterAsync } from "fs-extra";

export async function generate({ name, project }: GeneratorArguments) {
  const workspaceRoots = getWorkspaceRoots({ project });

  const { selectedName } = await prompts.name({ name });
  const { selectedSource } = await prompts.source({
    workspaces: getWorkspaceList({ project }),
    name: selectedName,
  });
  const { selectedLocation } = await prompts.location({
    workspaceRoots: Array.from(workspaceRoots),
    name: selectedName,
  });
  const { projectDependencies: dependencies } = await prompts.dependencies({
    project,
    existing: Object.keys(
      fs.readJsonSync(selectedSource.paths.packageJson).dependencies
    ),
  });

  const filterFunc: CopyFilterAsync = async (src, dest) => {
    if (src.startsWith("node_modules")) {
      return false;
    }
    return true;
  };

  const loader = turboLoader(
    `Creating "${selectedName}" from "${selectedSource.name}"...`
  );
  loader.start();
  await fs.copy(
    selectedSource.paths.root,
    path.join(project.paths.root, selectedLocation, selectedName),
    { filter: filterFunc }
  );
  loader.stop();

  // update package.json with new name
  const packageJsonPath = path.join(
    project.paths.root,
    selectedLocation,
    selectedName,
    "package.json"
  );
  const packageJson = await fs.readJSON(packageJsonPath);
  packageJson.name = selectedName;
  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });

  console.log();
  console.log(
    `${chalk.bold(
      turboGradient(">>> Success!")
    )} Created "${selectedName}" from "${selectedSource.name}" at "${path.join(
      selectedLocation,
      selectedName
    )}"`
  );
}
