import { IRoute } from '../router/interface';

export interface WindowSize {
  width?: number | string;
  height?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
}

/** 窗口信息 */
export interface WindowItem {
  /** 应用标题 */
  title: string;
  /** 唯一名称 */
  key: string;
  /** 窗口ID */
  id?: string;
  /** 尺寸 */
  size?: WindowSize;
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

export interface OpenWindowItem extends Omit<WindowItem, 'id' | 'component'> {
  id: string;
  component: React.ReactElement;
}

export type OpenList = OpenWindowItem[];

export interface Launcher {
  open: (key: string) => void;
  getInfo: (key: string) => void;
}

export type WindowOptions = Partial<Omit<WindowItem, 'key' | 'id'>>;

export interface EventTypes {
  open: (value: OpenWindowItem) => void;
  close: (value: OpenWindowItem) => void;
  'change:openList': (openList: OpenWindowItem[]) => void;
  'update:window': (oldValue: OpenWindowItem, newValue: OpenWindowItem) => void;
}
