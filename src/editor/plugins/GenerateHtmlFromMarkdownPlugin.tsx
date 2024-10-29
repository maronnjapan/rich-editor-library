'use client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function GenerateHtmlFromMarkdownPlugin() {
  const [editor] = useLexicalComposerContext();

  const generateHtml = async () => {
    editor.update(async () => {
      // const markdown = $convertToMarkdownString(TRANSFORMER_PATTERNS);
      // TODO:外から渡すようにする
      // chrome.runtime.sendMessage({
      //   type: 'CONVERT',
      //   data: { content: markdown },
      // });
    });
  };

  // chrome.runtime.onMessage.addListener(async (message, sender) => {
  //   alert(message.data.html);
  //   if (message.type === 'CONVERTED') {
  //     await navigator.clipboard.writeText(message.data.html);
  //     alert('HTML変換完了');
  //   }
  // });

  return (
    <button className="p-2 bg-cyan-500" onClick={generateHtml}>
      HTML変換
    </button>
  );
}
