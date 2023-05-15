import { EventEmitter } from 'eventemitter3';
import { nanoid } from 'nanoid';
import { AppItem, AppOptions, AppSize, EventTypes, OpenAppItem, OpenList } from './interface';

const defaultConfig = {
  isMaximize: false,
  isMinimize: false,
};

type AppList = AppItem[];

export class Launcher extends EventEmitter<EventTypes> {
  appList: AppList = [];
  openList: OpenList = [];

  register(appList: AppList) {
    this.appList = appList;
  }

  /** 打开窗口 */
  open(key: string, options?: AppOptions) {
    const app = this.appList.find((i) => i.key === key);
    if (app) {
      const info = {
        ...defaultConfig,
        ...app,
        ...options,
        id: nanoid(),
      };
      this.openList.push(info);

      this.emit('open', info);
      this.emit('openChange', this.openList);
    }
  }

  /** 关闭窗口 */
  close(id: string) {
    const oldLen = this.openList.length;
    let oldValue: OpenAppItem;
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
      this.emit('openChange', this.openList);
    }
  }

  /** 最大化 */
  maximize(id: string) {
    const { isUpdated, oldValue, newValue } = this.updateOpenOptions(id, {
      isMaximize: true,
      isMinimize: false,
    });
    if (isUpdated) {
      this.emit('update:appMaximize', oldValue!, newValue!);
    }
  }

  /** 最小化 */
  minimize(id: string) {
    const { isUpdated, oldValue, newValue } = this.updateOpenOptions(id, {
      isMaximize: false,
      isMinimize: true,
    });
    if (isUpdated) {
      this.emit('update:appMaximize', oldValue!, newValue!);
    }
  }
  /** 设置尺寸 */
  setSize(id: string, { width, height }: Pick<AppSize, 'width' | 'height'>) {
    const { isUpdated, oldValue, newValue } = this.updateOpenOptions(id, {
      size: {
        width,
        height,
      },
    });
    if (isUpdated) {
      this.emit('update:appWindow', oldValue!, newValue!);
    }
  }
  /** 设置位置 */
  setPosition(id: string, { x, y }: { x: number; y: number }) {
    const { isUpdated, oldValue, newValue } = this.updateOpenOptions(id, {
      position: {
        x,
        y,
      },
    });
    if (isUpdated) {
      this.emit('update:appWindow', oldValue!, newValue!);
    }
  }

  /** 更新窗口信息 */
  updateOpenOptions(id: string, options: AppOptions) {
    let isUpdated = false;
    let oldValue: OpenAppItem | undefined;
    let newValue: OpenAppItem | undefined;
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
        };
        return {
          ...newValue,
        };
      }
      return item;
    });

    if (isUpdated) {
      this.emit('update:appWindow', oldValue!, newValue!);
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
    let item: OpenAppItem | undefined;
    const index = this.openList.findIndex((i) => {
      if (i.id === id) {
        item = i;
      }
      return i.id === id;
    });
    if (item && index !== this.openList.length - 1) {
      this.openList.push(item);
      this.openList.splice(index, 1);
    }
  }
  /** 至于底层 */
  toBack(id: string) {
    let item: OpenAppItem | undefined;
    const index = this.openList.findIndex((i) => {
      if (i.id === id) {
        item = i;
      }
      return i.id === id;
    });
    if (item && index > 0) {
      this.openList.unshift(item);
      this.openList.splice(index, 1);
    }
  }
}
