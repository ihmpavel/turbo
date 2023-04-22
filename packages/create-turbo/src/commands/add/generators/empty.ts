import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import type { GeneratorArguments } from "../types";
import * as prompts from "../prompts";
import { getWorkspaceRoots } from "../utils/workspaceRoots";
import { turboGradient } from "../../../logger";

export async function generate({ name, project }: GeneratorArguments) {
  const workspaceRoots = getWorkspaceRoots({ project });
  const { selectedName } = await prompts.name({ name });
  const { selectedLocation } = await prompts.location({
    workspaceRoots: Array.from(workspaceRoots),
    name: selectedName,
  });
  const { projectDependencies: dependencies } = await prompts.dependencies({
    project,
  });
  const { projectDependencies: devDependencies } = await prompts.dependencies({
    project,
    type: "dev",
  });

  const packageJson = {
    name: selectedName,
    version: "0.0.0",
    private: true,
    scripts: {
      build: "turbo build",
    },
    dependencies: dependencies.reduce((acc, dependency) => {
      acc[dependency] = "workspace:*";
      return acc;
    }, {} as Record<string, string>),
    devDependencies: devDependencies.reduce((acc, dependency) => {
      acc[dependency] = "workspace:*";
      return acc;
    }, {} as Record<string, string>),
  };

  // location
  const newWorkspace = path.join(
    project.paths.root,
    selectedLocation,
    selectedName
  );
  fs.mkdirSync(newWorkspace, { recursive: true });

  // create package.json
  fs.writeFileSync(
    path.join(newWorkspace, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );

  // create README
  fs.writeFileSync(
    path.join(newWorkspace, "README.md"),
    `# \`${selectedName}\``
  );

  console.log();
  console.log(
    `${chalk.bold(
      turboGradient(">>> Success!")
    )} Created ${selectedName} at "${path.join(
      selectedLocation,
      selectedName
    )}".`
  );
}
