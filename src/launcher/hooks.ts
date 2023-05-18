import { useContext, useEffect, useState } from 'react';
import { EventTypes, WindowItem } from './interface';
import { LauncherWindowContext } from './context';
import { launcher } from './WindowLauncher';

export function useCurrentWindow() {
  const { windowId: id } = useContext(LauncherWindowContext);
  const [info, setInfo] = useState<WindowItem>(launcher.getInfo(id)!);
  useEffect(() => {
    const handler: EventTypes['update:window'] = (_, info) => {
      if (info.id === id) {
        setInfo(info);
      }
    };
    launcher.on('update:window', handler);
    return () => {
      launcher.off('update:window', handler);
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
