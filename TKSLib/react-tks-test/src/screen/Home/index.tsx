import React, { FC, useState } from 'react';
import './styles.css';

import Table from 'Components/Table';

import { LOAD_STATE } from 'const';

const Home: FC<{}> = () => {

    // const cellData = (content: string, textColor: string): CellProps => {
    //   return {
    //     fieldName: '',
    //     content: content,
    //     textColor: textColor
    //   }
    // }
    
    // const rowData = {
    //   cells: [
    //     cellData('cell1', 'blue'), 
    //     cellData('cell2', 'yellow'), 
    //     cellData('cell3', 'white'), 
    //     cellData('cell4', 'red'), 
    //     cellData('cell5', 'green')
    //   ]
    // }
    
    // const tableControlData = {
    //   pageIndex: 1,
    //   pageSize: 20, 
    //   maxRow: 81
    // }
  
    // const initTable:  TableProps = {
    //   tableControl: tableControlData,
    //   rows: [rowData, rowData, rowData, rowData]
    // }

    const tableConfig = {
      columnAmount: 5,
      columnsInfor: [{columnName: 'Name', fieldName: 'name'}, {columnName: 'Title', fieldName: 'title'}, {columnName: 'Note', fieldName: 'note'}],
      pageSize: 4,
      maxRow: 80,
      // controlPos: 'bottom'
    }

    const data1 = [
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

    const data2 = [
      {
        name: 'name 5',
        title: 'title 5'
      },
      {
        title: 'title 6',
        name: 'name 6',
        note: 'note 6'
      },
      {
        name: 'name 7',
        title: 'title 7'
      },
      {
        name: 'name 8',
        title: 'title 8'
      }
    ]

    const data3 = [
      {
        name: 'name 9',
        title: 'title 9'
      },
      {
        title: 'title 10',
        name: 'name 10',
        note: 'note 10'
      },
      {
        name: 'name 11',
        title: 'title 11'
      },
      {
        name: 'name 12',
        title: 'title 12'
      }
    ]

    const [loadDataState, setLoadDataState] = useState<string | undefined>(undefined)
    const [dataTest, setDataTest] = useState(data1)

    const handleSelectPage = (nextPageIndex: number) => {
      setLoadDataState(LOAD_STATE.LOADING)
      setTimeout(() => {
        
        if (nextPageIndex===1) {
          setLoadDataState(LOAD_STATE.SUCCESS)
          setDataTest(data1)
        } else if (nextPageIndex===2) {
          setLoadDataState(LOAD_STATE.SUCCESS)
          setDataTest(data2)
        } else {
          setLoadDataState(LOAD_STATE.SUCCESS)
          setDataTest(data3)
        }
       
      }, 3000)
    }

    return <div className="TKS-Home">
      <Table data= {dataTest} config={ tableConfig } onSelectPage={handleSelectPage} loadDataState={ loadDataState } />
    </div>;
};

export default Home;