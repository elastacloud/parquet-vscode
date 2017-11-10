'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as elastacloud from './provider/ParquetDocumentContentProvider';
const path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log("Apache Parquet Viewer activated");
    const provider = new elastacloud.ParquetDocumentContentProvider(context);
    const registerProvider = vscode.workspace.registerTextDocumentContentProvider("parquet-preview", provider);
    const openedEvent = vscode.workspace.onDidOpenTextDocument((document) => {
        vscode.window.showInformationMessage("opening parquet");
        showDocumentPreview(document);
    });
    const previewCmd = vscode.commands.registerCommand("extension.parquet-preview", (uri) => {
        showPreview(uri);
    });
    // for pdf file already opend.
    if (vscode.window.activeTextEditor) {
        showDocumentPreview(vscode.window.activeTextEditor.document);
    }
    context.subscriptions.push(registerProvider, openedEvent, previewCmd);

    function openParquet(filePath: string) {

        showPreview(filePath);

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

export function showDocumentPreview(document) {
    if (document.languageId === "parquet" && document.uri.scheme !== "parquet-preview") {
        vscode.commands.executeCommand("workbench.action.closeActiveEditor").then(() => {
            showPreview(document.uri);
        });
    }
}
export function showPreview(uri) {
    if (uri.scheme === "parquet-preview")
        return;
    let basename = path.basename(uri.fsPath);
    let columns = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : 1;
    vscode.commands.executeCommand("vscode.previewHtml", buildPreviewUri(uri), columns, basename)
        .then(null, vscode.window.showErrorMessage);
}
export function buildPreviewUri(uri) {
    return uri.with({
        scheme: "parquet-preview",
        path: uri.path + ".rendered.parquet",
        query: uri.toString(),
    });
}