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
  component: React.FC<any>;
}

export type OpenAppItem = Omit<AppItem, 'id'> & { id: string };

export type OpenList = OpenAppItem[];

export interface Launcher {
  open: (key: string) => void;
  getInfo: (key: string) => void;
}

export type AppOptions = Partial<Omit<AppItem, 'key' | 'id'>>;

export interface EventTypes {
  open: (value: OpenAppItem) => void;
  close: (value: OpenAppItem) => void;
  openChange: (openList: OpenAppItem[]) => void;
  'update:appWindow': (oldValue: OpenAppItem, newValue: OpenAppItem) => void;
  'update:appMaximize': (oldValue: OpenAppItem, newValue: OpenAppItem) => void;
  'update:appMinimize': (oldValue: OpenAppItem, newValue: OpenAppItem) => void;
}
