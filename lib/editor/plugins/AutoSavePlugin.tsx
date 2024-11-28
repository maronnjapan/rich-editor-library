import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, EditorState } from "lexical";
import { useEffect, useRef } from "react";
import { editorStateMap } from "../hooks/use-editor-state";

let isFirst = true;

export interface AutoSavePluginProps {
    onAutoSave?: (value: { editorState: EditorState, editorStateStr: string, plainText: string }) => void | Promise<void>
    saveTimeIntervalPerMs?: number;
    editorName: string;
}

export const AutoSavePlugin = ({ onAutoSave, saveTimeIntervalPerMs = 1000, editorName }: AutoSavePluginProps) => {
    const [editor] = useLexicalComposerContext();
    // settimeout関数を格納する
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Editor Statesが更新されたタイミングで処理が走るように登録しておく
        return editor.registerUpdateListener(({ editorState }) => {
            /**
             * 最新のEditor Stateで処理を行う
             * Editor Statesは更新する予定はないが、Lexicalのユーティリティ関数を使用した
             * よって、readメソッドを使っている
             */
            editorState.read(() => {
                // 最初に画面を開いた時は自動で保存することをさけるため
                if (isFirst) {
                    isFirst = false;
                    return;
                }
                const editorStateStr = JSON.stringify(
                    editorState.toJSON(),
                );
                const plainText = $getRoot().getTextContent();
                editorStateMap.set(editorName, { editorState, editorStateStr, plainText })

                // 登録しているsettimeout関数の処理があれば削除する
                if (timer.current) {
                    clearTimeout(timer.current);
                }
                // refにsettimeout関数を代入する
                timer.current = setTimeout(async () => {
                    await onAutoSave?.({ editorState, plainText, editorStateStr })
                }, saveTimeIntervalPerMs);
            });
        });
    }, [editor]);


    return null
}

