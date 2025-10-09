/// <reference types="vite/client" />

declare module '@inertiajs/react' {
  export function createInertiaApp(options: {
    page: any;
    render: (element: any) => string;
    resolve: (name: string) => any;
    setup: (options: { App: any; props: any }) => any;
  }): any;
  
  export const Head: React.ComponentType<{ title?: string; [key: string]: any }>;
}

declare module 'react-dom/server' {
  export function renderToString(element: any): string;
}

// Extend ImportMeta interface for Vite
interface ImportMeta {
  glob: (pattern: string, options?: { eager?: boolean }) => Record<string, any>;
}
