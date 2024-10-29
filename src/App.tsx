
import { Editor, EditorProps } from './editor/Editor'
import { useEditorState } from './editor/hooks/use-state-editor'
import './index.css'
import './global-style.css'


const initialConfig: EditorProps = {
  initialEditorConfig: {
    editorName: 'myEditor',
    isAutoFocus: true
  }
}

function App() {

  const { getEditorValue } = useEditorState(initialConfig.initialEditorConfig.editorName)
  const onClick = () => {
    console.log(getEditorValue())
  }


  return (
    <div style={{ width: '90%', padding: '1rem', margin: '0 auto' }} >
      <Editor config={initialConfig} ></Editor>
    </div>
  )
}

export default App
