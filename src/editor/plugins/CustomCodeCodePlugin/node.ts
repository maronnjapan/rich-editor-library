import { CodeNode } from '@lexical/code';
import { LexicalEditor, DOMExportOutput, EditorConfig } from 'lexical';

const LINE_NUMBER_KEY = 'data-gutter'
export class CustomCodeNode extends CodeNode {

    static clone(node: CustomCodeNode): CustomCodeNode {
        return new CustomCodeNode(
            node.getLanguage(),
            node.__key,
        );
    }
    createDOM(config: EditorConfig): HTMLElement {
        const baseElement = super.createDOM(config)
        baseElement.id = Math.random().toString(32).substring(2);
        return baseElement;
    }
    exportDOM(editor: LexicalEditor): DOMExportOutput {

        const elementByNodeKey = editor.getElementByKey(this.getKey());
        const codeLineValue = elementByNodeKey?.getAttribute(LINE_NUMBER_KEY)

        const { element } = super.exportDOM(editor)

        if (element instanceof HTMLElement && codeLineValue) {
            element.setAttribute('data-gutter', codeLineValue.replace(/[\s\t]/g, '\\&\\#13;\\&\\#10;').replace(/\\/g, ''))
        }
        return { element }
    }


    static getType(): string {
        return 'custom-code';
    }

    exportJSON() {
        return {
            ...super.exportJSON(),
            type: 'custom-code',
        };
    }

}