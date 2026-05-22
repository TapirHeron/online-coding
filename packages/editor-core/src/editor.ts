import * as monaco from 'monaco-editor';
import { EditorConfig, defaultEditorConfig, EditorEvent, deepClone } from '@online-coding/shared';

export class CodeEditor {
  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private config: EditorConfig;
  private eventListeners: Map<string, Function[]> = new Map();

  constructor(containerId: string, config?: Partial<EditorConfig>) {
    this.config = { ...defaultEditorConfig, ...config };
    this.init(containerId);
  }

  // 初始化编辑器
  private init(containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }

    this.editor = monaco.editor.create(container, {
      value: this.getDefaultCode(),
      language: this.config.language,
      theme: this.config.theme,
      fontSize: this.config.fontSize,
      minimap: { enabled: this.config.minimap },
      wordWrap: this.config.wordWrap,
      tabSize: this.config.tabSize,
      automaticLayout: true,
      scrollBeyondLastLine: true,
      renderWhitespace: 'selection',
      folding: true,
      lineNumbers: 'on',
      roundedSelection: true,
      scrollbar: {
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10
      }
    });

    this.bindEvents();
    console.log('CodeEditor initialized successfully');
  }

  // 获取默认代码
  private getDefaultCode(): string {
    const codeMap: Record<string, string> = {
      javascript: `// JavaScript 示例
console.log("Hello, World!");

function add(a, b) {
  return a + b;
}

const result = add(10, 20);
console.log('Result:', result);`,
      typescript: `// TypeScript 示例
interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const user: User = { name: "Alice", age: 25 };
console.log(greet(user));`,
      python: `# Python 示例
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
      java: `// Java 示例
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      cpp: `// C++ 示例
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      go: `// Go 示例
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
      rust: `// Rust 示例
fn main() {
    println!("Hello, World!");
}`
    };

    return codeMap[this.config.language] || codeMap.javascript;
  }

  // 绑定事件
  private bindEvents(): void {
    if (!this.editor) {
      return;
    }

    // 内容变化事件
    this.editor.onDidChangeModelContent(() => {
      this.emit('change', {
        value: this.getValue(),
        language: this.config.language
      });
    });

    // 光标位置变化事件
    this.editor.onDidChangeCursorPosition((e) => {
      this.emit('cursor-position', {
        line: e.position.lineNumber,
        column: e.position.column
      });
    });

    // 键盘事件（用于保存快捷键）
    this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      this.emit('save', {
        value: this.getValue(),
        language: this.config.language
      });
    });
  }

  // 获取编辑器实例
  getEditor(): monaco.editor.IStandaloneCodeEditor | null {
    return this.editor;
  }

  // 获取当前值
  getValue(): string {
    return this.editor?.getValue() || '';
  }

  // 设置值
  setValue(value: string): void {
    this.editor?.setValue(value);
  }

  // 获取配置
  getConfig(): EditorConfig {
    return deepClone(this.config);
  }

  // 更新配置
  updateConfig(config: Partial<EditorConfig>): void {
    this.config = { ...this.config, ...config };

    if (this.editor) {
      if (config.language) {
        const model = this.editor.getModel();
        if (model) {
          monaco.editor.setModelLanguage(model, config.language);
        }
      }
      if (config.theme) {
        monaco.editor.setTheme(config.theme);
      }
      if (config.fontSize) {
        this.editor.updateOptions({ fontSize: config.fontSize });
      }
      if (config.minimap !== undefined) {
        this.editor.updateOptions({ minimap: { enabled: config.minimap } });
      }
    }
  }

  // 事件监听
  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  // 事件触发
  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event) || [];
    listeners.forEach((callback) => callback(data));
  }

  // 销毁编辑器
  dispose(): void {
    if (this.editor) {
      this.editor.dispose();
      this.editor = null;
    }
    this.eventListeners.clear();
  }

  // 格式化代码
  formatCode(): void {
    if (!this.editor) {
      return;
    }

    this.editor.getAction('editor.action.formatDocument')?.run();
  }

  // 重置编辑器
  reset(): void {
    this.setValue(this.getDefaultCode());
  }
}
