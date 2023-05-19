import { Component } from 'react';
import { Router } from './Router';
import { IRoute } from './interface';
interface LauncherRouterContextValue {
    push: Router['push'];
    replace: Router['replace'];
    back: Router['back'];
    go: Router['go'];
    route: IRoute;
}
interface LauncherRouterProps {
    routers: IRoute[];
    onInit?: (router: Router) => void;
}
export declare class LauncherRouter extends Component<LauncherRouterProps> {
    windowId: string;
    router: Router;
    state: {
        current: IRoute;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
export declare function useHistory(): LauncherRouterContextValue;
export {};
