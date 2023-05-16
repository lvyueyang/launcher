import { AppLauncher, launcher } from './launcher';

import { Calendar } from './apps/Calendar';
import { Clock } from './apps/Clock';
import { AppDock } from './components/AppDock';

export default function Root() {
  return (
    <div>
      <div>
        <button
          onClick={() => {
            launcher.open('calendar');
          }}
        >
          打开日历
        </button>
        <button
          onClick={() => {
            launcher.open('clock');
          }}
        >
          打开时钟
        </button>
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
        <AppLauncher
          appList={[
            {
              title: '日历',
              key: 'calendar',
              component: Calendar,
            },
            {
              title: '时钟',
              key: 'clock',
              component: Clock,
            },
          ]}
        />
      </div>

      {/* 任务栏 */}
      <div>
        <AppDock />
      </div>
    </div>
  );
}
