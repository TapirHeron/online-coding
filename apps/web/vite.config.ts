import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 8080,
    strictPort: false, // 如果端口被占用，自动尝试下一个可用端口
    open: true,
    fs: {
      // 允许访问工作区根目录外的文件
      allow: ['..']
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@online-coding/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@online-coding/editor-core': path.resolve(__dirname, '../../packages/editor-core/src'),
      '@online-coding/language-support': path.resolve(
        __dirname,
        '../../packages/language-support/src'
      ),
      '@online-coding/editor-ui': path.resolve(__dirname, '../../packages/editor-ui/src')
    }
  },
  optimizeDeps: {
    // 排除 Monaco Editor，避免 Vite 预打包它
    exclude: ['monaco-editor']
  }
});
