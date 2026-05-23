# 在线代码编辑平台 (Online Coding Platform)

基于 Monaco Editor 的在线代码编辑器，采用 Monorepo 架构设计。

## 📦 项目结构

```
online-coding/
├── packages/
│   ├── shared/
│   │   ├── src/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── editor-core/
│   │   ├── src/
│   │   │   ├── editor.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── language-support/
│   │   ├── src/
│   │   │   ── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── editor-ui/
│       ├── src/
│       │   ├── components.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── apps/
│   └── web/
│       ├── src/
│       │   ├── main.ts
│       ├── index.html
│       ├── vite.config.ts
│       └── package.json
│
├── package.json
├── tsconfig.json
├── eslint.config.js
├── .prettierrc.json
└── commitlint.config.cjs
```

## 🚀 快速开始

### 环境要求

- **Node.js**: >=18.0.0
- **包管理器**: npm (使用 workspaces)

### 安装依赖

```bash
npm install
```

> ⚠️ **注意**：本项目使用 npm workspaces 管理 Monorepo，请使用 npm 而非 pnpm 或 yarn。

### 开发模式

```bash
npm run dev --workspace=apps/web
```

> 💡 **提示**：Vite 服务器会自动打开浏览器。如果 8080 端口被占用，会自动尝试 8081、8082 等。

### 构建项目

```bash
npm run type-check

npm run build

npm run clean
```

### 单独构建某个包

```bash
npm run build --workspace=packages/shared

npm run build --workspace=packages/editor-ui
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

## 📚 技术栈

### 核心框架

- **TypeScript**: 5.x（严格模式 enabled）
- **Monaco Editor**: 0.55.1（VS Code 同款编辑器）
- **Vite**: 8.x（现代前端构建工具）
- **Monorepo**: npm workspaces

### 代码质量工具

- **ESLint**: 代码检查
- **Prettier**: 代码格式化
- **Husky**: Git hooks
- **Commitlint**: 提交信息规范

### TypeScript 配置说明

所有包都使用以下配置：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "rootDirs": ["./src", "../shared/src"]
  }
}
```

**为什么使用这些配置？**

- ✅ **ESNext**: 与 Vite 完美配合，支持 tree-shaking
- ✅ **bundler**: 专为打包工具设计的模块解析
- ✅ **strict**: 捕获更多潜在错误，提高代码质量
- ✅ **rootDirs**: 支持 monorepo 内部包引用

## 🌐 Monaco Editor 配置

项目使用 Monaco Editor 0.55.1 版本，通过 **CDN** 加载：

### CDN 加载方式

```html
<script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs/loader.js"></script>
```

```typescript
(window as any).MonacoEnvironment = {
  getWorkerUrl: function () {
    return `https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs/base/worker/workerMain.js`;
  }
};
```

### 为什么使用 CDN？

- ✅ 避免 Vite 处理 Monaco 的 AMD loader 路径问题
- ✅ 更快地加载速度（CDN 缓存）
- ✅ 简化项目配置
- ✅ 减少 node_modules 体积

### 编辑器特性

- ✅ 语法高亮（6+ 语言）
- ✅ 智能代码补全
- ✅ 代码格式化
- ✅ 自动括号匹配
- ✅ 代码折叠
- ✅ 行号显示
- ✅ 主题切换（3 种主题）
- ✅ 内联 Worker（无跨域问题）

## 🐛 故障排除

### Vite 服务器无法启动

1. 确认 Node.js 版本 >= 18.0.0
2. 检查端口是否被占用（默认 8080，会自动递增）
3. 查看控制台错误信息

### TypeScript 类型错误

如果遇到 "Cannot find module '@online-coding/xxx'" 错误：

```bash
npm run type-check

npm run clean
npm run build
```

### Monaco Editor 不显示

1. ✅ 确认使用 CDN 加载（已配置）
2. ✅ 确保通过 HTTP 服务器访问（不要直接打开 HTML）
3. ✅ 检查浏览器控制台是否有网络错误
4. ✅ 确认网络连接正常（需要访问 jsdelivr CDN）

### 代码补全不工作

1. 确认 language-support 包正确注册
2. 检查语言设置是否匹配
3. 查看控制台是否有错误信息

### 内部包引用错误

Monorepo 内部包使用 TypeScript 路径映射：

```json
{
  "paths": {
    "@online-coding/shared": ["../shared/src"]
  }
}
```

无需构建即可在开发时使用源文件。

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 提交信息规范

项目使用 Conventional Commits 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具相关

### 代码规范

- 使用 ESLint + Prettier 保持代码风格一致
- 启用 Husky pre-commit hook 自动检查和格式化
- 所有代码必须通过 TypeScript 严格模式检查

---

**享受编码的乐趣！** 🎉

## 📝 更新日志

### 2026-05-23

- ✅ 迁移到 Vite 构建工具
- ✅ 使用 CDN 加载 Monaco Editor
- ✅ 优化 TypeScript 配置（ESNext + bundler）
- ✅ 添加 monorepo 路径映射
- ✅ 移除 pnpm，统一使用 npm workspaces
- ✅ 修复 CompletionItemKind 枚举值（LSP 标准）
- ✅ 启用严格模式（strict: true）
