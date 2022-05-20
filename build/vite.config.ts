import { defineConfig, UserConfig } from 'vite';
import path from 'path';
import VuePlugin from '@vitejs/plugin-vue';
import VueJsxPlugin from '@vitejs/plugin-vue-jsx';
import CompressionPlugin from 'vite-plugin-compression';
import LegacyPlugin from '@vitejs/plugin-legacy';

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

export default defineConfig(({ command, mode }) => {
    const config: UserConfig = {
        base: './',
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        build: {
            target: 'es2015',
            rollupOptions: {
                manualChunks: {
                    vendor: ['vue'],
                },
                output: {
                    entryFileNames: 'static/js/[name].[hash].min.js',
                    chunkFileNames: 'static/js/[name].[hash].min.js',
                    assetFileNames: 'static/[ext]/[name].[hash].[ext]',
                },
            },
            assetsDir: 'static',
            chunkSizeWarningLimit: 1.5 * 1024,
        },
        plugins: [
            VuePlugin(),
            VueJsxPlugin(),
            CompressionPlugin({
                threshold: 10240,
            }),
            LegacyPlugin(),
        ],
        server: {
            cors: true,
            open: true,
        },
    };
    config.build!.sourcemap = command === 'serve';
    return config;
});
