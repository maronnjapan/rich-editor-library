'use client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import { stylesStr } from '../../style-const';

export interface GenerateHtmlPluginProps {
  onClickGenerateBtn?: (htmlWithStyles: string) => void | Promise<void>
}

export function GenerateHtmlPlugin({ onClickGenerateBtn }: GenerateHtmlPluginProps) {
  const [editor] = useLexicalComposerContext();

  const generateHtml = async () => {
    editor.update(async () => {
      const htmlString = $generateHtmlFromNodes(editor);
      const htmlWithStyles = `<style>${stylesStr}</style>${htmlString.replace(/(data-gutter=")([^"]*?)(")/g, (_, p1, p2: string, p3) => {
        return p1 + p2.replace(/amp;/g, '') + p3;
      })}`
      if (onClickGenerateBtn) {
        onClickGenerateBtn(htmlWithStyles)
        return
      }
      await navigator.clipboard.writeText(htmlWithStyles);
      alert('HTML変換完了');
    });
  };

  return (
    <button className="p-2 bg-cyan-500" onClick={generateHtml}>
      HTML変換
    </button>
  );
}
