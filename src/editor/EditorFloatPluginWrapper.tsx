'use client';

import { ReactNode, useState } from 'react';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import { Klass, LexicalNode } from 'lexical';
import { useFloatingAnchorElmContextElm } from './hooks/use-floating-anchor-elm';
import { LinkPreviewPluginConfig } from './EditorWrapper';


interface CustomFloatEditorPlugin {
  node: Klass<LexicalNode> | null
  registerPlugin: JSX.Element;
}


export interface EditorFloatPluginWrapperProps {
  children?: ReactNode
  floatCustoms?: CustomFloatEditorPlugin[];
  linkPreviewPluginConfig?: LinkPreviewPluginConfig;
}

export const EditorFloatPluginWrapper = ({ floatCustoms = [], linkPreviewPluginConfig }: EditorFloatPluginWrapperProps) => {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const { floatingAnchorElm } = useFloatingAnchorElmContextElm()


  return (

    <>
      {!!floatingAnchorElm && (
        <>
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElm}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
            canSetLinkPreview={!!linkPreviewPluginConfig}
          ></FloatingLinkEditorPlugin>
          <FloatingTextFormatToolbarPlugin
            anchorElem={floatingAnchorElm}
          ></FloatingTextFormatToolbarPlugin>
          {floatCustoms.map(custom => custom.registerPlugin)}
        </>
      )}</>

  );
};
