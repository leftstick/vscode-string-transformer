import * as vscode from 'vscode';
import { toTemplateLiteral } from 'string-transformer';

export function transform5to6(diagnosticCollection: vscode.DiagnosticCollection) {

    return vscode.commands.registerCommand('stringtransformer.transform5to6', () => {

        diagnosticCollection.clear();

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('You can only use extension within a document');
            return;
        }
        const selection = editor.selection;

        const selectedRange = new vscode.Range(selection.start, selection.end);

        const str = editor.document.getText(selectedRange);

        try {
            const result = toTemplateLiteral(str);
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
