/* tslint:disable:quotemark */
"use strict";

import * as vscode from "vscode";
import * as path from "path";

export class ParquetDocumentContentProvider implements vscode.TextDocumentContentProvider {
    private _context;
    constructor(_context) {
        this._context = _context;
    }
    getPath(p) {
        return path.join(this._context.extensionPath, p);
    }
    provideTextDocumentContent(uri) {
        const docUri = encodeURIComponent(uri.query);
        const head = [
            '<!DOCTYPE html>',
            '<html>',
            '<head>',
            '<meta http-equiv="Content-type" content="text/html;charset=UTF-8">',
            `<link rel="stylesheet" type="text/css" href="${this.getPath("lib/pdf.css")}">`,
            '</head>'
        ].join("\n");
        const body = [
            '<body><h1>HELLO IVAN?</h1>',
            '</body>'
        ].join("\n");
        const tail = [
            '</html>'
        ].join("\n");
        return head + body + tail;
    }
}