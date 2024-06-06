# horizontal-line-comment README

Implements functionality to insert horizontal line comments into source code files. These are useful for breaking up sections of code explicitly.

Allows preferences for the comment symbol, the line length, and setting your own comment syntax for each language as required.

## Commands

User `Ctrl+Shift+P` to open the VS-Code command palette with an editor open, then search for any of the following commands:

### Insert Horizontal Line: 
Adds a single line comment of a specified length.

`# ----------------------`

### Insert Dual Horizontal Line Block Comment: 

Adds a comment surrounded by two single line comments.

```
# ----------------------
Your comment
# ----------------------
```

## Preferences

### Horizontal Line Symbol

The symbol (or string) to use for the comment. Defaults to a hyphen `-`.

### Horizontal Line Length

The number of times to repeat the horizontal line symbol. Allows for customized line lengths.

### Comment Syntax Map

A map to control the syntaxes used for each language. Allows new languages to be added to the extension.