import * as vscode from 'vscode';

export function transform() {
    const { rootPath } = vscode.workspace;

    return vscode.commands.registerCommand('es6literals.transform', () => {

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('You can only use extension within a document');
            return;
        }
        const selection = editor.selection;

        const config = vscode.workspace.getConfiguration('es6literals');

        const quotaStyle: string = <string>config.get('quotationStyle');


        console.log(quotaStyle);

    });
}
