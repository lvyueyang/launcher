import { createContext } from 'react';
import { AppItem } from './interface';

interface LauncherContextValue {
  options?: AppItem;
}

export const LauncherContext = createContext<LauncherContextValue>({});

interface LauncherWindowContext {
  appWindowId: string;
}

export const LauncherWindowContext = createContext<LauncherWindowContext>({
  appWindowId: '',
});
