import EventEmitter from 'eventemitter3';
import { IRoute, RouterEventTypes } from './interface';

export class Router extends EventEmitter<RouterEventTypes> {
  active: number = 0;
  history: string[] = [];

  constructor(public routers: IRoute[]) {
    super();
    this.history.push(this.getHomeRoute().path);
  }

  register(routers: IRoute[]) {
    this.routers = routers;
  }

  private getHomeRoute() {
    return this.routers.find((i) => i.path === '/') || this.routers[0];
  }

  push = (path: string) => {
    const active = this.active;
    const len = this.history.length;

    this.history.splice(active + 1, len - active);
    this.history.push(path);
    this.active = this.history.length - 1;
    this.onChange();
  };
  replace = (path: string) => {
    const active = this.active;
    const len = this.history.length;

    this.history.splice(active, len - active);
    this.history.push(path);
    this.active = this.history.length - 1;
    this.onChange();
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
    const path = this.history[this.active];
    const current = this.routers.find((i) => i.path === path);
    if (current) return current;
    return this.routers[0];
  }

  private onChange() {
    this.emit('change', this.getCurrent());
  }
}
