declare module '@barba/core' {
  interface ITransitionData {
    current: {
      container: HTMLElement;
      namespace: string;
      url: {
        href: string;
        path: string;
      };
    };
    next: {
      container: HTMLElement;
      namespace: string;
      url: {
        href: string;
        path: string;
      };
    };
    trigger: string;
  }

  interface ITransition {
    name?: string;
    from?: string;
    to?: string;
    leave?(data: ITransitionData): Promise<void> | void | any;
    enter?(data: ITransitionData): Promise<void> | void | any;
    beforeLeave?(data: ITransitionData): Promise<void> | void;
    afterLeave?(data: ITransitionData): Promise<void> | void;
    beforeEnter?(data: ITransitionData): Promise<void> | void;
    afterEnter?(data: ITransitionData): Promise<void> | void;
  }

  interface IView {
    namespace: string;
    beforeEnter?(): void;
    afterEnter?(): void;
    beforeLeave?(): void;
    afterLeave?(): void;
  }

  interface IBarbaOptions {
    transitions?: ITransition[];
    views?: IView[];
    prevent?: (args: { el: HTMLElement; href: string }) => boolean;
  }

  interface IBarbaHooks {
    before(callback: () => void): void;
    after(callback: () => void): void;
    beforeLeave(callback: (data: ITransitionData) => void): void;
    afterLeave(callback: (data: ITransitionData) => void): void;
    beforeEnter(callback: (data: ITransitionData) => void): void;
    afterEnter(callback: (data: ITransitionData) => void): void;
  }

  const barba: {
    init(options: IBarbaOptions): void;
    go(url: string): void;
    hooks: IBarbaHooks;
  };

  export default barba;
}

declare module '@barba/css' {
  const css: any;
  export default css;
}

declare module 'gsap' {
  interface GSAPTimeline {
    to(target: any, vars: any): GSAPTimeline;
    from(target: any, vars: any): GSAPTimeline;
    set(target: any, vars: any): GSAPTimeline;
  }

  const gsap: {
    to(target: any, vars: any): GSAPTimeline;
    from(target: any, vars: any): GSAPTimeline;
    set(target: any, vars: any): GSAPTimeline;
    timeline(): GSAPTimeline;
  };

  export { gsap };
}
