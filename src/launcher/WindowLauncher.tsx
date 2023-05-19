import React, { Suspense } from 'react';
import { WindowItemView } from './WindowItem';
import { Launcher } from './Launcher';
import { WindowItem, OpenList } from './interface';

// declare global {
//   interface Window {
//     launcher: Launcher;
//   }
// }

// if (!window.launcher) {
//   window.launcher = new Launcher();
// }

// export const launcher = window.launcher;
// console.log('launcher');

export const launcher = new Launcher();

interface WindowLauncherProps extends React.HTMLAttributes<HTMLDivElement> {
  windowList: WindowItem[];
}
interface WindowLauncherState {
  openList: OpenList;
}

export class WindowLauncher extends React.Component<WindowLauncherProps, WindowLauncherState> {
  Item = WindowItemView;

  state: WindowLauncherState = {
    openList: [],
  };

  componentDidMount(): void {
    launcher.register(this.props.windowList);
    launcher.on('change:openList', (list) => {
      this.setState({
        openList: list,
      });
    });
  }

  render() {
    const { windowList, ...divProps } = this.props;
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
        {this.props.children}
        {this.state.openList.map((item) => {
          const component = windowList.find((i) => i.key === item.key)
            ?.component as React.ReactNode;
          return (
            <WindowItemView key={item.id} windowId={item.id}>
              <Suspense>{component}</Suspense>
            </WindowItemView>
          );
        })}
      </div>
    );
  }
}
