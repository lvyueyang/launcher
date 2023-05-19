import EventEmitter from 'eventemitter3';
import { IRoute, RouteState, RouterEventTypes } from './interface';
export declare class Router extends EventEmitter<RouterEventTypes> {
    routers: IRoute[];
    active: number;
    history: IRoute[];
    constructor(routers: IRoute[]);
    private getHomeRoute;
    private findRoute;
    private navigate;
    push: (path: string, state?: RouteState) => void;
    replace: (path: string, state?: RouteState) => void;
    back: () => void;
    go: (index?: number) => void;
    getCurrent(): IRoute;
    private onChange;
}
