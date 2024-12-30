import { ClipboardImageHandler, ClipboardImageHandlerProps } from "./clipboard-handler";
import { ImageRegister } from "./register";

export type InsertImagePluginProps = ClipboardImageHandlerProps
export function InsertImagePlugin({ customFetchFileUpload }: InsertImagePluginProps) {
    return <>
        <ImageRegister></ImageRegister>
        <ClipboardImageHandler customFetchFileUpload={customFetchFileUpload}></ClipboardImageHandler>
    </>
}