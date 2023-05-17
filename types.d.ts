/// <reference types="node" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    /** 打包环境 */
    readonly NODE_ENV: 'development' | 'production' | 'test';
    /** 部署地址域名 */
    readonly DEPLOY_ADDRESS: string;
  }
}

interface Window {}

declare module 'minio_console/*';

declare module '*.avif';

declare module '*.bmp';

declare module '*.gif';

declare module '*.jpg';

declare module '*.jpeg';

declare module '*.png';

declare module '*.webp';

declare module '*.svg';

declare module '*.pdf';

declare module '*.module.css';

declare module '*.module.less';

declare module '*.module.scss';

declare module '*.module.sass';

declare module 'react-rnd' {
  export * from 'react-rnd/lib/index.d';
}
