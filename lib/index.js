(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react/jsx-runtime'), require('react'), require('eventemitter3'), require('nanoid'), require('react-rnd')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react/jsx-runtime', 'react', 'eventemitter3', 'nanoid', 'react-rnd'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.reactWindowLauncher = {}, global.jsxRuntime, global.React, global.EventEmitter, global.nanoid, global.reactRnd));
})(this, (function (exports, jsxRuntime, React, EventEmitter, nanoid, reactRnd) { 'use strict';

    const LauncherWindowContext = React.createContext({
        windowId: '',
    });

    function WindowItemView({ windowId, children }) {
        return (jsxRuntime.jsx(LauncherWindowContext.Provider, { value: { windowId }, children: children }));
    }

    const defaultConfig = {
        isMaximize: false,
        isMinimize: false,
    };
    class Launcher extends EventEmitter.EventEmitter {
        windowList = [];
        openList = [];
        container;
        register(windowList) {
            this.windowList = windowList;
        }
        openListChange() {
            this.emit('change:openList', this.openList);
        }
        /** 打开窗口 */
        open(key, options) {
            const w = this.windowList.find((i) => i.key === key);
            if (w) {
                const launcherInfo = {
                    ...defaultConfig,
                    ...w,
                    ...options,
                    id: nanoid.nanoid(),
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
        close(id) {
            const oldLen = this.openList.length;
            let oldValue;
            this.openList = this.openList.filter((i) => {
                if (i.id !== id) {
                    return true;
                }
                else {
                    oldValue = i;
                    return false;
                }
            });
            if (this.openList.length !== oldLen) {
                this.emit('close', oldValue);
                this.openListChange();
            }
        }
        /** 最大化 */
        maximize(id) {
            const { isUpdated } = this.updateOpenOptions(id, {
                isMaximize: true,
                isMinimize: false,
            });
            if (isUpdated) {
                this.openListChange();
            }
        }
        /** 最小化 */
        minimize(id) {
            const { isUpdated } = this.updateOpenOptions(id, {
                isMinimize: true,
            });
            if (isUpdated) {
                this.openListChange();
            }
        }
        /** 正常化 */
        normalize(id) {
            const info = this.getInfo(id);
            if (!info)
                return;
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
        setSize(id, { width, height }) {
            return this.updateOpenOptions(id, {
                size: {
                    width,
                    height,
                },
            });
        }
        /** 设置位置 */
        setPosition(id, { x, y }) {
            return this.updateOpenOptions(id, {
                position: {
                    x,
                    y,
                },
            });
        }
        /** 更新窗口信息 */
        updateOpenOptions(id, options) {
            let isUpdated = false;
            let oldValue;
            let newValue;
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
                this.emit('update:window', oldValue, newValue);
            }
            return {
                isUpdated,
                oldValue: oldValue,
                newValue: newValue,
            };
        }
        /** 获取窗口信息 */
        getInfo(id) {
            return this.openList.find((i) => i.id === id);
        }
        /** 至于顶层 */
        toFront(id) {
            let item;
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
        toBack(id) {
            let item;
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
        setContainer(dom) {
            this.container = dom;
        }
        /** 获取容器中心位置 */
        getCenter(offsetX = 0, offsetY = 0) {
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
        getRouter(id) {
            return this.getInfo(id)?.route;
        }
        /** 设置当前路由 */
        setRoute(id, route) {
            const { isUpdated } = this.updateOpenOptions(id, {
                route,
            });
            if (isUpdated) {
                this.openListChange();
            }
        }
        /** 获取窗口自定义数据 */
        getData(id) {
            return this.getInfo(id)?.data;
        }
        /** 设置窗口自定义数据 */
        setData(id, data) {
            const { isUpdated } = this.updateOpenOptions(id, {
                data,
            });
            if (isUpdated) {
                this.openListChange();
            }
        }
        /** 将打开的窗口转为 json */
        toJSON() {
            return JSON.stringify(this.openList.map((item) => {
                const i = {
                    ...item,
                    component: void 0,
                };
                delete i.component;
                return i;
            }));
        }
        /** 将 json 导入 */
        fromJSON(json) {
            this.openList = JSON.parse(json).map((item) => {
                const i = {
                    ...item,
                    component: this.windowList.find((a) => a.key === item.key)?.component,
                };
                delete i.component;
                return i;
            });
        }
    }

    // declare global {
    //   interface Window {
    //     launcher: Launcher;
    //   }
    // }
    // if (!window.launcher) {
    //   window.launcher = new Launcher();
    // }
    // export const launcher = window.launcher;
    // console.log('launcher');
    const launcher = new Launcher();
    class WindowLauncher extends React.Component {
        Item = WindowItemView;
        state = {
            openList: [],
        };
        componentDidMount() {
            launcher.register(this.props.windowList);
            launcher.on('change:openList', (list) => {
                this.setState({
                    openList: list,
                });
            });
        }
        render() {
            const { windowList, ...divProps } = this.props;
            return (jsxRuntime.jsx("div", { ...divProps, style: { position: 'relative', overflow: 'hidden', ...divProps.style }, ref: (e) => {
                    if (e) {
                        launcher.setContainer(e);
                    }
                }, children: this.state.openList.map((item) => {
                    const component = windowList.find((i) => i.key === item.key)
                        ?.component;
                    return (jsxRuntime.jsx(WindowItemView, { windowId: item.id, children: jsxRuntime.jsx(React.Suspense, { children: component }) }, item.id));
                }) }));
        }
    }

    function useCurrentWindow() {
        const { windowId: id } = React.useContext(LauncherWindowContext);
        const [info, setInfo] = React.useState(launcher.getInfo(id));
        React.useEffect(() => {
            const handler = (_, info) => {
                if (info.id === id) {
                    setInfo(info);
                }
            };
            launcher.on('update:window', handler);
            return () => {
                launcher.off('update:window', handler);
            };
        }, []);
        return {
            info,
            close: () => {
                return launcher.close(id);
            },
            open: launcher.open,
            maximize: () => {
                return launcher.maximize(id);
            },
            minimize: () => {
                return launcher.minimize(id);
            },
            normalize: () => {
                return launcher.normalize(id);
            },
            toFront: () => {
                return launcher.toFront(id);
            },
            toBack: () => {
                return launcher.toBack(id);
            },
            setSize: ({ width, height }) => {
                return launcher.setSize(id, { width, height });
            },
            setPosition: ({ x, y }) => {
                return launcher.setPosition(id, { x, y });
            },
        };
    }

    function WindowContainer({ children, ...rndProps }) {
        const { info, setSize, setPosition } = useCurrentWindow();
        const rndRef = React.useRef();
        const width = info.size?.width || 600;
        const height = info.size?.height || 300;
        const getDefault = () => {
            return info.position || launcher.getCenter(Number(width) / 2, Number(height) / 2);
        };
        React.useEffect(() => {
            if (info.isMaximize) {
                rndRef.current?.updateSize({ width: '100%', height: '100%' });
                rndRef.current?.updatePosition({ x: 0, y: 0 });
            }
            else {
                rndRef.current?.updateSize({ width, height });
                rndRef.current?.updatePosition(getDefault());
            }
        }, [info.isMaximize]);
        const style = info.isMinimize ? { display: 'none' } : undefined;
        return (jsxRuntime.jsx(reactRnd.Rnd, { ...rndProps, ref: (e) => {
                if (e) {
                    rndRef.current = e;
                }
                if (rndProps.ref) {
                    rndProps.ref.current = e;
                }
            }, default: { ...getDefault(), width, height, ...rndProps.default }, minWidth: info.size?.minWidth, minHeight: info.size?.minHeight, maxWidth: info.size?.maxWidth, maxHeight: info.size?.maxHeight, enableResizing: !info.isMaximize || rndProps.enableResizing, disableDragging: info.isMaximize || rndProps.disableDragging, onResizeStop: (...args) => {
                const [, , ref] = args;
                setSize({ width: ref.style.width, height: ref.style.height });
                rndProps.onResizeStop?.(...args);
            }, onDragStop: (...args) => {
                const [, position] = args;
                setPosition(position);
                rndProps.onDragStop?.(...args);
            }, style: { ...rndProps.style, ...style }, children: children }));
    }

    class Router extends EventEmitter {
        routers;
        active = -1;
        history = [];
        constructor(routers) {
            super();
            this.routers = routers;
            const home = this.getHomeRoute();
            this.push(home.path);
        }
        getHomeRoute() {
            return this.findRoute('/') || this.routers[0];
        }
        findRoute(path) {
            return this.routers.find((i) => i.path === path);
        }
        navigate({ path, state, replace = false }) {
            const active = this.active;
            const len = this.history.length;
            const currentRoute = this.findRoute(path);
            if (!currentRoute) {
                console.error(`not found route: ${path}`);
                return;
            }
            const k = replace ? 0 : 1;
            this.history.splice(active + k, len - active);
            const newState = {
                ...currentRoute.state,
                ...state,
            };
            const h = {
                ...currentRoute,
                state: newState,
                component: React.cloneElement(currentRoute.component, {
                    routeInfo: {
                        ...currentRoute,
                        state: newState,
                        component: void 0,
                    },
                }),
            };
            this.history.push(h);
            this.active = this.history.length - 1;
            this.onChange();
        }
        push = (path, state) => {
            return this.navigate({ path, state });
        };
        replace = (path, state) => {
            return this.navigate({ path, state, replace: true });
        };
        back = () => {
            if (this.active > 0) {
                this.active -= 1;
                this.onChange();
            }
        };
        go = (index = 1) => {
            const value = this.active + index;
            if (value > 0 && value < this.history.length) {
                this.active = value;
                this.onChange();
            }
        };
        getCurrent() {
            const current = this.history[this.active];
            return current;
        }
        onChange() {
            this.emit('change', this.getCurrent());
        }
    }

    const LauncherRouterContext = React.createContext({});
    class LauncherRouter extends React.Component {
        windowId = '';
        router = new Router(this.props.routers);
        state = {
            current: this.router.getCurrent(),
        };
        componentDidMount() {
            this.props.onInit?.(this.router);
            this.router.on('change', (route) => {
                this.setState({ current: route });
                if (route) {
                    const r = {
                        ...route,
                        component: void 0,
                    };
                    launcher.setRoute(this.windowId, r);
                }
            });
            const info = launcher.getInfo(this.windowId);
            if (info?.route) {
                this.router.push(info.route.path);
            }
        }
        render() {
            const component = this.state.current?.component;
            return (jsxRuntime.jsx(LauncherWindowContext.Consumer, { children: ({ windowId }) => {
                    this.windowId = windowId;
                    return (jsxRuntime.jsx(LauncherRouterContext.Provider, { value: {
                            push: this.router.push,
                            replace: this.router.replace,
                            back: this.router.back,
                            go: this.router.go,
                            route: this.router.getCurrent(),
                        }, children: component }));
                } }));
        }
    }
    function useHistory() {
        const router = React.useContext(LauncherRouterContext);
        return router;
    }

    function Link({ children, to, state }) {
        const router = useHistory();
        return (jsxRuntime.jsx("a", { onClick: () => {
                router.push(to, state);
            }, children: children }));
    }

    exports.LauncherRouter = LauncherRouter;
    exports.Link = Link;
    exports.Router = Router;
    exports.WindowContainer = WindowContainer;
    exports.WindowLauncher = WindowLauncher;
    exports.launcher = launcher;
    exports.useCurrentWindow = useCurrentWindow;
    exports.useHistory = useHistory;

}));
