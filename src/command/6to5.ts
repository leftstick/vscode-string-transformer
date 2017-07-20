import * as vscode from 'vscode';
import { toConcatenatedStrings } from 'string-transformer';

export function transform6to5(diagnosticCollection: vscode.DiagnosticCollection) {

    return vscode.commands.registerCommand('stringtransformer.transform6to5', () => {

        diagnosticCollection.clear();

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('You can only use extension within a document');
            return;
        }
        const selection = editor.selection;

        const config = vscode.workspace.getConfiguration('stringtransformer');

        const quotaStyle: string = <string>config.get('quotationStyle');
        const QUOTA = quotaStyle === 'SINGLE' ? '\'' : '"';

        const selectedRange = new vscode.Range(selection.start, selection.end);

        const str = editor.document.getText(selectedRange);

        try {
            const result = toConcatenatedStrings(str, QUOTA);
            editor.edit((editBuilder: vscode.TextEditorEdit) => {
                editBuilder
                    .replace(selection, result);
            })
                .then(result => editor.document.save());
        } catch (error) {
            const diagnostic = new vscode.Diagnostic(selectedRange, `[string-transformer]: ${error.message}`, vscode.DiagnosticSeverity.Error);
            diagnosticCollection.set(editor.document.uri, [diagnostic]);
        }

    });
}
