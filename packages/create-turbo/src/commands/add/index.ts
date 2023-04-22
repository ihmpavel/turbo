import path from "path";
import type { AddCommandArgument, AddCommandOptions } from "./types";
import { getWorkspaceDetails } from "@turbo/workspaces";
import * as generators from "./generators";
import { dimmed, info } from "../../logger";

export async function add(
  directory: AddCommandArgument,
  name: AddCommandArgument,
  opts: AddCommandOptions
) {
  if (!directory) {
    console.log("invalid directory");
    return;
  }

  const project = await getWorkspaceDetails({
    root: path.resolve(directory),
  });

  console.log();
  info(`Generators for ${project.name}`);
  console.log();

  if (opts.type === "custom") {
    dimmed(`Modify ${project.name} using custom generators`);
    console.log();
    await generators.custom({ name, directory, opts, project });
  } else if (opts.type === "blank") {
    dimmed(`Add an empty workspace to ${project.name}`);
    console.log();
    await generators.empty({ name, directory, opts, project });
  } else if (opts.type === "copy") {
    dimmed(`Copy an existing workspace from ${project.name}`);
    console.log();
    await generators.copy({ name, directory, opts, project });
  }
}
