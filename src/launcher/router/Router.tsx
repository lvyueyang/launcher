import EventEmitter from 'eventemitter3';
import { IRoute, NavigateOption, RouteState, RouterEventTypes } from './interface';
import React from 'react';

export class Router extends EventEmitter<RouterEventTypes> {
  active: number = -1;
  history: IRoute[] = [];

  constructor(public routers: IRoute[]) {
    super();
    const home = this.getHomeRoute();
    this.push(home.path);
  }

  private getHomeRoute() {
    return this.findRoute('/') || this.routers[0];
  }

  private findRoute(path: string) {
    return this.routers.find((i) => i.path === path);
  }

  private navigate({ path, state, replace = false }: NavigateOption) {
    const active = this.active;
    const len = this.history.length;
    const currentRoute = this.findRoute(path);
    if (!currentRoute) {
      console.error(`not found route: ${path}`);
      return;
    }
    const k = replace ? 0 : 1;
    this.history.splice(active + k, len - active);
    const newState = {
      ...currentRoute.state,
      ...state,
    };
    const h = {
      ...currentRoute,
      state: newState,
      component: React.cloneElement(currentRoute.component, {
        routeInfo: {
          ...currentRoute,
          state: newState,
          component: void 0,
        },
      }),
    };

    this.history.push(h);
    this.active = this.history.length - 1;
    this.onChange();
  }

  push = (path: string, state?: RouteState) => {
    return this.navigate({ path, state });
  };
  replace = (path: string, state?: RouteState) => {
    return this.navigate({ path, state, replace: true });
  };
  back = () => {
    if (this.active > 0) {
      this.active -= 1;
      this.onChange();
    }
  };
  go = (index = 1) => {
    const value = this.active + index;
    if (value > 0 && value < this.history.length) {
      this.active = value;
      this.onChange();
    }
  };

  getCurrent() {
    const current = this.history[this.active];
    return current;
  }

  private onChange() {
    this.emit('change', this.getCurrent());
  }
}
