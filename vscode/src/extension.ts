'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log("Apache Parquet Viewer activated");

    function openParquet(filePath: string) {

        console.log(`opening '${filePath}'...`)

        vscode.window.showInformationMessage("opening " + filePath);
    }

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.preview', (fileUri) => {
        
        if (!fileUri)
        {
            return vscode.window.showInformationMessage('Use the context menu over the *.parquet file or the editor button to obtain the preview.');
        }

        openParquet(fileUri.fsPath);

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}