/// <reference types="react" />
import { RouteState } from './interface';
interface LinkProps {
    to: string;
    state: RouteState;
}
export declare function Link({ children, to, state }: React.PropsWithChildren<LinkProps>): JSX.Element;
export {};
