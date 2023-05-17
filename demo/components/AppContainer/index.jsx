import { useAppWindow } from '@/launcher';
import styles from './index.module.less';
import React from 'react';
import { AppWindowContainer } from '../../../src';

export function AppContainer({ children }) {
  const { info, close, minimize, maximize, normalize, toFront } = useAppWindow();

  return (
    <AppWindowContainer
      className={styles.container}
      onMouseDown={() => {
        toFront();
      }}
    >
      <div className={styles.headerBar}>
        <div className={styles.title}>{info?.title}</div>
        <div className={styles.operate}>
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
    </AppWindowContainer>
  );
}
