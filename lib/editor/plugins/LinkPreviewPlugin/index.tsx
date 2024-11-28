import LinkPreviewRegister, { LinkPreviewRegisterProps } from './register';

export type LinkPreviewPluginProps = LinkPreviewRegisterProps

export default function LinkPreviewPlugin({ loadHtml }: LinkPreviewPluginProps) {
  return (
    <>
      <LinkPreviewRegister loadHtml={loadHtml}></LinkPreviewRegister>
    </>
  );
}
