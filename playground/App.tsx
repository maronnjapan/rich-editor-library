
import { EditorProps } from '../lib/editor/Editor'
import '../lib/output.css'
import '../lib/global-style.css'
import { EditorWrapper } from '../lib/editor/EditorWrapper'
import { EditorFloatPluginWrapper } from '../lib/editor/EditorFloatPluginWrapper'
import { ToolBarPlugin } from '../lib/editor/plugins/ToolBarPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import styles from '../lib/editor/styles/Editor.module.css'
import { GenerateMarkdownPlugin } from '../lib/editor/plugins/GenerateMarkdownPlugin'
import { GenerateHtmlPlugin } from '../lib/editor/plugins/GenerateHtmlPlugin'

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
    </div>
  )
}

export default App
