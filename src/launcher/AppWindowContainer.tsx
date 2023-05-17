import { launcher, useAppWindow } from '@/launcher';
import { Rnd, Props as RndProps } from 'react-rnd';
import { useEffect, useRef } from 'react';

interface AppWindowProps
  extends Omit<RndProps, 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight'> {}

export function AppWindowContainer({
  children,
  ...rndProps
}: React.PropsWithChildren<AppWindowProps>) {
  const { info, setSize, setPosition } = useAppWindow();
  const rndRef = useRef<Rnd>();
  const width = info.size?.width || 600;
  const height = info.size?.height || 300;

  const getDefault = () => {
    return info.position || launcher.getCenter(Number(width) / 2, Number(height) / 2);
  };

  useEffect(() => {
    if (info.isMaximize) {
      rndRef.current?.updateSize({ width: '100%', height: '100%' });
      rndRef.current?.updatePosition({ x: 0, y: 0 });
    } else {
      rndRef.current?.updateSize({ width, height });
      rndRef.current?.updatePosition(getDefault());
    }
  }, [info.isMaximize]);

  const style = info.isMinimize ? { display: 'none' } : undefined;

  return (
    <Rnd
      {...rndProps}
      ref={(e) => {
        if (e) {
          rndRef.current = e;
        }
        if (rndProps.ref) {
          rndProps.ref.current = e;
        }
      }}
      default={{ ...getDefault(), width, height, ...rndProps.default }}
      minWidth={info.size?.minWidth}
      minHeight={info.size?.minHeight}
      maxWidth={info.size?.maxWidth}
      maxHeight={info.size?.maxHeight}
      enableResizing={!info.isMaximize || rndProps.enableResizing}
      disableDragging={info.isMaximize || rndProps.disableDragging}
      onResizeStop={(...args) => {
        const [, , ref] = args;
        setSize({ width: ref.style.width, height: ref.style.height });
        rndProps.onResizeStop?.(...args);
      }}
      onDragStop={(...args) => {
        const [, position] = args;
        setPosition(position);
        rndProps.onDragStop?.(...args);
      }}
      style={{ ...rndProps.style, ...style }}
    >
      {children}
    </Rnd>
  );
}
