// 语言类型定义
export type Language = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'go' | 'rust';

// 主题类型定义
export type Theme = 'vs' | 'vs-dark' | 'hc-black';

// 编辑器配置接口
export interface EditorConfig {
  language: Language;
  theme: Theme;
  fontSize?: number;
  minimap?: boolean;
  wordWrap?: 'on' | 'off';
  tabSize?: number;
}

// 代码补全项接口
export interface CompletionItem {
  label: string;
  kind: CompletionItemKind;
  insertText: string;
  insertTextRules?: number;
  documentation?: string;
  detail?: string;
}

// 代码补全类型
export enum CompletionItemKind {
  Method = 0,
  Function = 1,
  Constructor = 2,
  Field = 3,
  Variable = 4,
  Class = 5,
  Interface = 6,
  Module = 7,
  Property = 8,
  Keyword = 9,
  Snippet = 10
}

// 编辑器事件
export interface EditorEvent {
  type: 'change' | 'save' | 'cursor-position';
  data: any;
}

// 语言支持配置
export interface LanguageSupport {
  language: Language;
  completionProvider?: any;
  hoverProvider?: any;
  signatureHelpProvider?: any;
}
