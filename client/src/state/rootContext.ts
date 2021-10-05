import { createContext, useContext } from 'react';

export const rootStore = {};

export const RootStoreContext = createContext<typeof rootStore>(rootStore);

export const useRootContext = () => useContext(RootStoreContext);
