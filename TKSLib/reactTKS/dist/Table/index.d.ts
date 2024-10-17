import React, { FC } from 'react';
import './styles.css';
interface TableProps {
    children: React.Component;
    message: string;
}
declare const Table: FC<TableProps>;
export default Table;
