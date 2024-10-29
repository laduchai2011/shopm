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
        fieldName: '',
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
      columnAmount: 5,
      columnsInfor: [{columnName: 'Name', fieldName: 'name'}, {columnName: 'Title', fieldName: 'title'}, {columnName: 'Note', fieldName: 'note'}],
      pageIndex: 1,
      pageSize: 2,
      maxRow: 80,
      controlPos: 'bottom'
    }

    const data = [
      {
        name: 'name 1',
        title: 'title 1'
      },
      {
        title: 'title 2',
        name: 'name 2',
        note: 'note 2'
      },
      {
        name: 'name 3',
        title: 'title 3'
      },
      {
        name: 'name 4',
        title: 'title 4'
      }
    ]

    const handleSelectPage = (number: number) => {
      console.log('handleSelectPage', number)
    }

    return <div className="TKS-Home">
      <Table data= {data} config={ tableConfig } onSelectPage={handleSelectPage} />
    </div>;
};

export default Home;