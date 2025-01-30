import { createContext } from 'react';

import { Table1_Context_Props } from 'src/define';

export const Table1Context = createContext<Table1_Context_Props | undefined>(undefined);