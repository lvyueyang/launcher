import { Component, useRef, createContext, useContext } from 'react';
import { Router } from './Router';
import { IRoute } from './interface';
import { LauncherWindowContext } from '../launcher/context';
import { launcher } from '../launcher/AppLauncher';

interface LauncherRouterContextValue {
  push: Router['push'];
  replace: Router['replace'];
  back: Router['back'];
  go: Router['go'];
  route: IRoute;
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
        const r = {
          ...route,
          component: void 0,
        };
        launcher.setRoute(this.appWindowId, r);
      }
    });
    const info = launcher.getInfo(this.appWindowId);
    if (info?.route) {
      this.router.push(info.route.path);
    }
  }

  render() {
    const component = this.state.current?.component;
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
                route: this.router.getCurrent(),
              }}
            >
              {component}
            </LauncherRouterContext.Provider>
          );
        }}
      </LauncherWindowContext.Consumer>
    );
  }
}

export function useHistory() {
  const router = useContext(LauncherRouterContext);
  return router;
}
