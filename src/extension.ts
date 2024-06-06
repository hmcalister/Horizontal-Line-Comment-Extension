import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {





}

export function deactivate() { }

// Setup the functionality to insert a comment.
// 
// Returns the comment syntax, the number of hyphens to insert, and the line number.
function performSetup(editor: vscode.TextEditor): [string, number, number] {
	let document = editor.document;
	let selection = editor.selection;
	let line = document.lineAt(selection.active.line);
	let languageId = document.languageId;
	let commentSyntax = getCommentSyntax(languageId);
	if (!commentSyntax) {
		vscode.window.showInformationMessage(`No comment syntax found for language: ${languageId}`);
		commentSyntax = "";
	}

	const config = vscode.workspace.getConfiguration("horizontal-line-comment");
	const horizontalLineLength = config.get<number>('horizontalLineLength', 3);

	return [commentSyntax, horizontalLineLength, line.lineNumber];
}

function getCommentSyntax(languageId: string): string | null {
	const commentSyntaxMap: { [key: string]: string } = {
		"javascript": "// ",
		"typescript": "// ",
		"python": "# ",
		"cpp": "// ",
		"c": "// ",
		"java": "// ",
		"csharp": "// ",
		"rust": "// ",
		"ruby": "# ",
		"php": "// ",
		"go": "// ",
		"shellscript": "# ",
		"fortran": "! ",
	};

	return commentSyntaxMap[languageId] || null;
}