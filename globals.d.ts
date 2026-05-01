declare namespace React {
  type ReactNode = any;
  type ReactElement = any;
  type Key = string | number;
  type CSSProperties = any;
  type MutableRefObject<T> = { current: T };
  type RefObject<T> = { readonly current: T | null };
  type Ref<T> = any;
  type Context<T> = any;
  type FC<P = {}> = (props: P) => any;
  type FunctionComponent<P = {}> = (props: P) => any;
  type ComponentType<P = {}> = any;
  type PropsWithChildren<P = {}> = P & { children?: any };

  function useState<T>(initial: T | (() => T)): [T, (v: T | ((prev: T) => T)) => void];
  function useState<T = undefined>(): [T | undefined, (v: T | ((prev: T | undefined) => T | undefined) | undefined) => void];
  function useRef<T>(initial: T): MutableRefObject<T>;
  function useRef<T>(initial: T | null): RefObject<T>;
  function useRef<T = undefined>(): MutableRefObject<T | undefined>;
  function useEffect(fn: () => void | (() => void), deps?: any[]): void;
  function useLayoutEffect(fn: () => void | (() => void), deps?: any[]): void;
  function useCallback<T extends (...args: any[]) => any>(fn: T, deps: any[]): T;
  function useMemo<T>(fn: () => T, deps: any[]): T;
  function useContext<T>(ctx: any): T;
  function createContext<T>(initial: T): Context<T>;

  const Children: {
    forEach: (children: any, fn: (c: any, i: number) => void) => void;
    toArray: (children: any) => any[];
    map: <T>(children: any, fn: (c: any, i: number) => T) => T[];
    count: (children: any) => number;
  };

  type MouseEvent<T = Element> = any;
  type PointerEvent<T = Element> = any;
  type KeyboardEvent<T = Element> = any;
  type FocusEvent<T = Element> = any;
  type ChangeEvent<T = Element> = any;
  type WheelEvent<T = Element> = any;
  type SyntheticEvent<T = Element> = any;
  type FormEvent<T = Element> = any;
}

declare namespace ReactDOM {
  function createPortal(child: any, container: any): any;
  function createRoot(container: any): { render: (el: any) => void };
}

declare namespace JSX {
  interface IntrinsicElements { [elemName: string]: any; }
  interface IntrinsicAttributes { key?: string | number; ref?: any; }
  interface IntrinsicClassAttributes<T> { ref?: any; }
  interface ElementChildrenAttribute { children: {}; }
  type Element = any;
  type LibraryManagedAttributes<C, P> = P;
}

interface Window {
  omelette?: { writeFile: (path: string, body: string) => Promise<void> };
}
