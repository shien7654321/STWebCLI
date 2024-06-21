import { defineConfig, UserConfig } from 'vite';
import path from 'path';
import CompressionPlugin from 'vite-plugin-compression';
import LegacyPlugin from '@vitejs/plugin-legacy';
import ReactPlugin from '@vitejs/plugin-react';

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
                output: {
                    entryFileNames: 'js/[name].[hash].client.js',
                    chunkFileNames: 'js/[name].[hash].client.js',
                    assetFileNames: '[ext]/[name].[hash].[ext]',
                    // manualChunks: {
                    //     vendor: ['react', 'react-dom'],
                    // },
                },
            },
            assetsDir: 'static',
            chunkSizeWarningLimit: 1.5 * 1024,
        },
        plugins: [ReactPlugin(), LegacyPlugin()],
        server: {
            cors: true,
            open: true,
            host: '0.0.0.0',
        },
        preview: {
            cors: true,
            open: true,
        }
    };
    if (command === 'build') {
        config.plugins?.push(
            CompressionPlugin({
                threshold: 10240,
            })
        );
    }
    config.build!.sourcemap = command === 'serve';
    return config;
});
