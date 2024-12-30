import { COMMAND_PRIORITY_LOW } from 'lexical';
import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DRAG_DROP_PASTE } from '@lexical/rich-text';
import { mediaFileReader } from '@lexical/utils';
import { CustomFetchFileUpload, uploadImage } from './command';




const ACCEPTABLE_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
    "image/tiff",
    "image/bmp",
    "image/x-icon",
    "image/vnd.microsoft.icon",
    "image/heic",
    "image/heif",
    "image/avif",
    "image/x-ms-bmp",
    "image/jp2",
    "image/jxl",
    "image/apng"
];


export interface ClipboardImageHandlerProps {
    customFetchFileUpload?: CustomFetchFileUpload
}
export const ClipboardImageHandler = ({ customFetchFileUpload }: ClipboardImageHandlerProps) => {
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

                        await uploadImage(file, editor, customFetchFileUpload)


                    }
                })();
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);
    return null;
};

