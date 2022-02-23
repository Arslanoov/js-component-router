export interface Route {
  path: RegExp | string;
  cb: Function;
}

export interface RouterConfig {
  mode?: RouterMode;
  root?: string;
}

export enum RouterMode {
  history = 'history',
  hash = 'hash',
}

export default class Router {
  private routes: Route[] = [];
  private mode: RouterMode;
  private root = '/#/';
  private current?: string;

  public constructor(config: RouterConfig) {
    this.mode = window.history.pushState ? RouterMode.history : RouterMode.hash;
    this.listen(config);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.router = this;
    window.addEventListener('load', () => this.listen({}, true));

    if (this.isHistoryMode()) {
      window.history.pushState = new Proxy(window.history.pushState, {
        apply: (target, thisArg, argArray) => {
          const result = target.apply(thisArg, argArray);
          this.listen({});
          return result;
        },
      });
    } else {
      window.addEventListener('hashchange', () => this.listen({}));
    }
  }

  public add(path: RegExp | string, cb: Function): Router {
    this.routes.push({
      path,
      cb,
    });

    return this;
  }

  public remove(path: string): Router {
    for (let i = 0; i < this.routes.length; i++) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }

    return this;
  }

  public removeAll(): Router {
    this.routes = [];
    return this;
  }

  public navigate(path = ''): Router {
    if (this.isHistoryMode()) {
      window.history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(
        /#(.*)$/,
        ''
      )}#${path}`;
    }

    return this;
  }

  public listen(config: RouterConfig, isInit = false) {
    if (config?.mode) this.mode = config.mode;
    if (config?.root) this.root = config.root;
    this.interval(isInit);
  }

  private interval(isInit: boolean): void {
    if (this.getFragment() === this.current && !isInit) {
      return;
    }

    this.current = this.getFragment();
    this.routes.some((route) => {
      const match = this.current.match(route.path);

      if (match) {
        match.shift();
        route.cb.apply({}, match);
        return match;
      }

      return false;
    });
  }

  private clearSlashes(path: string): string {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  private isHistoryMode(): boolean {
    return this.mode === RouterMode.history;
  }

  private getFragment(): string {
    const match = window.location.href.match(/#(.*)$/);
    let fragment: string;

    if (this.isHistoryMode()) {
      fragment = this.clearSlashes(
        decodeURIComponent(window.location.pathname + window.location.search)
      );
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      fragment = match ? match[1] : '';
    }

    return this.clearSlashes(fragment);
  }
}
