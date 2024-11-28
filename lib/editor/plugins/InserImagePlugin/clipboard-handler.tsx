import { COMMAND_PRIORITY_LOW } from 'lexical';
import { FC, useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DRAG_DROP_PASTE } from '@lexical/rich-text';
import { mediaFileReader } from '@lexical/utils';
import { uploadImage } from './command';




const ACCEPTABLE_IMAGE_TYPES = [
    'image/',
    'image/heic',
    'image/heif',
    'image/gif',
    'image/webp',
];

const ClipboardImageHandler: FC = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(
            DRAG_DROP_PASTE,
            (files) => {
                (async () => {
                    const filesResult = await mediaFileReader(
                        files,
                        [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x),
                    );

                    if (filesResult !== null) {
                        const file = filesResult[0].file

                        await uploadImage(file, editor)


                    }
                })();
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);
    return null;
};

export default ClipboardImageHandler;