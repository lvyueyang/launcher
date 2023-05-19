/// <reference types="react" />
export interface IRoute {
    path: string;
    component: React.ReactElement;
    meta?: Record<string, any>;
    state?: RouteState;
}
export interface RouterEventTypes {
    change: (route?: IRoute) => void;
}
export type RouteState = {
    [key: string | number]: any;
};
export interface NavigateOption {
    path: string;
    state?: RouteState;
    replace?: boolean;
}
