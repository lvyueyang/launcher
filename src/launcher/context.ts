import { createContext } from 'react';
import { WindowItem } from './interface';

interface LauncherContextValue {
  options?: WindowItem;
}

export const LauncherContext = createContext<LauncherContextValue>({});

interface LauncherWindowContext {
  windowId: string;
}

export const LauncherWindowContext = createContext<LauncherWindowContext>({
  windowId: '',
});
