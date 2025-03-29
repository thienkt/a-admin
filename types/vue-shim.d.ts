declare module '*.vue' {
  import type { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

// PDF-Parse declaration
declare module 'pdf-parse' {
  function parse(buffer: Buffer): Promise<{
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    version: string;
    text: string;
  }>;
  export = parse;
}
