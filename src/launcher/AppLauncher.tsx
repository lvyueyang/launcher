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

interface AppLauncherProps {
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
    return (
      <>
        {this.state.openList.map((item) => {
          const component = this.props.appList.find((i) => i.key === item.key)
            ?.component as React.ReactNode;
          return (
            <AppWindow key={item.id} appWindowId={item.id}>
              <Suspense>{component}</Suspense>
            </AppWindow>
          );
        })}
      </>
    );
  }
}
