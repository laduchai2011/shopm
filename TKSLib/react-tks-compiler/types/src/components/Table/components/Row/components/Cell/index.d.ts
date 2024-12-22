import { FC } from 'react';
import './styles.css';
import { CellProps } from 'define';
declare const Cell: FC<{
    data: CellProps;
    cellIndex: number;
    rowIndex: number;
    column: number;
}>;
export default Cell;
