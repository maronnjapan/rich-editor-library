'use client';

import { ComponentProps, createContext, ReactNode, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
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
import LinkPreviewPlugin, { LinkPreviewPluginProps } from './plugins/LinkPreviewPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import MessagePlugin from './plugins/MessagePlugin';
import TablePlugin from './plugins/TablePlugin';
import EmbedExternalSystemPlugin from './plugins/EmbedExternalSystemPlugin';
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin';
import { $convertFromMarkdownString } from '@lexical/markdown';
import GenerateMarkdonwPlugin from './plugins/GenerateMarkdownPlugin';
import { GenerateHtmlPlugin } from './plugins/GenerateHtmlPlugin';
import { Klass, LexicalNode } from 'lexical';
import { AutoSavePlugin, AutoSavePluginProps } from './plugins/AutoSavePlugin';
import { UnionPick } from '../utils/utility-type';
import styles from './styles/Editor.module.css';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { CodeNode } from '@lexical/code'
import { CustomCodeNode } from './plugins/CustomCodeCodePlugin/node';


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

export type LinkPreviewPluginConfig = LinkPreviewPluginProps

export const FloatingAnchorElmContext = createContext<null | HTMLDivElement>(null)


export interface EditorWrapperProps {
  children?: ReactNode
  initialEditorConfig: InitialEditorConfig
  customs?: CustomEditorPlugin[];
  floatCustoms?: CustomFloatEditorPlugin[];
  autoSavePluginConfig?: AutoSavePluginConfig
  linkPreviewPluginConfig?: LinkPreviewPluginConfig;
}

export const EditorWrapper = ({ children, initialEditorConfig, customs = [], floatCustoms = [], autoSavePluginConfig, linkPreviewPluginConfig }: EditorWrapperProps) => {
  const { editorName, contentConfig, isAutoFocus, isResizeEditor } = initialEditorConfig
  const customNodes = customs.map(custom => custom.node).filter(n => n !== null)
  const customFloatNodes = floatCustoms.map(custom => custom.node).filter(c => c !== null)
  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
    namespace: editorName,
    onError: (error) => console.error(error),
    nodes: [...nodes, {
      replace: CodeNode,
      with(node: CodeNode) {
        return new CustomCodeNode(node.getLanguage())
      },
    }, ...customNodes, ...customFloatNodes],
    theme: theme,
    editorState: contentConfig?.contentType === 'markdown'
      ? () => $convertFromMarkdownString(contentConfig?.content ?? '', TRANSFORMER_PATTERNS)
      : undefined,
  }

  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <FloatingAnchorElmContext.Provider value={floatingAnchorElem}>
        <div className={styles.editorContainer}>

          <RichTextPlugin
            contentEditable={
              <div ref={onRef} className={styles['contentEditable-wrapper']}>

                {children ? children :
                  <>
                    <ToolBarPlugin></ToolBarPlugin>

                    <ContentEditable
                      className={`${styles.contentEditable} ${isResizeEditor ? 'resize' : ''} `}
                    />
                    <div>
                      <GenerateMarkdonwPlugin></GenerateMarkdonwPlugin>
                      <GenerateHtmlPlugin></GenerateHtmlPlugin>
                    </div>
                  </>
                }

              </div>
            }
            placeholder={<div ></div>}
            ErrorBoundary={LexicalErrorBoundary}
          />

        </div>
      </FloatingAnchorElmContext.Provider>
      {isAutoFocus ? <AutoFocusPlugin></AutoFocusPlugin> : null}
      <ClickableLinkPlugin></ClickableLinkPlugin>
      <HistoryPlugin />
      <ListPlugin></ListPlugin>
      <TablePlugin anchorElm={floatingAnchorElem}></TablePlugin>
      <CheckListPlugin />
      <MarkdownPlugin></MarkdownPlugin>
      <CodeHighlightPlugin></CodeHighlightPlugin>
      <AutoLinkPlugin></AutoLinkPlugin>
      {contentConfig?.contentType === 'editorStateJson'
        ? <ImportPlugin content={contentConfig.content}></ImportPlugin>
        : null
      }
      <LinkPlugin />
      {
        linkPreviewPluginConfig ? <LinkPreviewPlugin loadHtml={linkPreviewPluginConfig.loadHtml}></LinkPreviewPlugin> : null
      }
      <CollapsiblePlugin></CollapsiblePlugin>
      <MessagePlugin></MessagePlugin>
      <EmbedExternalSystemPlugin></EmbedExternalSystemPlugin>
      <AutoSavePlugin editorName={editorName} {...autoSavePluginConfig}></AutoSavePlugin>
      {customs.map(custom => custom.registerPlugin)}
    </LexicalComposer>
  );
};
