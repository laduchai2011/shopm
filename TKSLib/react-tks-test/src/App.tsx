import { FC } from 'react';
// import './App.css';
import Table from "./screen/Table";

import { 
  TableProps,
  CellProps 
} from 'define';

const App: FC = () => {

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

  const initTable:  TableProps = {
    rows: [rowData, rowData, rowData, rowData]
  }

  return <div className="App">
    <Table data={ initTable } />
  </div>
}

export default App;
