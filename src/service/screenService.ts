type Listener = (isMobile: boolean) => void;

const maxWidth = 1130;

type MediaQueryListListener = (
  this: MediaQueryList,
  ev: MediaQueryListEvent,
) => void;

class ScreenService {
  private mql: MediaQueryList | null = null;
  private isMobile = false;
  private listeners = new Set<Listener>();
  private initialized = false;

  init() {
    if (this.initialized) return;
    this.initialized = true;

    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(max-width: ${maxWidth}px)`);
    this.mql = mql;
    this.isMobile = mql.matches;

    const handler = (e: MediaQueryListEvent) => {
      this.isMobile = e.matches;
      this.listeners.forEach((cb) => cb(this.isMobile));
    };

    // Safari compatibility
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler);
    } else {
      const legacyHandler: MediaQueryListListener = function (
        this: MediaQueryList,
        event: MediaQueryListEvent,
      ) {
        handler(event);
      };
      const legacyAddListener = (
        mql as unknown as {
          addListener?: (listener: MediaQueryListListener) => void;
        }
      ).addListener;
      legacyAddListener?.(legacyHandler);
    }
  }

  getIsMobile() {
    this.init();
    return this.isMobile;
  }

  subscribe(cb: Listener) {
    this.init();
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }
}

export const screenService = new ScreenService();
