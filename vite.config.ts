import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import path from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    },
    plugins: [
        vue(),
        AutoImport({
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
            imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
            dirs: ['./src/composables', './src/composables/**', './src/stores'],
            dts: true,
            vueTemplate: false
        }),
        Components({ dts: true })
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
              @import "@/scss/additionalData/_variables.scss";
              @import "@/scss/additionalData/_animations.scss";
            `
            }
        }
    },
    server: { port: 5000 },
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
    }
});
