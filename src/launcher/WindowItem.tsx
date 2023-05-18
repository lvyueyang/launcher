import { PropsWithChildren } from 'react';
import { LauncherWindowContext } from './context';

interface WindowItemProps {
  windowId: string;
}

export function WindowItemView({ windowId, children }: PropsWithChildren<WindowItemProps>) {
  return (
    <LauncherWindowContext.Provider value={{ windowId }}>{children}</LauncherWindowContext.Provider>
  );
}
