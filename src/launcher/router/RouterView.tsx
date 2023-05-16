import { Component, useRef, createContext, useContext } from 'react';
import { Router } from './Router';
import { IRoute } from './interface';
import { LauncherContext, LauncherWindowContext } from '../context';
import { launcher } from '../AppLauncher';

interface LauncherRouterContextValue {
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  go: (index?: number) => void;
}
const LauncherRouterContext = createContext<LauncherRouterContextValue>(
  {} as LauncherRouterContextValue,
);

interface LauncherRouterProps {
  routers: IRoute[];
  onInit?: (router: Router) => void;
}

export class LauncherRouter extends Component<LauncherRouterProps> {
  appWindowId: string = '';
  router = new Router(this.props.routers);
  state = {
    current: this.router.getCurrent(),
  };

  componentDidMount(): void {
    this.props.onInit?.(this.router);
    this.router.on('change', (route) => {
      this.setState({ current: route });
      if (route) {
        launcher.setRoute(this.appWindowId, route);
      }
    });
    const info = launcher.getInfo(this.appWindowId);
    if (info?.route) {
      this.router.push(info.route.path);
    }
  }

  render() {
    const Comp = this.state.current?.component;
    return (
      <LauncherWindowContext.Consumer>
        {({ appWindowId }) => {
          this.appWindowId = appWindowId;
          return (
            <LauncherRouterContext.Provider
              value={{
                push: this.router.push,
                replace: this.router.replace,
                back: this.router.back,
                go: this.router.go,
              }}
            >
              {Comp ? <Comp /> : null}
            </LauncherRouterContext.Provider>
          );
        }}
      </LauncherWindowContext.Consumer>
    );
  }
}

export function useHistory() {
  const router = useContext(LauncherRouterContext);
  return {
    push: router.push,
    replace: router.replace,
    back: router.back,
    go: router.go,
  };
}
