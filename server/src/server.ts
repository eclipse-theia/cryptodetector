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

import * as ls from 'vscode-languageserver';
import { Document } from './document';

/**
 * Create the server connection.
 */
const connection = ls.createConnection(ls.ProposedFeatures.all);

/**
 * The list of documents the server is currently interested in.
 */
const documents = new Map<string, Document>();

/**
 * Handler for the `onInitialize` request of the client.
 * The handler can specify its capabilities (features it supports).
 */
connection.onInitialize((params: ls.InitializeParams) => {
    return {
        capabilities: {
            /**
             * Notify that the extension is interested in supporting `incremental updates` for textual documents.
             */
            textDocumentSync: ls.TextDocumentSyncKind.Incremental,
        }
    };
});

/**
 * Handler for the `onDidOpenTextDocument` notification.
 * The current implementation is responsible to produce initial diagnostics for the given file when opened.
 */
connection.onDidOpenTextDocument((params: ls.DidOpenTextDocumentParams) => {
    connection.console.log(`onDidOpenTextDocument called: ${params.textDocument.uri}`);
    documents.set(params.textDocument.uri,
        new Document(
            params.textDocument.uri,
            params.textDocument.languageId,
            params.textDocument.version,
            params.textDocument.text,
        ));
    const { uri } = params.textDocument;
    const document = documents.get(uri);
    if (document) {
        process.nextTick(() => handleTextDocumentUpdate(uri, document));
    }
});

/**
 * Handler for the `onDidChangeTextDocument` notification.
 * The current implementation is responsible to update diagnostics for the given file when it is updated,
 * including any unsaved changes.
 */
connection.onDidChangeTextDocument((params: ls.DidChangeTextDocumentParams) => {
    connection.console.log(`onDidChangeTextDocument called: ${params.textDocument.uri}`);
    const { uri } = params.textDocument;
    const document = documents.get(uri);
    if (!document) {
        throw new Error(`unknown document: ${uri}`);
    }

    // Apply the changes to the in-memory document and determine the diagnostic markers.
    document.applyChanges(params.contentChanges);
    process.nextTick(() => handleTextDocumentUpdate(uri, document));
});

/**
 * Handler for the `onDidCloseTextDocument` notification.
 * The current implementation is responsible to clear diagnostics for the given file when it is closed.
 * Clearing the diagnostics for closed files is a design choice (similarly to the JS/TS server), while other servers such as Java
 * keep diagnostics for closed documents.
 */
connection.onDidCloseTextDocument((params: ls.DidCloseTextDocumentParams) => {
    connection.console.log(`onDidCloseTextDocument called: ${params.textDocument.uri}`);
    const { uri } = params.textDocument;
    if (!documents.has(uri)) {
        throw new Error(`unknown document: ${uri}`);
    }
    // Perform a cleanup when a file has been closed, removing the diagnostics.
    connection.sendDiagnostics({ uri, diagnostics: [] });
    documents.delete(uri);
});

/**
 * Handle updates to the text document.
 *
 * The `crypto-detector` example includes:
 * - calling the external script or tool.
 * - parsing the output of the external script.
 * - translating the output into `ls.Diagnostic` which is ultimately passed to the client
 *   for end-users to view in their application.
 *
 * `crypto-detector` default implementation: https://github.com/eclipse-theia/cryptodetector/blob/20ef968b995ea2037ea8e080d1cbb6f456e10ff4/server/src/server.ts#L107.
 *
 * @param uri the URI of the given resource.
 * @param document the underlying text document, from which to perform processing.
 */
async function handleTextDocumentUpdate(uri: string, document: ls.TextDocument): Promise<void> { }

// Listen on the connection.
connection.listen();
