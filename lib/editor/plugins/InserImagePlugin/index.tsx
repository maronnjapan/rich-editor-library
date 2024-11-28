import ClipboardImageHandler from "./clipboard-handler";
import { ImageRegister } from "./register";

export function InsertImagePlugin() {
    return <>
        <ImageRegister></ImageRegister>
        <ClipboardImageHandler></ClipboardImageHandler>
    </>
}