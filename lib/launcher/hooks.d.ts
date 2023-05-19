import { WindowItem } from './interface';
export declare function useCurrentWindow(): {
    info: WindowItem;
    close: () => void;
    open: (key: string, options?: Partial<Omit<WindowItem, "id" | "key">> | undefined) => void;
    maximize: () => void;
    minimize: () => void;
    normalize: () => void;
    toFront: () => void;
    toBack: () => void;
    setSize: ({ width, height }: {
        width: number | string;
        height: number | string;
    }) => {
        isUpdated: boolean;
        oldValue: import("./interface").OpenWindowItem | undefined;
        newValue: import("./interface").OpenWindowItem | undefined;
    };
    setPosition: ({ x, y }: {
        x: number;
        y: number;
    }) => {
        isUpdated: boolean;
        oldValue: import("./interface").OpenWindowItem | undefined;
        newValue: import("./interface").OpenWindowItem | undefined;
    };
};
