import { useContext } from "react"
import { FloatingAnchorElmContext } from "../EditorWrapper"

export const useFloatingAnchorElmContextElm = () => {
    const floatingAnchorElm = useContext(FloatingAnchorElmContext)

    return { floatingAnchorElm }
}