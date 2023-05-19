import React from 'react';
import { WindowItemView } from './WindowItem';
import { Launcher } from './Launcher';
import { WindowItem, OpenList } from './interface';
export declare const launcher: Launcher;
interface WindowLauncherProps extends React.HTMLAttributes<HTMLDivElement> {
    windowList: WindowItem[];
}
interface WindowLauncherState {
    openList: OpenList;
}
export declare class WindowLauncher extends React.Component<WindowLauncherProps, WindowLauncherState> {
    Item: typeof WindowItemView;
    state: WindowLauncherState;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
