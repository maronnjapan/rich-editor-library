
import { EditorProps } from './editor/Editor'
import './output.css'
import './global-style.css'
import { EditorWrapper } from './editor/EditorWrapper'
import { EditorFloatPluginWrapper } from './editor/EditorFloatPluginWrapper'
import ToolBarPlugin from './editor/plugins/ToolBarPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import styles from './editor/styles/Editor.module.css'
import GenerateMarkdownPlugin from './editor/plugins/GenerateMarkdownPlugin'
import { GenerateHtmlPlugin } from './editor/plugins/GenerateHtmlPlugin'

const loadHtml = async (url: string): Promise<string> => {
  // CORSの制限を回避するためのプロキシサービスを使用
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

  const res = await fetch(proxyUrl);

  const json = await res.json()
  console.log(res.ok)
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
  linkPreviewPluginConfig: { loadHtml }
}

function App() {

  return (
    <div style={{ width: '90%', padding: '1rem', margin: '0 auto' }} >
      <EditorWrapper {...initialConfig}>
        <ToolBarPlugin></ToolBarPlugin>

        <ContentEditable
          className={`${styles.contentEditable}  `}
        />
        <div>
          <GenerateMarkdownPlugin></GenerateMarkdownPlugin>
          <GenerateHtmlPlugin></GenerateHtmlPlugin>
        </div>
        <EditorFloatPluginWrapper></EditorFloatPluginWrapper>
      </EditorWrapper>
      {/* <Editor {...initialConfig}></Editor> */}
    </div>
  )
}

export default App
