import { TRANSFORMERS, ElementTransformer } from '@lexical/markdown';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import {
  $createCollapsibleContainerNode,
  $isCollapsibleContainerNode,
  CollapsibleContainerNode,
} from './CollapsiblePlugin/container-node';
import {
  $createCollapsibleContentNode,
  $isCollapsibleContentNode,
  CollapsibleContentNode,
} from './CollapsiblePlugin/content-node';
import {
  $createCollapsibleTitleNode,
  $isCollapsibleTitleNode,
  CollapsibleTitleNode,
} from './CollapsiblePlugin/title-node';
import {
  $createParagraphNode,
  $createTextNode,
  $isParagraphNode,
  ElementNode,
  LexicalNode,
} from 'lexical';
import {
  $createLinkPreviewNode,
  $isLinkPreviewNode,
  LinkPreviewNode,
} from './LinkPreviewPlugin/node';
import {
  $createMessageContentNode,
  $isMessageContentNode,
  MessageContentNode,
  MessageTypes,
} from './MessagePlugin/content-node';
import {
  TableNode,
  TableCellNode,
  TableRowNode,
  $isTableNode,
  $createTableNode,
  $createTableRowNode,
  $createTableCellNode,
} from '@lexical/table';
import { $isFigmaNode, FigmaNode } from './EmbedExternalSystemPlugin/FigmaPlugin/node';
import { $isTweetNode, TweetNode } from './EmbedExternalSystemPlugin/TwitterPlugin/node';
import { Permutation } from '../../utils/utility-type';

export const COLLAPSIBLE: ElementTransformer = {
  dependencies: [CollapsibleContainerNode, CollapsibleContentNode, CollapsibleTitleNode],
  export: (node, exportChildren: (node: ElementNode) => string) => {
    if (!$isCollapsibleContainerNode(node)) {
      return null;
    }

    const titleNode = node.getFirstChild();
    const contentNode = node.getLastChild();

    if (!$isCollapsibleTitleNode(titleNode) || !$isCollapsibleContentNode(contentNode)) {
      return null;
    }

    const title = exportChildren(titleNode);
    const content = exportChildren(contentNode);

    return ':::details ' + title + '\n' + content + '\n:::';
  },
  replace: (parentNode: ElementNode, children: LexicalNode[], match) => {
    const [all, title, content] = match;
    const messageContainer = $createCollapsibleContainerNode(true);
    const messageTitle = $createCollapsibleTitleNode().append(
      $createTextNode(all.replace(':::details ', '').trim())
    );
    const messageContent = $createCollapsibleContentNode().append($createParagraphNode());

    // childrenをParagraphNodeにラップしてmessageContentに追加
    children.forEach((child) => {
      if ($isParagraphNode(child)) {
        messageContent.append(child);
      } else {
        const paragraphNode = $createParagraphNode();
        paragraphNode.append(child);
        messageContent.append(paragraphNode);
      }
    });

    messageContainer.append(messageTitle, messageContent);
    parentNode.replace(messageContainer);
  },
  regExp: /^[ \t]*:::details [\s\S]+(\w{1,10})?\s/,
  type: 'element',
};

export const MESSAGE: ElementTransformer = {
  dependencies: [MessageContentNode],
  export: (node, exportChildren: (node: ElementNode) => string) => {
    if (!$isMessageContentNode(node)) {
      return null;
    }
    return ':::message ' + node.getMessageType() + '\n' + node.getTextContent() + '\n:::';
  },
  replace: (parentNode: ElementNode, children: LexicalNode[], match) => {
    const [all] = match;

    const trimMathcText = all.replace(':::message ', '').trim();
    const messageTypes: Permutation<MessageTypes> = ['alert', 'warning', ''];

    const targetMessageType = messageTypes.find((type) => type === trimMathcText);
    if (targetMessageType === undefined) {
      return;
    }
    const messageContent = $createMessageContentNode(targetMessageType);

    parentNode.replace(messageContent);
  },
  regExp: /^[ \t]*:::message (\s|alert|warning)\s/,
  type: 'element',
};

export const LINK_CARD: ElementTransformer = {
  dependencies: [LinkPreviewNode],
  export: (node) => {
    if (!$isLinkPreviewNode(node)) {
      return null;
    }

    return '@[linkCard](' + node.getUrl() + ')';
  },
  replace: (node, children, match) => {
    const [, url] = match;
    const linkPreviewNode = $createLinkPreviewNode({ url });
    node.replace(linkPreviewNode);
  },
  regExp: /@(?:\[linkCard\])(?:\(([^(]+)\))$/,
  type: 'element',
};

export const TABLE: ElementTransformer = {
  dependencies: [TableNode, TableRowNode, TableCellNode],
  export: (node) => {
    if (!$isTableNode(node)) {
      return null;
    }

    const separate = ' | ';
    const children = node.getChildren();
    const childrenTexts = children.map((child) =>
      child
        .getTextContent()
        .split('\n')
        .map((val, index) => (index % 2 === 1 ? ' | ' : `${val}`))
    );
    const headerSeparete = [...Array(childrenTexts[0].filter((i) => i !== separate).length)]
      .map(() => '----')
      .join(separate);
    const headerText = childrenTexts[0].join('');
    const bodyTexts = childrenTexts.slice(1).map((val) => {
      return `| ${val.join('')} |`;
    });
    const bodyText = bodyTexts.join('\n');

    return `| ${headerText} |\n| ${headerSeparete} |\n${bodyText}`;
  },
  replace: (parentNode: ElementNode, children: LexicalNode[], match) => {
    const [all] = match;

    const createRowNum = Number(all.replace(/.*\|/gi, '').trim());
    const tabeleCotent = all.trim().match(/^\|.*\|/gi);
    if (!tabeleCotent) {
      return;
    }
    const texts = tabeleCotent[0].replace(/^\|/, '').replace(/\|$/, '').split('|');
    const tableNode = $createTableNode();
    const tableRowNode = $createTableRowNode();
    const tableCellNodes = texts.map((text) =>
      $createTableCellNode(0).append($createParagraphNode().append($createTextNode(text.trim())))
    );
    tableCellNodes.forEach((cell) => {
      tableRowNode.append(cell);
    });
    tableNode.append(tableRowNode);

    for (let i = 1; i < createRowNum; i++) {
      const tableRowNodeArterFirstRow = $createTableRowNode();
      [...Array(tableCellNodes.length)].forEach((_) => {
        tableRowNodeArterFirstRow.append($createTableCellNode(0).append($createParagraphNode()));
      });
      tableNode.append(tableRowNodeArterFirstRow);
    }

    parentNode.replace(tableNode);
  },
  regExp: /^\|.+\| (\s|[0-9]+)\s/g,
  type: 'element',
};

export const FIGMA: ElementTransformer = {
  dependencies: [FigmaNode],
  export: (node) => {
    if (!$isFigmaNode(node)) {
      return null;
    }

    return '@[figma](' + node.getTextContent() + ')';
  },
  // ここから下は一旦使わない
  replace: (node, match) => {
    // Markdownで実装したいときに使用すること
  },
  regExp: /figma/,
  type: 'element',
};

export const TWITTER: ElementTransformer = {
  dependencies: [TweetNode],
  export: (node) => {
    if (!$isTweetNode(node)) {
      return null;
    }

    return '----tweetEmbed----(' + node.getUrl() + ')';
  },
  // ここから下は一旦使わない
  replace: (node, match) => {
    // Markdownで使用したいときに実装すること
  },
  regExp: /twitter/,
  type: 'element',
};

export const TRANSFORMER_PATTERNS = [
  FIGMA,
  TWITTER,
  COLLAPSIBLE,
  LINK_CARD,
  MESSAGE,
  TABLE,
  ...TRANSFORMERS,
];

export const MarkdownPlugin = () => {
  return <MarkdownShortcutPlugin transformers={TRANSFORMER_PATTERNS}></MarkdownShortcutPlugin>;
};
