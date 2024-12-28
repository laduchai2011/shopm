import { createContext } from 'react';

import { ContextTableProps } from '@define/index';

export const ContextTable = createContext<ContextTableProps | undefined>(undefined);