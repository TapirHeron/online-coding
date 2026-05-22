import * as monaco from 'monaco-editor';
import { Language, CompletionItem, CompletionItemKind } from '@online-coding/shared';

// JavaScript/TypeScript 内置关键字补全
const jsKeywords: CompletionItem[] = [
  { label: 'const', kind: CompletionItemKind.Keyword, insertText: 'const' },
  { label: 'let', kind: CompletionItemKind.Keyword, insertText: 'let' },
  { label: 'var', kind: CompletionItemKind.Keyword, insertText: 'var' },
  { label: 'function', kind: CompletionItemKind.Keyword, insertText: 'function' },
  { label: 'return', kind: CompletionItemKind.Keyword, insertText: 'return' },
  { label: 'if', kind: CompletionItemKind.Keyword, insertText: 'if' },
  { label: 'else', kind: CompletionItemKind.Keyword, insertText: 'else' },
  { label: 'for', kind: CompletionItemKind.Keyword, insertText: 'for' },
  { label: 'while', kind: CompletionItemKind.Keyword, insertText: 'while' },
  { label: 'class', kind: CompletionItemKind.Keyword, insertText: 'class' },
  { label: 'import', kind: CompletionItemKind.Keyword, insertText: 'import' },
  { label: 'export', kind: CompletionItemKind.Keyword, insertText: 'export' }
];

// 常用 API 补全
const jsApis: CompletionItem[] = [
  {
    label: 'console.log',
    kind: CompletionItemKind.Function,
    insertText: 'console.log(${1:message})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '输出日志信息'
  },
  {
    label: 'console.error',
    kind: CompletionItemKind.Function,
    insertText: 'console.error(${1:error})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '输出错误信息'
  },
  {
    label: 'console.warn',
    kind: CompletionItemKind.Function,
    insertText: 'console.warn(${1:warning})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '输出警告信息'
  },
  {
    label: 'setTimeout',
    kind: CompletionItemKind.Function,
    insertText: 'setTimeout(() => {\n\t${1}\n}, ${2:delay})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '延迟执行函数'
  },
  {
    label: 'setInterval',
    kind: CompletionItemKind.Function,
    insertText: 'setInterval(() => {\n\t${1}\n}, ${2:delay})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '定时重复执行函数'
  },
  {
    label: 'fetch',
    kind: CompletionItemKind.Function,
    insertText:
      'fetch(${1:url})\n\t.then(response => response.json())\n\t.then(data => ${2})\n\t.catch(error => ${3})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '发起网络请求'
  },
  {
    label: 'Promise',
    kind: CompletionItemKind.Class,
    insertText: 'new Promise((resolve, reject) => {\n\t${1}\n})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '创建 Promise 对象'
  },
  {
    label: 'async/await',
    kind: CompletionItemKind.Snippet,
    insertText:
      'async function ${1:name}() {\n\ttry {\n\t\tconst result = await ${2}\n\t\treturn result\n\t} catch (error) {\n\t\tconsole.error(error)\n\t}\n}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '异步函数模板'
  },
  {
    label: 'forEach',
    kind: CompletionItemKind.Method,
    insertText: '.forEach((item, index) => {\n\t${1}\n})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '数组遍历方法'
  },
  {
    label: 'map',
    kind: CompletionItemKind.Method,
    insertText: '.map((item, index) => {\n\t${1}\n})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '数组映射方法'
  },
  {
    label: 'filter',
    kind: CompletionItemKind.Method,
    insertText: '.filter((item, index) => {\n\t${1}\n})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '数组过滤方法'
  }
];

// Python 补全项
const pythonKeywords: CompletionItem[] = [
  { label: 'def', kind: CompletionItemKind.Keyword, insertText: 'def' },
  { label: 'class', kind: CompletionItemKind.Keyword, insertText: 'class' },
  { label: 'return', kind: CompletionItemKind.Keyword, insertText: 'return' },
  { label: 'if', kind: CompletionItemKind.Keyword, insertText: 'if' },
  { label: 'else', kind: CompletionItemKind.Keyword, insertText: 'else' },
  { label: 'elif', kind: CompletionItemKind.Keyword, insertText: 'elif' },
  { label: 'for', kind: CompletionItemKind.Keyword, insertText: 'for' },
  { label: 'while', kind: CompletionItemKind.Keyword, insertText: 'while' },
  { label: 'import', kind: CompletionItemKind.Keyword, insertText: 'import' },
  { label: 'from', kind: CompletionItemKind.Keyword, insertText: 'from' },
  { label: 'try', kind: CompletionItemKind.Keyword, insertText: 'try' },
  { label: 'except', kind: CompletionItemKind.Keyword, insertText: 'except' }
];

const pythonApis: CompletionItem[] = [
  {
    label: 'print',
    kind: CompletionItemKind.Function,
    insertText: 'print(${1:message})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '打印输出'
  },
  {
    label: 'range',
    kind: CompletionItemKind.Function,
    insertText: 'range(${1:start}, ${2:stop}, ${3:step})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '生成数字序列'
  },
  {
    label: 'len',
    kind: CompletionItemKind.Function,
    insertText: 'len(${1:obj})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '获取长度'
  },
  {
    label: 'list',
    kind: CompletionItemKind.Class,
    insertText: 'list()',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '创建列表'
  },
  {
    label: 'dict',
    kind: CompletionItemKind.Class,
    insertText: 'dict()',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '创建字典'
  },
  {
    label: 'for loop',
    kind: CompletionItemKind.Snippet,
    insertText: 'for ${1:item} in ${2:iterable}:\n\t${3}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'for 循环模板'
  },
  {
    label: 'function',
    kind: CompletionItemKind.Snippet,
    insertText: 'def ${1:func_name}(${2:params}):\n\t"""${3:docstring}"""\n\t${4}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '函数定义模板'
  },
  {
    label: 'class',
    kind: CompletionItemKind.Snippet,
    insertText:
      'class ${1:ClassName}:\n\tdef __init__(self, ${2:params}):\n\t\tself.${3} = ${3}\n\t\n\tdef ${4:method}(self):\n\t\t${5}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: '类定义模板'
  }
];

// 注册 JavaScript/TypeScript 补全提供者
export function registerJavaScriptSupport(): void {
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const suggestions = [...jsKeywords, ...jsApis].map((item) => ({
        ...item,
        range
      }));

      return { suggestions };
    }
  });

  // TypeScript 使用相同的补全
  monaco.languages.registerCompletionItemProvider('typescript', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const suggestions = [...jsKeywords, ...jsApis].map((item) => ({
        ...item,
        range
      }));

      return { suggestions };
    }
  });
}

// 注册 Python 补全提供者
export function registerPythonSupport(): void {
  monaco.languages.registerCompletionItemProvider('python', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const suggestions = [...pythonKeywords, ...pythonApis].map((item) => ({
        ...item,
        range
      }));

      return { suggestions };
    }
  });
}

// 注册所有语言支持
export function registerAllLanguages(): void {
  registerJavaScriptSupport();
  registerPythonSupport();

  // 配置语法高亮（自定义 token）
  monaco.languages.setLanguageConfiguration('javascript', {
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'", notIn: ['string'] },
      { open: '"', close: '"', notIn: ['string'] },
      { open: '`', close: '`', notIn: ['string'] }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
      { open: '`', close: '`' }
    ]
  });

  console.log('Language support registered');
}
