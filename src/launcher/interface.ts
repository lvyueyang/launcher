import { IRoute } from './router/interface';

export interface AppSize {
  width?: number | string;
  height?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
}

/** 应用信息 */
export interface AppItem {
  /** 应用标题 */
  title: string;
  /** 唯一名称 */
  key: string;
  /** 窗口ID */
  id?: string;
  /** 尺寸 */
  size?: AppSize;
  /** 位置 */
  position?: {
    x: number;
    y: number;
  };
  /** 是否为最大化 */
  isMaximize?: boolean;
  /** 是否为最小化 */
  isMinimize?: boolean;
  /** 关联组件 */
  component: React.ReactElement;
  /** 当前路由 */
  route?: Omit<IRoute, 'component'>;
  /** */
  data?: Record<string, any>;
}

export interface OpenAppItem extends Omit<AppItem, 'id' | 'component'> {
  id: string;
  component: React.ReactElement;
}

export type OpenList = OpenAppItem[];

export interface Launcher {
  open: (key: string) => void;
  getInfo: (key: string) => void;
}

export type AppOptions = Partial<Omit<AppItem, 'key' | 'id'>>;

export interface EventTypes {
  open: (value: OpenAppItem) => void;
  close: (value: OpenAppItem) => void;
  openListChange: (openList: OpenAppItem[]) => void;
  'update:appWindow': (oldValue: OpenAppItem, newValue: OpenAppItem) => void;
}
