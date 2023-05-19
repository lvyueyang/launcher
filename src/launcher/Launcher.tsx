import { EventEmitter } from 'eventemitter3';
import { nanoid } from 'nanoid';
import {
  WindowItem,
  WindowOptions,
  WindowSize,
  EventTypes,
  OpenWindowItem,
  OpenList,
} from './interface';
import { IRoute } from '../router/interface';
import React from 'react';

const defaultConfig = {
  isMaximize: false,
  isMinimize: false,
};

type WindowList = WindowItem[];

export class Launcher extends EventEmitter<EventTypes> {
  windowList: WindowList = [];
  openList: OpenList = [];
  container?: HTMLElement;

  register(windowList: WindowList) {
    this.windowList = windowList;
  }

  openListChange() {
    this.emit('change:openList', this.openList);
  }

  /** 打开窗口 */
  open(key: string, options?: WindowOptions) {
    const w = this.windowList.find((i) => i.key === key);
    if (w) {
      const launcherInfo = {
        ...defaultConfig,
        ...w,
        ...options,
        id: nanoid(),
      };

      const info = {
        ...launcherInfo,
        component: React.cloneElement(w.component),
      };

      this.openList.push(info);

      this.emit('open', info);
      this.openListChange();
    }
  }

  /** 关闭窗口 */
  close(id: string) {
    const oldLen = this.openList.length;
    let oldValue: OpenWindowItem;
    this.openList = this.openList.filter((i) => {
      if (i.id !== id) {
        return true;
      } else {
        oldValue = i;
        return false;
      }
    });
    if (this.openList.length !== oldLen) {
      this.emit('close', oldValue!);
      this.openListChange();
    }
  }

  /** 最大化 */
  maximize(id: string) {
    const { isUpdated } = this.updateOpenOptions(id, {
      isMaximize: true,
      isMinimize: false,
    });
    if (isUpdated) {
      this.openListChange();
    }
  }

  /** 最小化 */
  minimize(id: string) {
    const { isUpdated } = this.updateOpenOptions(id, {
      isMinimize: true,
    });
    if (isUpdated) {
      this.openListChange();
    }
  }
  /** 正常化 */
  normalize(id: string) {
    const info = this.getInfo(id);
    if (!info) return;
    const value = {
      isMaximize: false,
      isMinimize: false,
    };

    if (info.isMinimize) {
      value.isMinimize = false;
      value.isMaximize = !!info.isMaximize;
    }

    const { isUpdated } = this.updateOpenOptions(id, {
      ...value,
    });
    if (isUpdated) {
      this.openListChange();
    }
  }
  /** 设置尺寸 */
  setSize(id: string, { width, height }: Pick<WindowSize, 'width' | 'height'>) {
    return this.updateOpenOptions(id, {
      size: {
        width,
        height,
      },
    });
  }
  /** 设置位置 */
  setPosition(id: string, { x, y }: { x: number; y: number }) {
    return this.updateOpenOptions(id, {
      position: {
        x,
        y,
      },
    });
  }

  /** 更新窗口信息 */
  updateOpenOptions(id: string, options: WindowOptions) {
    let isUpdated = false;
    let oldValue: OpenWindowItem | undefined;
    let newValue: OpenWindowItem | undefined;
    this.openList = this.openList.map((item) => {
      if (item.id === id) {
        isUpdated = true;
        oldValue = {
          ...item,
        };
        newValue = {
          ...item,
          ...options,
          size: {
            ...item.size,
            ...options?.size,
          },
        } as OpenWindowItem;
        return {
          ...newValue!,
        };
      }
      return item;
    });

    if (isUpdated) {
      this.emit('update:window', oldValue!, newValue!);
    }
    return {
      isUpdated,
      oldValue: oldValue,
      newValue: newValue,
    };
  }

  /** 获取窗口信息 */
  getInfo(id: string) {
    return this.openList.find((i) => i.id === id);
  }

  /** 至于顶层 */
  toFront(id: string) {
    let item: OpenWindowItem | undefined;
    const index = this.openList.findIndex((i) => {
      if (i.id === id) {
        item = i;
      }
      return i.id === id;
    });
    if (item && index !== this.openList.length - 1) {
      this.openList.push(item);
      this.openList.splice(index, 1);
      this.openListChange();
    }
  }
  /** 至于底层 */
  toBack(id: string) {
    let item: OpenWindowItem | undefined;
    const index = this.openList.findIndex((i) => {
      if (i.id === id) {
        item = i;
      }
      return i.id === id;
    });
    if (item && index > 0) {
      this.openList.unshift(item);
      this.openList.splice(index, 1);
      this.openListChange();
    }
  }

  setContainer(dom: HTMLElement) {
    this.container = dom;
  }

  /** 获取容器中心位置 */
  getCenter(offsetX: number = 0, offsetY: number = 0) {
    const { width, height } = this.container?.getBoundingClientRect() || {
      width: 0,
      height: 0,
    };
    return {
      x: width / 2 - offsetX,
      y: height / 2 - offsetY,
    };
  }

  /** 获取当前路由 */
  getRouter(id: string) {
    return this.getInfo(id)?.route;
  }
  /** 设置当前路由 */
  setRoute(id: string, route: Omit<IRoute, 'component'>) {
    const { isUpdated } = this.updateOpenOptions(id, {
      route,
    });
    if (isUpdated) {
      this.openListChange();
    }
  }

  /** 获取窗口自定义数据 */
  getData(id: string) {
    return this.getInfo(id)?.data;
  }
  /** 设置窗口自定义数据 */
  setData(id: string, data: Record<string, any>) {
    const { isUpdated } = this.updateOpenOptions(id, {
      data,
    });
    if (isUpdated) {
      this.openListChange();
    }
  }

  /** 将打开的窗口转为 json */
  toJSON() {
    return JSON.stringify(
      this.openList.map((item) => {
        const i = {
          ...item,
          component: void 0,
        };
        delete i.component;
        return i;
      }),
    );
  }

  /** 将 json 导入 */
  fromJSON(json: string) {
    this.openList = JSON.parse(json).map((item: Omit<OpenWindowItem, 'component'>) => {
      const i = {
        ...item,
        component: this.windowList.find((a) => a.key === item.key)?.component,
      };
      delete i.component;
      return i;
    });
  }
}
