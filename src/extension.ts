import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {

	const insertHorizontalLine = vscode.commands.registerCommand("horizontal-line-comment.insertHorizontalLine", () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		let [commentSyntax, commentLength, lineNumber] = performSetup(editor);

		editor.edit(editBuilder => {
			editBuilder.insert(new vscode.Position(lineNumber, 0), commentSyntax + "-".repeat(commentLength) + "\n");
		}).then(() => {
			const newPosition = new vscode.Position(lineNumber + 1, 0);
			editor.selection = new vscode.Selection(newPosition, newPosition);
		});
	});

	const insertDualHorizontalLineBlock = vscode.commands.registerCommand("horizontal-line-comment.insertDualHorizontalLineBlock", () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		let [commentSyntax, commentLength, lineNumber] = performSetup(editor);

		const horizontalLine = commentSyntax + "-".repeat(commentLength);
		editor.edit(editBuilder => {
			editBuilder.insert(new vscode.Position(lineNumber, 0), horizontalLine + "\n" + commentSyntax + "\n" + horizontalLine + "\n");
		}).then(() => {
			const newPosition = new vscode.Position(lineNumber + 1, commentSyntax.length);
			editor.selection = new vscode.Selection(newPosition, newPosition);
		});
	});

	context.subscriptions.push(insertHorizontalLine);
	context.subscriptions.push(insertDualHorizontalLineBlock);
}

export function deactivate() { }

// Setup the functionality to insert a comment.
// 
// Returns the comment syntax, the number of hyphens to insert, and the line number.
function performSetup(editor: vscode.TextEditor): [string, number, number] {
	let document = editor.document;
	let selection = editor.selection;
	let line = document.lineAt(selection.active.line);

	const config = vscode.workspace.getConfiguration("horizontal-line-comment");
	const horizontalLineLength = config.get<number>('horizontalLineLength', 80);

	const commentSyntaxMap = config.get<{ [key: string]: string }>('commentSyntaxMap', {});
	let languageId = document.languageId;
	let commentSyntax = commentSyntaxMap[languageId];
	if (!commentSyntax) {
		vscode.window.showInformationMessage(`No comment syntax found for language: ${languageId}. Add one under preferences > horizontal-line-comment > commentSyntaxMap.`);
		commentSyntax = "";
	}

	return [commentSyntax, horizontalLineLength, line.lineNumber];
}