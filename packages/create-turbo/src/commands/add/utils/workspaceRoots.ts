import path from "path";
import type { Project } from "@turbo/workspaces";

export function getWorkspaceRoots({
  project,
}: {
  project: Project;
}): Array<string> {
  const allWorkspaces = project.workspaceData.workspaces;
  const allWorkspacePaths = allWorkspaces.map((workspace) =>
    path.relative(project.paths.root, workspace.paths.root)
  );

  // find valid workspace locations
  const workspaceRoots = new Set<string>();
  project.workspaceData.globs.forEach((glob) => {
    if (allWorkspacePaths.includes(glob)) {
      return;
    } else if (glob.startsWith("!")) {
      return;
    } else {
      const globParts = glob.split("/");
      const globRoot = globParts[0];
      workspaceRoots.add(globRoot);
    }
  });

  return Array.from(workspaceRoots);
}
