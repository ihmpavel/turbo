import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import type { PackageManager, Project, Workspace } from "@turbo/workspaces";
import type { AddCommandArgument } from "./types";
import { getAvailablePackageManagers } from "@turbo/utils";
import { isFolderEmpty } from "../../utils/isFolderEmpty";
import inquirer from "inquirer";

export async function name({ name }: { name: AddCommandArgument }) {
  return inquirer.prompt<{
    selectedName: string;
  }>({
    type: "input",
    name: "selectedName",
    when: !name,
    default: name,
    message: "What is the name of the workspace?",
  });
}

export async function location({
  workspaceRoots,
  name,
}: {
  workspaceRoots: Array<string>;
  name: string;
}) {
  const locationAnswer = await inquirer.prompt<{
    selectedLocation: string;
  }>({
    type: "list",
    name: "selectedLocation",
    message: `Where should "${name}" be added?`,
    choices: workspaceRoots.map((workspaceRoot) => ({
      name: workspaceRoot,
      value: workspaceRoot,
    })),
  });

  return locationAnswer;
}

export async function source({
  workspaces,
  name,
}: {
  workspaces: Array<Workspace | inquirer.Separator>;
  name: string;
}) {
  const sourceAnswer = await inquirer.prompt<{
    selectedSource: Workspace;
  }>({
    type: "list",
    name: "selectedSource",
    loop: false,
    pageSize: 15,
    message: `Which workspace should "${name}" start from?`,
    choices: workspaces.map((workspace) => {
      if (workspace instanceof inquirer.Separator) {
        return workspace;
      }
      return {
        name: workspace.name,
        value: workspace,
        selected: true,
      };
    }),
  });

  return sourceAnswer;
}

export async function dependencies({
  project,
  type,
  existing,
}: {
  project: Project;
  type?: "dev";
  existing?: Array<string>;
}) {
  return await inquirer.prompt<{
    projectDependencies: Array<string>;
  }>({
    type: "checkbox",
    name: "projectDependencies",
    default: existing,
    pageSize: 15,
    message: `Which workspaces should be added as ${
      type ? `${type}Dependencies` : "dependencies"
    }?`,
    loop: false,
    choices: project.workspaceData.workspaces.map((workspace) => ({
      name: workspace.name,
      value: workspace.name,
    })),
  });
}

export async function customGenerators({
  generators,
}: {
  generators: Array<{ name: string; description: string }>;
}) {
  const generatorAnswer = await inquirer.prompt<{
    selectedGenerator: string;
  }>({
    type: "list",
    name: "selectedGenerator",
    message: `Which generator would you like to run?`,
    choices: generators.map((gen) => ({
      name: `${gen.name}: ${gen.description}`,
      value: gen.name,
    })),
  });

  return generatorAnswer;
}
