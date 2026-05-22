# Monorepo 架构的在线代码编辑平台

## 快速开始（简化版）

由于 npm workspaces 需要 Node.js 18+ 且配置较复杂，这里提供一个**无需编译、直接运行**的方案：

### 方式 1：直接运行 HTML 文件（最简单）

我已经为你准备好了完整的 Monorepo 架构代码，但你**可以直接使用**以下文件：

```bash
# 在项目根目录启动一个简单的 HTTP 服务器
npx http-server apps/web/src -p 8080 -c-1

# 然后在浏览器访问：
# http://localhost:8080/index.html
```

### 方式 2：使用已有的 demo.html

```bash
# 直接启动服务器
npx http-server src -p 8080 -c-1

# 访问：http://localhost:8080/demo.html
```

## 项目结构说明

### 已创建的 Monorepo 包：

1. **packages/shared/** - 共享类型和工具
   - 类型定义（Language, Theme, EditorConfig 等）
   - 工具函数（debounce, throttle, deepClone）

2. **packages/editor-core/** - 编辑器核心
   - CodeEditor 类
   - 编辑器初始化和事件管理
   - 支持多种编程语言

3. **packages/language-support/** - 语言支持
   - JavaScript/TypeScript 代码补全
   - Python 代码补全
   - 语法高亮配置
   - 智能提示

4. **packages/editor-ui/** - UI 组件
   - 工具栏（格式化、重置、主题切换等）
   - 状态栏（语言、光标位置）
   - 主题和语言管理器

5. **apps/web/** - Web 应用
   - 整合所有包
   - 完整的应用入口

## 当前可用的功能

✅ **语法高亮** - 支持 JS/TS/Python/Java/C++/Go/Rust  
✅ **代码补全** - 智能提示和自动补全  
✅ **主题切换** - 3 种主题（vs, vs-dark, hc-black）  
✅ **代码格式化** - 一键格式化代码  
✅ **多语言支持** - 7 种编程语言  
✅ **自动保存** - 保存到 localStorage  
✅ **快捷键** - Ctrl+S 保存  
✅ **响应式布局** - 自适应窗口大小

## 解决语法高亮和提示问题的关键

之前遇到的问题及解决方案：

### 问题 1：语言不匹配

编辑器设置为 `typescript`，但补全注册在 `javascript`  
✅ 已统一为 `javascript`

### 问题 2：CDN 加载问题

❌ 使用 CDN 时 worker 文件跨域  
✅ 配置了 `MonacoEnvironment` 使用内联 worker

### 问题 3：直接打开 HTML 文件

❌ `file://` 协议有安全限制  
✅ 使用 HTTP 服务器访问

## 推荐的开发方式

### 方案 A：使用本地 Monaco（当前配置）

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
cd apps/web/src
npx http-server -p 8080 -c-1

# 3. 访问
http://localhost:8080
```

### 方案 B：使用 CDN（最简单）

直接使用根目录的 `src/demo.html`：

```bash
npx http-server src -p 8080
# 访问 http://localhost:8080/demo.html
```

## 下一步可以做什么

1. **添加更多语言支持** - 在 `packages/language-support/src/index.ts` 中添加
2. **实现代码运行** - 集成代码执行引擎
3. **添加文件管理** - 多文件编辑支持
4. **云端同步** - 将代码保存到服务器
5. **协作编辑** - 实时多人编辑

## 故障排除

### 如果遇到 "Tracking Prevention" 错误

这是浏览器的隐私保护功能，解决方案：

- 使用本地 Monaco Editor（已配置内联 worker）
- 或使用 Edge/Chrome 并关闭跟踪防护

### 如果语法高亮不工作

确保：

1. 通过 HTTP 服务器访问（不是 file://）
2. 浏览器控制台没有错误
3. Monaco Editor 正确加载

### 如果代码补全不工作

检查：

1. 语言设置是否匹配
2. language-support 是否正确注册
3. 控制台是否有错误

---

**现在就开始使用吧！** 🚀

```bash
# 最简单的启动方式：
cd apps/web/src
npx http-server -p 8080
```

然后打开浏览器访问 `http://localhost:8080`
