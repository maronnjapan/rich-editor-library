'use client';

import { ComponentProps, useState } from 'react';
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
import ToolBarPlugin from './plugins/ToolBarPlugin';
import { theme } from './theme/editorTheme';
import { CodeHighlightPlugin } from './plugins/CodeHighlightPlugin';
import { MarkdownPlugin, TRANSFORMER_PATTERNS } from './plugins/MarkdownPlugin';
import ImportPlugin from './plugins/ImportPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import LexicalAutoLinkPlugin from './plugins/AutoLinkPlugin';
import LinkPreviewPlugin from './plugins/LinkPreviewPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import MessagePlugin from './plugins/MessagePlugin';
import TablePlugin from './plugins/TablePlugin';
import EmbedExternalSystemPlugin from './plugins/EmbedExternalSystemPlugin';
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin';
import { $convertFromMarkdownString } from '@lexical/markdown';
import GenerateMarkdonwPlugin from './plugins/GenerateMarkdownPlugin';
import GenerateHtmlFromMarkdownPlugin from './plugins/GenerateHtmlFromMarkdownPlugin';
import { Klass, LexicalNode } from 'lexical';
import { AutoSavePlugin, AutoSavePluginProps } from './plugins/AutoSavePlugin';
import { UnionPick } from '../utils/utility-type';
import styles from './styles/Editor.module.css';


interface CustomEditorPlugin {
  node: Klass<LexicalNode> | null
  registerPlugin: JSX.Element;
}

interface CustomFloatEditorPlugin {
  node: Klass<LexicalNode> | null
  registerPlugin: JSX.Element;
}

type AutoSavePluginConfig = Required<Omit<AutoSavePluginProps, UnionPick<keyof AutoSavePluginProps, 'editorName'>>>

interface InitialEditorConfig {
  editorName: string;
  isAutoFocus?: boolean;
  isResizeEditor?: boolean;
  contentConfig?: { content: string, contentType: 'markdown' | 'editorStateJson' };
}

export interface EditorProps {
  initialEditorConfig: InitialEditorConfig
}

export const Editor = ({ config, customs = [], floatCustoms = [], autoSavePluginConfig }: { config: EditorProps, customs?: CustomEditorPlugin[], floatCustoms?: CustomFloatEditorPlugin[], autoSavePluginConfig?: AutoSavePluginConfig }) => {
  const { initialEditorConfig } = config
  const { editorName, contentConfig, isAutoFocus, isResizeEditor } = initialEditorConfig
  const customNodes = customs.map(custom => custom.node).filter(n => n !== null)
  const customFloatNodes = floatCustoms.map(custom => custom.node).filter(c => c !== null)
  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
    namespace: editorName,
    onError: (error) => console.error(error),
    nodes: [...nodes, ...customNodes, ...customFloatNodes],
    theme: theme,
    editorState: contentConfig?.contentType === 'markdown'
      ? () => $convertFromMarkdownString(contentConfig?.content ?? '', TRANSFORMER_PATTERNS)
      : undefined,
  }

  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={styles.editorContainer}>
        <ToolBarPlugin></ToolBarPlugin>

        <RichTextPlugin
          contentEditable={
            <div ref={onRef} className={styles['contentEditable-wrapper']}>
              <ContentEditable
                className={`${styles.contentEditable} ${isResizeEditor ? 'resize' : ''} `}
              />
            </div>
          }
          placeholder={<div ></div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <div>
          <GenerateMarkdonwPlugin></GenerateMarkdonwPlugin>
          <GenerateHtmlFromMarkdownPlugin></GenerateHtmlFromMarkdownPlugin>
        </div>
      </div>
      {isAutoFocus ? <AutoFocusPlugin></AutoFocusPlugin> : null}
      <ClickableLinkPlugin></ClickableLinkPlugin>
      <HistoryPlugin />
      <ListPlugin></ListPlugin>
      <TablePlugin anchorElm={floatingAnchorElem}></TablePlugin>
      <CheckListPlugin />
      <MarkdownPlugin></MarkdownPlugin>
      <CodeHighlightPlugin></CodeHighlightPlugin>
      <LexicalAutoLinkPlugin></LexicalAutoLinkPlugin>
      {contentConfig?.contentType === 'editorStateJson'
        ? <ImportPlugin content={contentConfig.content}></ImportPlugin>
        : null
      }
      <LinkPlugin />
      <LinkPreviewPlugin></LinkPreviewPlugin>
      <CollapsiblePlugin></CollapsiblePlugin>
      <MessagePlugin></MessagePlugin>
      <EmbedExternalSystemPlugin></EmbedExternalSystemPlugin>
      <AutoSavePlugin editorName={editorName} {...autoSavePluginConfig}></AutoSavePlugin>
      {!!floatingAnchorElem && (
        <>
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          ></FloatingLinkEditorPlugin>
          <FloatingTextFormatToolbarPlugin
            anchorElem={floatingAnchorElem}
          ></FloatingTextFormatToolbarPlugin>
          {floatCustoms.map(custom => custom.registerPlugin)}
        </>
      )}
      {customs.map(custom => custom.registerPlugin)}
    </LexicalComposer>
  );
};
