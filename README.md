# 在线代码编辑平台 (Online Coding Platform)

基于 Monaco Editor 的在线代码编辑器，采用 Monorepo 架构设计。

## 📦 项目结构

```
online-coding/
├── packages/                      # 核心包
│   ├── shared/                   # 共享工具和类型定义
│   │   ├── src/
│   │   │   ├── types.ts         # 类型定义
│   │   │   └── index.ts         # 工具函数
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── editor-core/              # 编辑器核心逻辑
│   │   ├── src/
│   │   │   ├── editor.ts        # 编辑器类
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── language-support/         # 语言支持（语法高亮、代码补全）
│   │   ├── src/
│   │   │   ── index.ts         # 语言支持实现
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── editor-ui/                # UI 组件
│       ├── src/
│       │   ├── components.ts    # UI 组件
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── apps/                          # 应用
│   └── web/                      # Web 应用
│       ├── src/
│       │   ├── index.html       # 主页面
│       │   └── main.ts          # 应用入口
│       └── package.json
│
── package.json                   # 根配置
├── pnpm-workspace.yaml           # Workspace 配置
└── tsconfig.json                 # TypeScript 配置
```

## 🚀 快速开始

### 安装依赖

```bash
# 使用 npm（推荐）
npm install

# 或使用 pnpm
pnpm install

# 或使用 yarn
yarn install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:8080
```

### 构建项目

```bash
# 构建所有包
npm run build

# 构建所有包（别名）
npm run build:all
```

## ✨ 功能特性

### 1. 多语言支持

- JavaScript / TypeScript
- Python
- Java
- C++
- Go
- Rust

### 2. 编辑器功能

- ✅ 语法高亮
- ✅ 智能代码补全
- ✅ 代码格式化
- ✅ 自动括号匹配
- ✅ 代码折叠
- ✅ 行号显示
- ✅ 主题切换（3 种主题）

### 3. UI 组件

- 工具栏（格式化、重置、语言选择、主题切换、保存）
- 📊 状态栏（语言、光标位置、状态信息）

### 4. 快捷键

- `Ctrl/Cmd + S` - 保存代码
- 自动保存到 localStorage

## 包说明

### @online-coding/shared

共享工具和类型定义包，包含：

- 类型定义（Language, Theme, EditorConfig 等）
- 工具函数（deepClone, debounce, throttle）
- 默认配置

### @online-coding/editor-core

编辑器核心逻辑包，提供：

- CodeEditor 类
- 编辑器初始化和管理
- 事件系统
- 配置管理

### @online-coding/language-support

语言支持包，提供：

- JavaScript/TypeScript 代码补全
- Python 代码补全
- 语法高亮配置
- 自动闭合括号

### @online-coding/editor-ui

UI 组件包，包含：

- ThemeManager - 主题管理
- LanguageManager - 语言管理
- Toolbar - 工具栏组件
- StatusBar - 状态栏组件

### @online-coding/web

Web 应用包，整合所有包提供完整的编辑器体验。

## 开发指南

### 添加新的语言支持

1. 在 `packages/shared/src/types.ts` 中添加语言类型
2. 在 `packages/language-support/src/index.ts` 中添加补全规则
3. 在 `packages/editor-ui/src/components.ts` 中添加语言选项

### 添加新的代码补全

编辑 `packages/language-support/src/index.ts`：

```typescript
const newApis: CompletionItem[] = [
  {
    label: 'yourAPI',
    kind: CompletionItemKind.Function,
    insertText: 'yourAPI(${1:param})',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'API 描述'
  }
];
```

### 自定义主题

编辑 `packages/editor-ui/src/components.ts` 中的 ThemeManager 类。

## 📚 Monaco Editor 配置

项目使用 Monaco Editor 0.55.1 版本，配置了：

- 内联 Worker（解决跨域问题）
- 自动布局
- 代码折叠
- 语法高亮
- 智能补全

## 🐛 故障排除

### 编辑器没有语法高亮

1. 确保通过 HTTP 服务器访问（不要直接打开 HTML 文件）
2. 检查浏览器控制台是否有错误
3. 确认 Monaco Editor 文件正确加载

### 代码补全不工作

1. 确认 language-support 包正确注册
2. 检查语言设置是否匹配
3. 查看控制台是否有错误信息

### Worker 跨域问题

项目已配置内联 Worker，如果遇到跨域问题，确保：

- MonacoEnvironment 配置正确
- 使用 HTTP 服务器访问

## 📄 License

MIT License

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

---

**享受编码的乐趣！** 🎉
