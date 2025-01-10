import { createContext } from 'react';

/**
 * @typedef {import('define/madication').medicationContextOptions} medicationContextOptions
*/

/** @type {React.Context<medicationContextOptions | null>} */
export const MedicationContext = createContext(null);