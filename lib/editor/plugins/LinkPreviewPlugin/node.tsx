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
import { sleep } from '../../../utils/sleep';
import { LoadHtml } from './types';


export interface LinkPreviewProps {
  url: string;
  nodeKey: NodeKey
  loadHtml: LoadHtml
  id: string;
}
const LinkPreview = ({ url, nodeKey, loadHtml, id }: LinkPreviewProps) => {
  const [ogcContent, setOgcContent] = useState<SuccessResult['result'] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      for (let i = 0; i < 10; i++) {
        try {
          const html = await loadHtml(url)
          // HTMLからカードを表示するために必要なデータを取得
          const result = await ogs({ html: html })
          setOgcContent(result.error ? undefined : result.result)
          setIsLoading(() => false)
          break
        } catch (error) {
          console.error('Error fetching Open Graph Data:', error)
          await sleep(500 * 2 ** i)
          continue
        }
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
        isLoading ? <div className="max-w-2xl p-4 w-full space-y-4">
          <div className="animate-pulse flex space-x-4">
            <div className=" bg-slate-200 h-[75px] w-[75px]"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-slate-200 rounded w-2/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>

        </div> :
          ogcContent ?
            <a href={url} target="_blank" referrerPolicy='no-referrer' data-lexical-link-preview-id={id}>
              <div className={styles['link-preview-container']}>
                <figure className={styles['link-preview-card-image-container']}>
                  <img src={ogcContent.ogImage?.[0].url ?? './noimage.png'} alt="ページアイコン" className={styles['link-preview-card-image']} style={ogcContent.ogImage?.[0].url ? {} : { filter: 'invert(70%)' }} />
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
const linkType = 'link-preview-node';
type LinkPreviewAttributes = {
  url: string;
  loadHtml: LoadHtml
  caption: SerializedEditor;
};

type SerializedLinkPreviewNode = Spread<LinkPreviewAttributes, SerializedDecoratorBlockNode>;

export class LinkPreviewNode extends DecoratorBlockNode {
  _url: string;
  _caption: LexicalEditor;
  _loadHtml: LoadHtml;
  _id: string;

  exportJSON(): SerializedLinkPreviewNode {
    return {
      ...super.exportJSON(),
      caption: this._caption.toJSON(),
      url: this._url,
      loadHtml: this._loadHtml,
      type: linkType,
      version: 1,
    };
  }

  static getType(): string {
    return linkType;
  }

  constructor(url: string, loadHtml: LoadHtml, caption?: LexicalEditor, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this._url = url;
    this._loadHtml = loadHtml;
    this._caption = caption || createEditor();
    this._id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  static clone(node: LinkPreviewNode): LinkPreviewNode {
    return new LinkPreviewNode(node._url, node._loadHtml, node._caption, node.__format, node.__key);
  }

  getUrl(): string {
    return this._url;
  }

  exportDOM(): DOMExportOutput {

    const element = document.createElement('div');
    element.style.position = 'relative';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', this._url);
    linkElement.setAttribute('target', '_blank');
    linkElement.setAttribute('referrerPolicy', 'no-referrer');
    const childHtml = document.querySelector(`[data-lexical-link-preview-id="${this._id}"]`)?.innerHTML;
    linkElement.innerHTML = childHtml ?? '';
    element.appendChild(linkElement);
    return { element };
  }

  decorate(): JSX.Element {
    return (
      <Suspense>
        <LinkPreview id={this._id} url={this._url} loadHtml={this._loadHtml} nodeKey={this.__key}></LinkPreview>
      </Suspense>
    );
  }



  static importJSON(_serializedNode: SerializedLinkPreviewNode): LinkPreviewNode {
    const { url, loadHtml } = _serializedNode;
    const node = $createLinkPreviewNode({ url }, loadHtml);
    return node;
  }

}

export function $createLinkPreviewNode(payload: LinkPreviewPayload, loadHtml: LoadHtml): LinkPreviewNode {
  return $applyNodeReplacement(new LinkPreviewNode(payload.url, loadHtml, payload.caption));
}

export function $isLinkPreviewNode(node?: LexicalNode): node is LinkPreviewNode {
  return node instanceof LinkPreviewNode;
}
