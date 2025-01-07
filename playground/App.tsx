
import { EditorProps } from '../lib/editor/Editor'
import '../lib/output.css'
import '../lib/global-style.css'
import { EditorWrapper } from '../lib/editor/EditorWrapper'
import { EditorFloatPluginWrapper, EditorFloatPluginWrapperProps } from '../lib/editor/EditorFloatPluginWrapper'
import { ToolBarPlugin } from '../lib/editor/plugins/ToolBarPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import styles from '../lib/editor/styles/Editor.module.css'
import { GenerateMarkdownPlugin } from '../lib/editor/plugins/GenerateMarkdownPlugin'
import { GenerateHtmlPlugin } from '../lib/editor/plugins/GenerateHtmlPlugin'
import React, { useState } from 'react'
import { useEditorState } from '../lib/editor/hooks/use-editor-state'

const loadHtml = async (url: string): Promise<string> => {
  // CORSの制限を回避するためのプロキシサービスを使用
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

  const res = await fetch(proxyUrl);

  const json = await res.json()
  if (res.ok) {
    return json.contents
  }

  throw new Error()
}

const initialConfig: EditorProps = {
  initialEditorConfig: {
    editorName: 'myEditor',
    isAutoFocus: true
  },
  linkPreviewPluginConfig: { loadHtml },

}

const editorFloatPluginConfig: EditorFloatPluginWrapperProps = {
  linkPreviewPluginConfig: { loadHtml }
}

function App() {

  const { getEditorValue } = useEditorState(initialConfig.initialEditorConfig.editorName)
  const [htmlStr, setHtmlStr] = useState<string | undefined>(getEditorValue()?.htmlStr)
  const [markdownStr, setMarkdownStr] = useState<string | undefined>(getEditorValue()?.markdownStr)
  const [plainText, setPlainText] = useState<string | undefined>(getEditorValue()?.plainText)
  const config: EditorProps = {
    ...initialConfig,
    autoSavePluginConfig: {
      onAutoSave(value) {
        setHtmlStr(value.htmlStr)
        setMarkdownStr(value.markdownStr)
        setPlainText(value.plainText)
      },
      saveTimeIntervalPerMs: 1000
    }
  }


  return (
    <div style={{ width: '90%', padding: '1rem', margin: '0 auto', display: 'flex', gap: '1rem' }} >
      <div style={{ width: '80%', }}>
        <EditorWrapper {...config}>
          <ToolBarPlugin></ToolBarPlugin>

          <ContentEditable
            className={`${styles.contentEditable}  `}
          />
          <div>
            <GenerateMarkdownPlugin></GenerateMarkdownPlugin>
            <GenerateHtmlPlugin></GenerateHtmlPlugin>
          </div>
          <EditorFloatPluginWrapper {...editorFloatPluginConfig}></EditorFloatPluginWrapper>
        </EditorWrapper>
      </div>

      <div style={{ width: '20%', lineHeight: '1' }}>
        <div>
          <p>文字列</p>
          <p style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {plainText}
          </p>
        </div>
        <div>
          <p>Markdown</p>
          <p style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {markdownStr}
          </p>
        </div>
        <div>
          <p>HTML</p>
          <p>
            {htmlStr}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
