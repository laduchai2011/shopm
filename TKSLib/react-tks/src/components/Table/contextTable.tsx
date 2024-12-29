import { createContext } from 'react';

import { ContextTableProps } from 'src/define';

export const ContextTable = createContext<ContextTableProps | undefined>(undefined);