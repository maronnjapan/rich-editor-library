import {
  $applyNodeReplacement,
  DOMExportOutput,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedEditor,
  Spread,
  createEditor,
} from 'lexical';
import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import type { SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import { Suspense, useEffect, useState } from 'react';
import ogs, { SuccessResult } from 'open-graph-scraper-lite'
import { styles } from './style/styles';

const LinkPreview = ({ url, nodeKey }: { url: string; nodeKey: NodeKey }) => {
  const [ogcContent, setOgcContent] = useState<SuccessResult['result'] | undefined>(undefined)

  useEffect(() => {
    (async () => {
      try {
        // CORSの制限を回避するためのプロキシサービスを使用
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

        const res = await fetch(proxyUrl);

        const json = await res.json()
        if (res.ok) {
          const result = await ogs({ html: json.contents })
          setOgcContent(result.error ? undefined : result.result)
        }

      } catch (error) {
        console.error('Error fetching Open Graph Data:', error)

      }
    })()
  }, [])

  return (
    <BlockWithAlignableContents
      format={''}
      nodeKey={nodeKey}
      className={{
        base: 'relative',
        focus: 'relative outline outline-indigo-300',
      }}
    >
      {
        ogcContent ?
          <a href={url} target="_blank" referrerPolicy='no-referrer'>
            <div className={styles['link-preview-container']}>
              <figure className={styles['link-preview-card-image-container']}>
                <img src={ogcContent.ogImage?.[0].url} alt="ページアイコン" className={styles['link-preview-card-image']} />
              </figure>
              <div>
                <h2 className={styles['link-preview-card-content-header']}>{ogcContent.ogTitle}</h2>
                <p className={styles['link-preview-card-content-description']}>{ogcContent.ogDescription}</p>
              </div>
            </div>
          </a> : null
      }

    </BlockWithAlignableContents>
  );
};

export interface LinkPreviewPayload {
  url: string;
  key?: NodeKey;
  caption?: LexicalEditor;
}
const linkType = 'link-preview';
type LinkPreviewAttributes = {
  url: string;
  caption: SerializedEditor;
};

type SerializedLinkPreviewNode = Spread<LinkPreviewAttributes, SerializedDecoratorBlockNode>;

export class LinkPreviewNode extends DecoratorBlockNode {
  _url: string;
  _caption: LexicalEditor;

  exportJSON(): SerializedLinkPreviewNode {
    return {
      ...super.exportJSON(),
      caption: this._caption.toJSON(),
      url: this._url,
      type: 'link-preview',
      version: 1,
    };
  }

  static getType(): string {
    return 'link-preview';
  }

  constructor(url: string, caption?: LexicalEditor, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this._url = url;
    this._caption = caption || createEditor();
  }

  static clone(node: LinkPreviewNode): LinkPreviewNode {
    return new LinkPreviewNode(node._url);
  }

  getUrl(): string {
    return this._url;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('iframe');
    element.setAttribute('src', this._url);
    return { element };
  }

  decorate(): JSX.Element {
    return (
      <Suspense>
        <LinkPreview url={this._url} nodeKey={this.__key}></LinkPreview>
      </Suspense>
    );
  }

  static importJSON(_serializedNode: SerializedLinkPreviewNode): LinkPreviewNode {
    const { url, caption } = _serializedNode;
    const node = $createLinkPreviewNode({ url });
    return node;
  }
}

export function $createLinkPreviewNode(payload: LinkPreviewPayload): LinkPreviewNode {
  return $applyNodeReplacement(new LinkPreviewNode(payload.url, payload.caption));
}

export function $isLinkPreviewNode(node?: LexicalNode): node is LinkPreviewNode {
  return node instanceof LinkPreviewNode;
}
