import { CodeNode } from '@lexical/code';
import { LexicalEditor, $getNodeByKey, $isLineBreakNode } from 'lexical';
import { CustomCodeNode } from './node';


export function registerCodeDataGutter(editor: LexicalEditor) {
    if (!editor.hasNodes([CodeNode, CustomCodeNode])) {
        throw new Error(
            'CodeHighlightPlugin: CodeNode or CodeHighlightNode not registered on editor',
        );
    }
    return editor.registerMutationListener(
        CustomCodeNode,
        (mutations) => {
            editor.update(() => {
                for (const [key, type] of mutations) {
                    if (type !== 'destroyed') {
                        const node = $getNodeByKey(key);
                        if (node !== null) {
                            updateCodeGutter(node as CodeNode, editor);
                        }
                    }
                }
            });
        },
        { skipInitialization: false },
    )
}


function updateCodeGutter(node: CustomCodeNode, editor: LexicalEditor): void {
    const codeElement = editor.getElementByKey(node.getKey());
    if (codeElement === null) {
        return;
    }
    const children = node.getChildren();
    const childrenLength = children.length;
    // @ts-expect-error: internal field
    if (childrenLength === codeElement.__cachedChildrenLength) {
        // Avoid updating the attribute if the children length hasn't changed.
        return;
    }
    // @ts-expect-error:: internal field
    codeElement.__cachedChildrenLength = childrenLength;
    let gutter = '1';
    let count = 1;
    for (let i = 0; i < childrenLength; i++) {
        if ($isLineBreakNode(children[i])) {
            gutter += '\n' + ++count;
        }
    }
    console.log(gutter)
    codeElement.setAttribute('data-gutter', gutter);
}