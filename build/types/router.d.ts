export interface Route {
    path: RegExp | string;
    cb: Function;
}
export interface RouterConfig {
    mode?: RouterMode;
    root?: string;
}
export declare enum RouterMode {
    history = "history",
    hash = "hash"
}
export default class Router {
    private routes;
    private mode;
    private root;
    private current?;
    constructor(config: RouterConfig);
    add(path: RegExp | string, cb: Function): Router;
    remove(path: string): Router;
    removeAll(): Router;
    navigate(path?: string): Router;
    listen(config: RouterConfig, isInit?: boolean): void;
    private interval;
    private clearSlashes;
    private isHistoryMode;
    private getFragment;
}
