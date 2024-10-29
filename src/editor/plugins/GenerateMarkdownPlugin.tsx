'use client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $convertToMarkdownString } from '@lexical/markdown';
import { TRANSFORMER_PATTERNS } from './MarkdownPlugin';

export default function GenerateMarkdonwPlugin() {
  const [editor] = useLexicalComposerContext();

  const generateHtml = async () => {
    editor.update(async () => {
      const markdown = $convertToMarkdownString(TRANSFORMER_PATTERNS);
      await navigator.clipboard.writeText(markdown);
      alert('Markdown変換完了');
    });
  };

  return (
    <button className="p-2 bg-cyan-500" onClick={generateHtml}>
      Markdonw変換
    </button>
  );
}
