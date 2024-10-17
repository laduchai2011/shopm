import { FC } from 'react';
// import './App.css';
import Table from "./screen/Table";

import { TableProps } from 'define';

const App: FC = () => {

  const cellData = {
    content: 'cell_1'
  }

  const rowData = {
    cells: [cellData, cellData, cellData, cellData, cellData]
  }

  const initTable:  TableProps = {
    rows: [rowData, rowData, rowData, rowData]
  }

  return <div className="App">
    <Table data={ initTable } />
  </div>
}

export default App;
