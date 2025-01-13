import { AutoLinkPlugin as LexicalAutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { urlRegExp } from '../../utils/url';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { COMMAND_PRIORITY_HIGH, PASTE_COMMAND } from 'lexical';
import { $isTweetUrl } from '../EmbedExternalSystemPlugin/node';

const AutoLinkPlugin = () => {
    const [editor] = useLexicalComposerContext()
    useEffect(() => {
        return editor.registerCommand(PASTE_COMMAND, (payload: ClipboardEvent) => {

            return false;
        }, COMMAND_PRIORITY_HIGH)

    }, [editor])

    return <LexicalAutoLinkPlugin
        matchers={[
            (text: string) => {
                const match = urlRegExp.exec(text);
                if (match === null) {
                    return null;
                }
                const fullMatch = match[0];
                return {
                    index: match.index,
                    length: fullMatch.length,
                    text: fullMatch,
                    url: fullMatch.startsWith('http') ? fullMatch : `https://${fullMatch}`,
                };
            },
        ]}
    />
}

export default AutoLinkPlugin;
