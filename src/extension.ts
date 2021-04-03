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

        createFile(folderPath, openedFileName);

        vscode.window.showInformationMessage(`${openedFileName}.css created!`);
      } else {
        vscode.window.showInformationMessage(
          "No open editor detected to match filename!"
        );
      }
    }
  );
  let createCssNotificationExplorer = vscode.commands.registerCommand(
    "extension.createCSSContextMenu",
    (uri: vscode.Uri) => {
      const parseResult = path.parse(uri.fsPath);
      const fileName = parseResult.name;
      let folderPath = path.dirname(uri.fsPath);
      if (parseResult.ext === "") {
        // We're in a folder
        folderPath = uri.fsPath;
      }
      createFile(folderPath, fileName);
    }
  );
}

function createFile(directory: string, fileName: string) {
  const filePath = path.join(directory, `${fileName}.css`);
  // Check for existing css file first
  if (fs.existsSync(filePath)) {
    console.log("css file already exists – run anyway?");
    vscode.window.showErrorMessage(
      `${fileName}.css already exists in this directory.`
    );
    return;
  }

  fs.writeFile(path.join(directory, `${fileName}.css`), "", (err: any) => {
    if (err) {
      console.log(err);
      return vscode.window.showErrorMessage("Failed to create css file!");
    }
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
