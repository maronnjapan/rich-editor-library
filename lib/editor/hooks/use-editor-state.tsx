import { EditorState } from "lexical"

export type EditorValue = { editorState: EditorState, editorStateStr: string, plainText: string, htmlStr?: string, markdownStr?: string }

export const editorStateMap = new Map<string, EditorValue>()
export const useEditorState = (editorNamespace: string) => {

    const getEditorValue = () => editorStateMap.get(editorNamespace)

    return { getEditorValue }
}