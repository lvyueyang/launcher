import React, { PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { launcher } from './AppLauncher';
import { LauncherWindowContext } from './context';
import { EventTypes, OpenAppItem } from './interface';

interface AppWindowProps {
  appWindowId: string;
}

export function AppWindow({ appWindowId, children }: PropsWithChildren<AppWindowProps>) {
  return (
    <LauncherWindowContext.Provider value={{ appWindowId }}>
      {children}
    </LauncherWindowContext.Provider>
  );
}

export function useAppWindow() {
  const { appWindowId: id } = useContext(LauncherWindowContext);
  const [info, setInfo] = useState<OpenAppItem>(launcher.getInfo(id)!);
  useEffect(() => {
    const handler: EventTypes['update:appWindow'] = (_, info) => {
      if (info.id === id) {
        setInfo(info);
      }
    };
    launcher.on('update:appWindow', handler);
    return () => {
      launcher.off('update:appWindow', handler);
    };
  }, []);

  return {
    info,
    close: () => {
      return launcher.close(id);
    },
    open: launcher.open,
    maximize: () => {
      return launcher.maximize(id);
    },
    minimize: () => {
      return launcher.minimize(id);
    },
    normalize: () => {
      return launcher.normalize(id);
    },
    toFront: () => {
      return launcher.toFront(id);
    },
    toBack: () => {
      return launcher.toBack(id);
    },
    setSize: ({ width, height }: { width: number | string; height: number | string }) => {
      return launcher.setSize(id, { width, height });
    },
    setPosition: ({ x, y }: { x: number; y: number }) => {
      return launcher.setPosition(id, { x, y });
    },
  };
}
