import { EditorHistory } from "./caretakers/editor-history";
import { TextEditor } from "./originators/text-editor";

const editor = new TextEditor();
const history = new EditorHistory();

editor.write("Padroes de Projeto");
history.save(editor.createMemento());

editor.write("Padroes de Projeto em TypeScript");
history.save(editor.createMemento());

editor.write("Padroes de Projeto em TypeScript - versao com rascunho");
console.log(`[Main] Conteudo atual: "${editor.getContent()}"`);

const lastSnapshot = history.getLast();

if (lastSnapshot) {
  editor.restore(lastSnapshot);
}

console.log(`[Main] Conteudo apos undo: "${editor.getContent()}"`);
