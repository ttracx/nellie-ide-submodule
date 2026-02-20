import { workspace } from "vscode";

export const CONTINUE_WORKSPACE_KEY = "nellie";

export function getContinueWorkspaceConfig() {
  return workspace.getConfiguration(CONTINUE_WORKSPACE_KEY);
}
