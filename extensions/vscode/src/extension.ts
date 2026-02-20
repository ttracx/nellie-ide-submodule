/**
 * This is the entry point for the extension.
 *
 * Note: This file has been significantly modified from its original contents. nellie-submodule is a fork of Continue (https://github.com/continuedev/continue).
 */

import { setupCa } from "core/util/ca";
import { Telemetry } from "core/util/posthog";
import * as vscode from "vscode";
import { getExtensionVersion } from "./util/util";
import { NellieApi } from "./NellieApi";
import { NellieExtensionExports } from "core";

let pearAPI: NellieApi | undefined;

async function dynamicImportAndActivate(context: vscode.ExtensionContext) {
  const { activateExtension } = await import("./activation/activate");
  try {
    return activateExtension(context);
  } catch (e) {
    console.log("Error activating extension: ", e);
    vscode.window
      .showInformationMessage(
        "Error activating the Nellie IDE extension.",
        "View Logs",
        "Retry",
      )
      .then((selection) => {
        if (selection === "View Logs") {
          vscode.commands.executeCommand("nellie.viewLogs");
        } else if (selection === "Retry") {
          // Reload VS Code window
          vscode.commands.executeCommand("workbench.action.reloadWindow");
        }
      });
  }
}

export async function activate(context: vscode.ExtensionContext) {
  setupCa();
  const extension = await dynamicImportAndActivate(context);
  if (!extension) {
    throw new Error("dynamicImportAndActivate returned undefined :(");
  }

  if (!pearAPI) {
    pearAPI = new NellieApi(extension.extension.core, context);
  }

  return {
    pearAPI,
    extension: context.extension,
  } satisfies NellieExtensionExports;
}

export function deactivate() {
  Telemetry.capture(
    "deactivate",
    {
      extensionVersion: getExtensionVersion(),
    },
    true,
  );

  Telemetry.shutdownPosthogClient();
}

export const getApi = () => {
  return pearAPI;
};
