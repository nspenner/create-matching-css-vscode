import * as vscode from "vscode";
const fs = require("fs");
const path = require("path");

export function activate(context: vscode.ExtensionContext) {
  let createCssNotification = vscode.commands.registerCommand(
    "extension.createCSS",
    () => {
      if (vscode.window.activeTextEditor) {
        const folderPath = path.dirname(
          vscode.window.activeTextEditor?.document.fileName
        );

        const openedFileName = path.parse(
          vscode.window.activeTextEditor?.document.fileName
        ).name;

        fs.writeFile(
          path.join(folderPath, `${openedFileName}.css`),
          "",
          (err: any) => {
            if (err) {
              console.log(err);
              return vscode.window.showErrorMessage(
                "Failed to create css file!"
              );
            }
          }
        );
        vscode.window.showInformationMessage(`${openedFileName}.css created!`);
      } else {
        vscode.window.showInformationMessage(
          "No open editor detected to match filename!"
        );
      }
    }
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
