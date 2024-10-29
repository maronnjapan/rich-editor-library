import { TablePlugin as LexicalTablePlugin } from '@lexical/react/LexicalTablePlugin';
import TableCellBtn from './TableCellBtn';
import TableCellResizerPlugin from './TableCellResizer';
import { Suspense } from 'react';

export default function TablePlugin({ anchorElm }: { anchorElm?: HTMLElement | null }) {
  return (
    <>
      <TableCellBtn anchorElm={anchorElm}></TableCellBtn>
      <Suspense>
        <TableCellResizerPlugin></TableCellResizerPlugin>
      </Suspense>
      <LexicalTablePlugin></LexicalTablePlugin>
    </>
  );
}
