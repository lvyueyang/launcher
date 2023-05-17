import { AppLauncher, launcher } from './launcher';

import { Clock } from './apps/Clock';
import { AppDock } from './components/AppDock';
import { AppItem } from './launcher/interface';
import { RouterDemo } from './apps/routerDemo';
import React from 'react';

const Calendar = React.lazy(() => import('./apps/Calendar'));

const APP_LIST: AppItem[] = [
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
      <React.Suspense fallback={<div>加载中...</div>}>
        <Calendar />
      </React.Suspense>
    ),
  },
  {
    title: '时钟',
    key: 'clock',
    component: <Clock />,
    size: {
      width: 200,
      height: 200,
    },
  },
  {
    title: '窗口内路由',
    key: 'router-demo',
    component: <RouterDemo />,
    size: {
      width: 400,
      height: 200,
    },
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
      <div
        style={{ position: 'relative', height: 700, background: '#f7f7f7', overflow: 'hidden' }}
        ref={(e) => {
          if (e) {
            launcher.setContainer(e);
          }
        }}
      >
        <AppLauncher appList={APP_LIST} />
      </div>

      {/* 任务栏 */}
      <div>
        <AppDock />
      </div>
    </div>
  );
}
