import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { useEffect, useRef } from "react";
import { editorStateMap, EditorValue } from "../hooks/use-editor-state";
import { $generateHtmlFromNodes } from '@lexical/html';
import { $convertToMarkdownString } from '@lexical/markdown';
import { stylesStr } from "../../style-const";
import { TRANSFORMER_PATTERNS } from "./MarkdownPlugin";
let isFirst = true;

export interface AutoSavePluginProps {
    onAutoSave?: (value: EditorValue) => void | Promise<void>
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
                const htmlString = $generateHtmlFromNodes(editor);
                const htmlWithStyles = `<style>${stylesStr}</style>${htmlString.replace(/(data-gutter=")([^"]*?)(")/g, (_, p1, p2: string, p3) => {
                    return p1 + p2.replace(/amp;/g, '') + p3;
                })}`
                const markdownStr = $convertToMarkdownString(TRANSFORMER_PATTERNS);
                editorStateMap.set(editorName, { editorState, editorStateStr, plainText, htmlStr: htmlWithStyles, markdownStr })

                // 登録しているsettimeout関数の処理があれば削除する
                if (timer.current) {
                    clearTimeout(timer.current);
                }
                // refにsettimeout関数を代入する
                timer.current = setTimeout(async () => {
                    await onAutoSave?.({ editorState, plainText, editorStateStr, htmlStr: htmlWithStyles, markdownStr })
                }, saveTimeIntervalPerMs);
            });
        });
    }, [editor]);


    return null
}

