import React from 'react';
import { WindowItem, WindowLauncher, launcher } from '../src';

import { Clock } from './apps/Clock';
import { AppDock } from './components/AppDock';
import { RouterDemo } from './apps/routerDemo';
import { AppContainer } from './components/AppContainer';

const Calendar = React.lazy(() => import('./apps/Calendar'));

const APP_LIST: WindowItem[] = [
  {
    title: '日历',
    key: 'calendar',
    size: {
      width: 600,
      height: 300,
      minWidth: 200,
      minHeight: 200,
    },
    component: (
      <AppContainer>
        <React.Suspense fallback={<div>加载中...</div>}>
          <Calendar />
        </React.Suspense>
      </AppContainer>
    ),
  },
  {
    title: '时钟',
    key: 'clock',
    component: (
      <AppContainer>
        <Clock />
      </AppContainer>
    ),
    size: {
      width: 200,
      height: 200,
    },
  },
  {
    title: '窗口内路由',
    key: 'router-demo',
    size: {
      width: 600,
      height: 400,
    },
    component: (
      <AppContainer>
        <React.Suspense fallback={<div>加载中...</div>}>
          <RouterDemo />
        </React.Suspense>
      </AppContainer>
    ),
  },
];

export default function Root() {
  return (
    <div>
      <div style={{ display: 'flex', gap: 10, paddingBottom: 10 }}>
        {APP_LIST.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              launcher.open(item.key);
            }}
          >
            打开 {item.title}
          </button>
        ))}
      </div>

      {/* 桌面 */}
      <WindowLauncher windowList={APP_LIST} style={{ height: 700, background: '#eee' }} />

      {/* 已打开的窗口 */}
      <div>
        <AppDock />
      </div>
    </div>
  );
}
