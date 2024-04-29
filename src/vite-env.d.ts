/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BACKEND_ENDPOINT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}