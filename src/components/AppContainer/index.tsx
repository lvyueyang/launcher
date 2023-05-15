import { useAppWindow } from '@/launcher';
import { Rnd } from 'react-rnd';
import styles from './index.module.less';

interface AppWindowProps {}
export function AppContainer({ children }: React.PropsWithChildren<AppWindowProps>) {
  const { info, close, minimize, maximize, setSize, setPosition, toFront } = useAppWindow();
  console.log('info: ', info);

  return (
    <Rnd
      size={{ width: info.size?.width || 300, height: info.size?.height || 300 }}
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
        setPosition(position);
      }}
    >
      <div className={styles.headerBar}>
        <div className={styles.title}>{info?.title}</div>
        <div className={styles.operate}>
          <span onClick={minimize}>最小化</span>
          <span onClick={maximize}>最大化</span>
          <span onClick={close}>关闭</span>
        </div>
      </div>
      <div className={styles.body} style={info.isMinimize ? { display: 'none' } : undefined}>
        {children}
      </div>
    </Rnd>
  );
}
