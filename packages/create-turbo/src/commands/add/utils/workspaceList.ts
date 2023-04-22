import path from "path";
import type { Project, Workspace } from "@turbo/workspaces";
import inquirer from "inquirer";

export function getWorkspaceList({
  project,
}: {
  project: Project;
}): Array<Workspace | inquirer.Separator> {
  const workspaceChoices: Array<Workspace | inquirer.Separator> = [];
  if (project.workspaceData.workspaces.length > 0) {
    const workspacesForDisplay = project.workspaceData.workspaces
      .map((w) => ({
        group:
          path
            .relative(project.paths.root, w.paths.root)
            .split(path.sep)?.[0] || "",
        workspace: w,
      }))
      .sort((a, b) => a.group.localeCompare(b.group));

    let lastGroup: string | undefined;
    workspacesForDisplay.forEach(({ group, workspace }) => {
      if (group !== lastGroup) {
        workspaceChoices.push(new inquirer.Separator(group));
      }
      lastGroup = group;
      workspaceChoices.push(workspace);
    });
  }
  return workspaceChoices;
}
