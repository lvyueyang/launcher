import { EventEmitter } from 'eventemitter3';
import { WindowItem, WindowOptions, WindowSize, EventTypes, OpenWindowItem, OpenList } from './interface';
import { IRoute } from '../router/interface';
type WindowList = WindowItem[];
export declare class Launcher extends EventEmitter<EventTypes> {
    windowList: WindowList;
    openList: OpenList;
    container?: HTMLElement;
    register(windowList: WindowList): void;
    openListChange(): void;
    /** 打开窗口 */
    open(key: string, options?: WindowOptions): void;
    /** 关闭窗口 */
    close(id: string): void;
    /** 最大化 */
    maximize(id: string): void;
    /** 最小化 */
    minimize(id: string): void;
    /** 正常化 */
    normalize(id: string): void;
    /** 设置尺寸 */
    setSize(id: string, { width, height }: Pick<WindowSize, 'width' | 'height'>): {
        isUpdated: boolean;
        oldValue: OpenWindowItem | undefined;
        newValue: OpenWindowItem | undefined;
    };
    /** 设置位置 */
    setPosition(id: string, { x, y }: {
        x: number;
        y: number;
    }): {
        isUpdated: boolean;
        oldValue: OpenWindowItem | undefined;
        newValue: OpenWindowItem | undefined;
    };
    /** 更新窗口信息 */
    updateOpenOptions(id: string, options: WindowOptions): {
        isUpdated: boolean;
        oldValue: OpenWindowItem | undefined;
        newValue: OpenWindowItem | undefined;
    };
    /** 获取窗口信息 */
    getInfo(id: string): OpenWindowItem | undefined;
    /** 至于顶层 */
    toFront(id: string): void;
    /** 至于底层 */
    toBack(id: string): void;
    setContainer(dom: HTMLElement): void;
    /** 获取容器中心位置 */
    getCenter(offsetX?: number, offsetY?: number): {
        x: number;
        y: number;
    };
    /** 获取当前路由 */
    getRouter(id: string): Omit<IRoute, "component"> | undefined;
    /** 设置当前路由 */
    setRoute(id: string, route: Omit<IRoute, 'component'>): void;
    /** 获取窗口自定义数据 */
    getData(id: string): Record<string, any> | undefined;
    /** 设置窗口自定义数据 */
    setData(id: string, data: Record<string, any>): void;
    /** 将打开的窗口转为 json */
    toJSON(): string;
    /** 将 json 导入 */
    fromJSON(json: string): void;
}
export {};
