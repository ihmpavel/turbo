import { Project } from "@turbo/workspaces";
import { getCustomGenerators, runCustomGenerator } from "../utils/plop";
import * as prompts from "../prompts";
import { GeneratorArguments } from "../types";
import { turboGradient } from "../../../logger";
import chalk from "chalk";

export async function generate({ project }: GeneratorArguments) {
  const generators = getCustomGenerators({ project });
  const { selectedGenerator } = await prompts.customGenerators({
    generators,
  });
  await runCustomGenerator({ project, generator: selectedGenerator });
  console.log();
  console.log(chalk.bold(turboGradient(">>> Success!")));
}
