import { LexicalCommand, LexicalEditor, createCommand } from "lexical";
import { ImagePayload } from "./node";

export type InsertImagePayload = Readonly<ImagePayload>

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand('INSERT_IMAGE_COMMAND')


export const uploadImage = async (file: File, editor: LexicalEditor, fetchFileUpload?: (file: File) => Promise<string | undefined> | (string | undefined)) => {


    editor.update(async () => {
        if (fetchFileUpload) {
            const showUrl = await fetchFileUpload(file)
            if (showUrl) {
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                    altText: file.name,
                    src: showUrl
                });
            }
        } else {

            const showUrl = await getBase64(file)
            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                altText: file.name,
                src: showUrl
            });


        }

    });

}

const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (!reader.result) {
                return reject()
            }
            resolve(reader.result.toString());
        }
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};