import { Project } from "@turbo/workspaces";
import nodePlop, { NodePlopAPI, PlopGenerator } from "node-plop";
import path from "path";
import { info, error, item } from "../../../logger";

export function getCustomGenerators({
  project,
}: {
  project: Project;
}): ReturnType<NodePlopAPI["getGeneratorList"]> {
  const plop = getPlop({ project });
  const gens = plop.getGeneratorList();
  if (!gens.length) {
    throw new Error("No generators found");
  }

  return gens;
}

export function getPlop({ project }: { project: Project }): NodePlopAPI {
  const plopFile = path.join(project.paths.root, "generators", "config.js");
  return nodePlop(plopFile, { destBasePath: project.paths.root, force: false });
}

export async function runCustomGenerator({
  project,
  generator,
}: {
  project: Project;
  generator: string;
}): Promise<void> {
  const plop = getPlop({ project });
  const gen = plop.getGenerator(generator);
  if (!gen) {
    throw new Error(`Generator ${generator} not found`);
  }
  const answers = await gen.runPrompts([]);
  let results: Awaited<ReturnType<PlopGenerator["runActions"]>> = {
    changes: [],
    failures: [],
  };
  try {
    results = await gen.runActions(answers, {
      onComment: (comment: string) => {
        console.info(comment);
      },
    });
  } catch (e) {
    // skip
  }

  if (results.failures && results.failures.length > 0) {
    // log all errors:
    results.failures.forEach((f) => {
      error(f.error);
    });
    throw new Error(`Failed to run "${generator}" generator`);
  }

  // do something after the actions have run
  if (results.changes && results.changes.length > 0) {
    info("Changes made:");
    results.changes.forEach((c) => {
      if (c.path) {
        item(`${c.path} (${c.type})`);
      }
    });
  }
}
