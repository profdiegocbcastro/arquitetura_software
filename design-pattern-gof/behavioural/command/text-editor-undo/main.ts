import { AppendTextCommand } from "./commands/append-text-command";
import { DeleteTextCommand } from "./commands/delete-text-command";
import { EditorToolbar } from "./invokers/editor-toolbar";
import { TextDocument } from "./receivers/text-document";

const document = new TextDocument();
const toolbar = new EditorToolbar();

toolbar.run(new AppendTextCommand(document, "Design Patterns"));
toolbar.run(new AppendTextCommand(document, " em TypeScript"));
toolbar.run(new DeleteTextCommand(document, 10));
toolbar.undoLast();
toolbar.undoLast();
