import { createContext } from 'react';

import { ContextTableProps } from '../../define';

export const ContextTable = createContext<ContextTableProps | null>(null);