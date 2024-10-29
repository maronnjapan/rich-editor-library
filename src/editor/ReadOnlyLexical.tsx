
import { ComponentProps } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { nodes } from './node';
import AutoFocusPlugin from './plugins/AutoFoculPlugin';
import styles from './styles/Editor.module.css';
import { theme } from './theme/editorTheme';
import { CodeHighlightPlugin } from './plugins/CodeHighlightPlugin';
import { MarkdownPlugin, TRANSFORMER_PATTERNS } from './plugins/MarkdownPlugin';
import LexicalAutoLinkPlugin from './plugins/AutoLinkPlugin';
import LinkPreviewPlugin from './plugins/LinkPreviewPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import MessagePlugin from './plugins/MessagePlugin';
import EmbedExternalSystemPlugin from './plugins/EmbedExternalSystemPlugin';
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin';
import { $convertFromMarkdownString } from '@lexical/markdown';

const initialConfig = (
  markdown: string
): ComponentProps<typeof LexicalComposer>['initialConfig'] => ({
  namespace: 'MyEditor',
  onError: (error) => console.error(error),
  nodes: nodes,
  theme: theme,
  editable: false,
  editorState: () => $convertFromMarkdownString(markdown, TRANSFORMER_PATTERNS),
});

export const ReadOnlyLexical = ({ content }: { content: string; isResize?: boolean }) => {
  return (
    <LexicalComposer initialConfig={initialConfig(content)}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div className={styles.placeholder}></div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <AutoFocusPlugin></AutoFocusPlugin>
      <ClickableLinkPlugin></ClickableLinkPlugin>
      <HistoryPlugin />
      <ListPlugin></ListPlugin>
      <CheckListPlugin />
      <MarkdownPlugin></MarkdownPlugin>
      <CodeHighlightPlugin></CodeHighlightPlugin>
      <LexicalAutoLinkPlugin></LexicalAutoLinkPlugin>
      {/* <ImportPlugin content={content}></ImportPlugin> */}
      <LinkPlugin />
      <LinkPreviewPlugin></LinkPreviewPlugin>
      <CollapsiblePlugin></CollapsiblePlugin>
      <MessagePlugin></MessagePlugin>
      <EmbedExternalSystemPlugin></EmbedExternalSystemPlugin>
    </LexicalComposer>
  );
};
