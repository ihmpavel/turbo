import type { Project } from "@turbo/workspaces";

export type AddCommandArgument = "string" | undefined;

type GeneratorType = "blank" | "copy" | "external" | "custom";

export interface AddCommandOptions {
  type: GeneratorType;
}

export interface GeneratorArguments {
  directory: AddCommandArgument;
  name: AddCommandArgument;
  opts: AddCommandOptions;
  project: Project;
}
