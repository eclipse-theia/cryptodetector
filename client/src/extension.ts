/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import * as path from 'path';
import * as vscode from 'vscode';

import * as ls from 'vscode-languageclient';

let client: ls.LanguageClient;

export function activate(context: vscode.ExtensionContext): void {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(
        path.join('server', 'out', 'server.js')
    );
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ls.ServerOptions = {
        run: { module: serverModule, transport: ls.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: ls.TransportKind.ipc,
            options: debugOptions
        }
    };

    // Options to control the language client
    const clientOptions: ls.LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: [
            { scheme: 'file', language: 'javascript' },
            { scheme: 'file', language: 'typescript' },
            { scheme: 'file', language: 'c' },
            { scheme: 'file', language: 'cpp' },
        ],
        diagnosticCollectionName: 'crypto-detector',
        outputChannelName: 'crypto-detector'
    };

    // Create the language client and start the client.
    client = new ls.LanguageClient(
        'crypto-detector',
        'crypto-detector',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    return !!client ? client.stop() : undefined;
}
