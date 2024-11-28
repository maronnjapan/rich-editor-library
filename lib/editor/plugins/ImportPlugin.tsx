import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const ImportPlugin = ({ content }: { content: string }) => {
  const [editor] = useLexicalComposerContext();

  try {
    const editorState = editor.parseEditorState(content);
    editor.setEditorState(editorState);
  } catch (e) {
    console.error(e)
  }


  return null;
};

export default ImportPlugin;
