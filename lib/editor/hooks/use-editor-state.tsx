import { EditorState } from "lexical"

export const editorStateMap = new Map<string, { editorState: EditorState, editorStateStr: string, plainText: string }
>
export const useEditorState = (editorNamespace: string) => {
    const getEditorValue = () => editorStateMap.get(editorNamespace);

    return { getEditorValue }
}