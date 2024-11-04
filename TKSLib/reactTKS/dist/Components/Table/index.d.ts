import { FC } from 'react';
import './styles.css';
import { TableConfigProps } from 'define';
declare const Table: FC<{
    data: {
        [key: string]: any;
    }[];
    config: TableConfigProps;
    onSelectPage: (number: number) => void;
}>;
export default Table;
