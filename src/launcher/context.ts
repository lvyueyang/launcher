import { createContext } from 'react';
import { WindowItem } from './interface';

interface LauncherWindowContext {
  windowId: string;
}

export const LauncherWindowContext = createContext<LauncherWindowContext>({
  windowId: '',
});
