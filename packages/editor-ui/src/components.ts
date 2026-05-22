import { Theme, Language } from '@online-coding/shared';

// 主题管理
export class ThemeManager {
  private currentTheme: Theme = 'vs-dark';

  getTheme(): Theme {
    return this.currentTheme;
  }

  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    // 如果使用 Monaco，调用 monaco.editor.setTheme(theme)
    console.log(`Theme changed to: ${theme}`);
  }

  toggleTheme(): Theme {
    const themes: Theme[] = ['vs', 'vs-dark', 'hc-black'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    this.setTheme(nextTheme);
    return nextTheme;
  }
}

// 语言管理
export class LanguageManager {
  private currentLanguage: Language = 'javascript';

  getLanguage(): Language {
    return this.currentLanguage;
  }

  setLanguage(language: Language): void {
    this.currentLanguage = language;
    console.log(`Language changed to: ${language}`);
  }
}

// 工具栏组件
export class Toolbar {
  private container: HTMLElement;
  private themeManager: ThemeManager;
  private languageManager: LanguageManager;
  private callbacks: Map<string, Function> = new Map();

  constructor(containerId: string, themeManager: ThemeManager, languageManager: LanguageManager) {
    this.container = document.getElementById(containerId) || document.body;
    this.themeManager = themeManager;
    this.languageManager = languageManager;
    this.render();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="toolbar" style="
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: #2d2d2d;
        border-bottom: 1px solid #3e3e3e;
      ">
        <button id="btn-format" style="
          padding: 6px 12px;
          background: #0e639c;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        ">格式化</button>
        
        <button id="btn-reset" style="
          padding: 6px 12px;
          background: #6c757d;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        ">重置</button>
        
        <select id="language-select" style="
          padding: 6px 12px;
          background: #3c3c3c;
          color: white;
          border: 1px solid #555;
          border-radius: 3px;
          cursor: pointer;
        ">
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
        </select>
        
        <button id="btn-theme" style="
          padding: 6px 12px;
          background: #5a3e8e;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        ">切换主题</button>
        
        <button id="btn-save" style="
          padding: 6px 12px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          margin-left: auto;
        ">保存 (Ctrl+S)</button>
      </div>
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    const btnFormat = document.getElementById('btn-format');
    const btnReset = document.getElementById('btn-reset');
    const btnTheme = document.getElementById('btn-theme');
    const btnSave = document.getElementById('btn-save');
    const languageSelect = document.getElementById('language-select') as HTMLSelectElement;

    btnFormat?.addEventListener('click', () => {
      this.callbacks.get('format')?.();
    });

    btnReset?.addEventListener('click', () => {
      this.callbacks.get('reset')?.();
    });

    btnTheme?.addEventListener('click', () => {
      const newTheme = this.themeManager.toggleTheme();
      this.callbacks.get('theme-change')?.(newTheme);
    });

    btnSave?.addEventListener('click', () => {
      this.callbacks.get('save')?.();
    });

    languageSelect?.addEventListener('change', (e) => {
      const newLanguage = (e.target as HTMLSelectElement).value as Language;
      this.languageManager.setLanguage(newLanguage);
      this.callbacks.get('language-change')?.(newLanguage);
    });
  }

  on(event: string, callback: Function): void {
    this.callbacks.set(event, callback);
  }
}

// 状态栏组件
export class StatusBar {
  private container: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) || document.body;
    this.render();
  }

  render(): void {
    this.container.innerHTML = `
      <div class="status-bar" style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 10px;
        background: #007acc;
        color: white;
        font-size: 12px;
      ">
        <span id="status-language">JavaScript</span>
        <span id="status-position">Ln 1, Col 1</span>
        <span id="status-changes">就绪</span>
      </div>
    `;
  }

  updateLanguage(language: string): void {
    const langElement = document.getElementById('status-language');
    if (langElement) {
      langElement.textContent = language.charAt(0).toUpperCase() + language.slice(1);
    }
  }

  updatePosition(line: number, column: number): void {
    const posElement = document.getElementById('status-position');
    if (posElement) {
      posElement.textContent = `Ln ${line}, Col ${column}`;
    }
  }

  updateStatus(message: string): void {
    const statusElement = document.getElementById('status-changes');
    if (statusElement) {
      statusElement.textContent = message;
    }
  }
}
