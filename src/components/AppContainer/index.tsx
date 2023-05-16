import { launcher, useAppWindow } from '@/launcher';
import { Rnd } from 'react-rnd';
import styles from './index.module.less';
import { createRef, useEffect, useRef } from 'react';
import { normalize } from 'path';

interface AppWindowProps {}
export function AppContainer({ children }: React.PropsWithChildren<AppWindowProps>) {
  const { info, close, minimize, maximize, normalize, setSize, setPosition, toFront } =
    useAppWindow();
  console.log('info: ', info);
  const rndRef = createRef<Rnd>();
  const width = info.size?.width || 600;
  const height = info.size?.height || 300;

  useEffect(() => {
    console.log('info.isMaximize: ', rndRef.current, info.isMaximize);
    if (info.isMaximize) {
      rndRef.current?.updateSize({ width: '100%', height: '100%' });
      rndRef.current?.updatePosition({ x: 0, y: 0 });
    } else {
      rndRef.current?.updateSize({ width, height });
      rndRef.current?.updatePosition(
        info.position || launcher.getCenter(Number(width) / 2, Number(height) / 2),
      );
    }
  }, [info.isMaximize]);

  return (
    <Rnd
      ref={rndRef}
      minWidth={info.size?.minWidth}
      minHeight={info.size?.minHeight}
      maxWidth={info.size?.maxWidth}
      maxHeight={info.size?.maxHeight}
      className={styles.container}
      cancel={`.${styles.body}`}
      enableResizing={!info.isMaximize}
      disableDragging={info.isMaximize}
      onResizeStop={(e, dir, ref) => {
        setSize({ width: ref.style.width, height: ref.style.height });
      }}
      onDragStop={(e, position) => {
        console.log('onDragStop: ', position);
        setPosition(position);
      }}
      style={info.isMinimize ? { display: 'none' } : undefined}
    >
      <div
        className={styles.headerBar}
        onMouseDown={() => {
          toFront();
        }}
      >
        <div className={styles.title}>{info?.title}</div>
        <div
          className={styles.operate}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <span
            onClick={() => {
              minimize();
            }}
          >
            最小化
          </span>
          {info.isMaximize ? (
            <span
              onClick={() => {
                normalize();
              }}
            >
              还原
            </span>
          ) : (
            <span
              onClick={() => {
                maximize();
              }}
            >
              最大化
            </span>
          )}

          <span onClick={close}>关闭</span>
        </div>
      </div>
      <div
        className={styles.body}
        onMouseDown={() => {
          toFront();
        }}
      >
        {children}
      </div>
    </Rnd>
  );
}
