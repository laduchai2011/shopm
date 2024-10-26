import React, { FC } from 'react';
import './styles.css';

import Table from 'Components/Table';

import { 
    TableProps,
    CellProps 
} from 'define';

const Home: FC<{}> = () => {

    const cellData = (content: string, textColor: string): CellProps => {
      return {
        content: content,
        textColor: textColor
      }
    }
    
    const rowData = {
      cells: [
        cellData('cell1', 'blue'), 
        cellData('cell2', 'yellow'), 
        cellData('cell3', 'white'), 
        cellData('cell4', 'red'), 
        cellData('cell5', 'green')
      ]
    }
    
    const tableControlData = {
      pageIndex: 1,
      pageSize: 20, 
      maxRow: 81
    }
  
    const initTable:  TableProps = {
      tableControl: tableControlData,
      rows: [rowData, rowData, rowData, rowData]
    }

    const tableConfig = {
      columnAmount: 1,
      pageIndex: 1,
      pageSize: 1,
      maxRow: 100
    }

    const handleSelectPage = (number: number) => {
      console.log('handleSelectPage', number)
    }

    return <div className="TKS-Home">
      <Table data={ initTable.rows } config={ tableConfig } onSelectPage={handleSelectPage} />
    </div>;
};

export default Home;