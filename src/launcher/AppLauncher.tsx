import React, { Suspense } from 'react';
import { AppWindow } from './AppWindow';
import { Launcher } from './Launcher';
import { AppItem, OpenList } from './interface';

declare global {
  interface Window {
    launcher: Launcher;
  }
}

if (!window.launcher) {
  window.launcher = new Launcher();
}

export const launcher = window.launcher;

interface AppLauncherProps extends React.HTMLAttributes<HTMLDivElement> {
  appList: AppItem[];
}
interface AppLauncherState {
  openList: OpenList;
}

export class AppLauncher extends React.Component<AppLauncherProps, AppLauncherState> {
  state: AppLauncherState = {
    openList: [],
  };

  componentDidMount(): void {
    launcher.register(this.props.appList);
    launcher.on('openListChange', (list) => {
      this.setState({
        openList: list,
      });
    });
  }

  render() {
    const { appList, ...divProps } = this.props;
    return (
      <div
        {...divProps}
        style={{ position: 'relative', overflow: 'hidden', ...divProps.style }}
        ref={(e) => {
          if (e) {
            launcher.setContainer(e);
          }
        }}
      >
        {this.state.openList.map((item) => {
          const component = appList.find((i) => i.key === item.key)?.component as React.ReactNode;
          return (
            <AppWindow key={item.id} appWindowId={item.id}>
              <Suspense>{component}</Suspense>
            </AppWindow>
          );
        })}
      </div>
    );
  }
}
