import { CodeEditor } from '@online-coding/editor-core';
import { registerAllLanguages } from '@online-coding/language-support';
import { ThemeManager, LanguageManager, Toolbar, StatusBar } from '@online-coding/editor-ui';
import { Language, Theme } from '@online-coding/shared';

// 应用主类
class OnlineCodingApp {
  private editor: CodeEditor | null = null;
  private themeManager: ThemeManager;
  private languageManager: LanguageManager;
  private toolbar: Toolbar | null = null;
  private statusBar: StatusBar | null = null;

  constructor() {
    this.themeManager = new ThemeManager();
    this.languageManager = new LanguageManager();
    this.init();
  }

  private async init(): Promise<void> {
    try {
      // 等待 Monaco Editor 加载完成
      await this.waitForMonaco();

      // 配置 Monaco Environment（解决 worker 跨域问题）
      this.configureMonacoEnvironment();

      // 加载 Monaco Editor 主模块
      await this.loadMonacoEditor();

      // 注册语言支持
      registerAllLanguages();

      // 初始化编辑器
      this.initEditor();

      // 初始化 UI 组件
      this.initUIComponents();

      // 绑定事件
      this.bindEvents();

      console.log('🎉 Online Coding Platform initialized successfully!');
    } catch (error) {
      console.error(' Failed to initialize application:', error);
    }
  }

  private waitForMonaco(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof (window as any).monaco !== 'undefined') {
        resolve();
      } else {
        const checkInterval = setInterval(() => {
          if (typeof (window as any).monaco !== 'undefined') {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
      }
    });
  }

  private configureMonacoEnvironment(): void {
    (window as any).MonacoEnvironment = {
      getWorkerUrl: function (moduleId: string, label: string) {
        // 使用内联 worker 避免跨域问题
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
          self.MonacoEnvironment = {
            baseUrl: '../node_modules/monaco-editor/min/'
          };
          importScripts('../node_modules/monaco-editor/min/vs/base/worker/workerMain.js');
        `)}`;
      }
    };
  }

  private loadMonacoEditor(): Promise<void> {
    return new Promise((resolve, reject) => {
      const monaco = (window as any).monaco;
      if (monaco && monaco.editor) {
        resolve();
      } else {
        reject(new Error('Monaco editor not loaded'));
      }
    });
  }

  private initEditor(): void {
    this.editor = new CodeEditor('editor', {
      language: this.languageManager.getLanguage(),
      theme: this.themeManager.getTheme(),
      fontSize: 14,
      minimap: false,
      wordWrap: 'on',
      tabSize: 2
    });
  }

  private initUIComponents(): void {
    // 初始化工具栏
    this.toolbar = new Toolbar('toolbar', this.themeManager, this.languageManager);

    // 初始化状态栏
    this.statusBar = new StatusBar('status-bar');
    this.updateStatusBar();
  }

  private bindEvents(): void {
    if (!this.editor || !this.toolbar || !this.statusBar) {
      return;
    }

    // 工具栏事件
    this.toolbar.on('format', () => {
      this.editor?.formatCode();
      this.statusBar?.updateStatus('代码已格式化');
    });

    this.toolbar.on('reset', () => {
      this.editor?.reset();
      this.statusBar?.updateStatus('编辑器已重置');
    });

    this.toolbar.on('theme-change', (theme: Theme) => {
      if (this.editor) {
        this.editor.updateConfig({ theme });
      }
      this.statusBar?.updateStatus(`主题已切换为: ${theme}`);
    });

    this.toolbar.on('language-change', (language: Language) => {
      if (this.editor) {
        this.editor.updateConfig({ language });
      }
      this.updateStatusBar();
      this.statusBar?.updateStatus(`语言已切换为: ${language}`);
    });

    this.toolbar.on('save', () => {
      const value = this.editor?.getValue();
      console.log('保存代码:', value);
      this.statusBar?.updateStatus('代码已保存');

      // 这里可以添加实际的保存逻辑，比如发送到服务器
      this.saveCode(value);
    });

    // 编辑器事件
    this.editor.on('change', (data: any) => {
      this.statusBar?.updateStatus('编辑中...');
    });

    this.editor.on('cursor-position', (data: any) => {
      this.statusBar?.updatePosition(data.line, data.column);
    });

    this.editor.on('save', (data: any) => {
      this.saveCode(data.value);
      this.statusBar?.updateStatus('代码已保存 (Ctrl+S)');
    });
  }

  private updateStatusBar(): void {
    if (!this.statusBar || !this.editor) {
      return;
    }
    const config = this.editor.getConfig();
    this.statusBar.updateLanguage(config.language);
  }

  private saveCode(code: string | undefined): void {
    if (!code) {
      return;
    }

    // 本地存储保存
    try {
      localStorage.setItem('online-coding-content', code);
      localStorage.setItem('online-coding-language', this.languageManager.getLanguage());
    } catch (error) {
      console.error('Failed to save code:', error);
    }
  }

  // 加载保存的代码
  private loadSavedCode(): void {
    try {
      const savedCode = localStorage.getItem('online-coding-content');
      const savedLanguage = localStorage.getItem('online-coding-language');

      if (savedCode && this.editor) {
        this.editor.setValue(savedCode);
      }

      if (savedLanguage) {
        this.languageManager.setLanguage(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Failed to load saved code:', error);
    }
  }
}

// 启动应用
window.addEventListener('DOMContentLoaded', () => {
  const app = new OnlineCodingApp();
  // 将 app 实例暴露到全局，方便调试
  (window as any).__app = app;
});
