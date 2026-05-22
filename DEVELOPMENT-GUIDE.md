# 🚀 开发工作流指南

## 📋 目录

- [快速开始](#快速开始)
- [代码规范](#代码规范)
- [Git 提交规范](#git-提交规范)
- [开发命令](#开发命令)
- [VS Code 配置](#vs-code-配置)
- [提交前检查清单](#提交前检查清单)

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```

安装完成后，Husky 会自动配置 Git Hooks。

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:8080

---

## 代码规范

项目使用 **ESLint** + **Prettier** 保证代码质量。

### ESLint 规则

- ✅ 使用单引号
- ✅ 语句末尾加分号
- ✅ 2 空格缩进
- ✅ 使用 `const` 而非 `var`
- ✅ 禁止未使用的变量（`_` 开头的变量除外）
- ✅ 使用 `===` 而非 `==`
- ✅ 强制使用 curly braces `{}`

### Prettier 配置

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100
}
```

### 运行代码检查

```bash
# 检查代码
npm run lint

# 自动修复代码格式
npm run lint:fix

# 格式化所有文件
npm run format

# 检查格式是否正确
npm run format:check
```

---

## Git 提交规范

项目采用 **Conventional Commits** 规范。

### 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| Type       | 说明                       | 示例                               |
| ---------- | -------------------------- | ---------------------------------- |
| `feat`     | 新功能                     | `feat(editor): 添加代码补全功能`   |
| `fix`      | Bug 修复                   | `fix(parser): 修复语法高亮问题`    |
| `docs`     | 文档更新                   | `docs(readme): 更新安装说明`       |
| `style`    | 代码格式（不影响代码运行） | `style: 格式化代码`                |
| `refactor` | 代码重构                   | `refactor(editor): 重构编辑器核心` |
| `test`     | 测试相关                   | `test(editor): 添加单元测试`       |
| `chore`    | 构建过程或辅助工具变动     | `chore: 更新依赖`                  |
| `perf`     | 性能优化                   | `perf(editor): 优化渲染性能`       |
| `ci`       | CI 配置                    | `ci: 添加 GitHub Actions`          |
| `build`    | 构建相关                   | `build: 更新构建配置`              |
| `revert`   | 回退                       | `revert: 回退上一个提交`           |

### 提交示例

```bash
# ✅ 正确的提交
git commit -m "feat(editor): 添加多语言支持"
git commit -m "fix(parser): 修复 TypeScript 语法高亮"
git commit -m "docs(readme): 更新 API 文档"
git commit -m "refactor(core): 重构编辑器初始化逻辑"

# ❌ 错误的提交（会被拒绝）
git commit -m "update code"
git commit -m "fix bug"
git commit -m "修改了一些东西"
```

### 完整的提交示例

```bash
feat(editor): 添加代码格式化功能

- 集成 Prettier
- 添加工具栏按钮
- 支持快捷键 Ctrl+Shift+F

Closes #123
```

---

## 开发命令

### 日常开发

```bash
# 启动开发服务器
npm run dev

# 构建所有包
npm run build

# 清理构建产物
npm run clean

# 类型检查
npm run type-check
```

### 代码质量

```bash
# ESLint 检查
npm run lint

# ESLint 自动修复
npm run lint:fix

# Prettier 格式化
npm run format

# 检查格式
npm run format:check
```

### Git 操作

```bash
# 添加文件
git add .

# 提交（会自动触发 lint-staged）
git commit -m "feat: 你的提交信息"

# 推送
git push
```

---

## VS Code 配置

### 推荐插件

安装以下 VS Code 插件以获得最佳开发体验：

1. **ESLint** - `dbaeumer.vscode-eslint`
2. **Prettier** - `esbenp.prettier-vscode`
3. **EditorConfig** - `EditorConfig.EditorConfig`

### 用户设置

在项目根目录创建 `.vscode/settings.json`：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

### 扩展推荐

创建 `.vscode/extensions.json`：

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "EditorConfig.EditorConfig",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

---

## 提交前检查清单

在提交代码之前，请确保：

### ✅ 必须完成

- [ ] 代码已通过 ESLint 检查（`npm run lint`）
- [ ] 代码已通过 Prettier 格式化（`npm run format`）
- [ ] TypeScript 类型检查通过（`npm run type-check`）
- [ ] 提交信息符合 Conventional Commits 规范
- [ ] 已添加必要的注释
- [ ] 已测试功能正常工作

### 🎯 推荐完成

- [ ] 已更新相关文档
- [ ] 已添加单元测试（如有）
- [ ] 已检查控制台无警告
- [ ] 已检查浏览器控制台无错误

### 📝 提交流程

```bash
# 1. 检查代码质量
npm run lint

# 2. 格式化代码
npm run format

# 3. 类型检查
npm run type-check

# 4. 添加文件
git add .

# 5. 提交（自动触发 lint-staged）
git commit -m "feat: 你的提交信息"

# 6. 推送
git push
```

### 🚨 自动检查

提交时会自动执行：

1. **lint-staged** - 对暂存的文件运行 ESLint 和 Prettier
2. **commitlint** - 验证提交信息格式
3. 如果任何检查失败，提交将被拒绝

---

## 常见问题

### Q: 为什么我的提交被拒绝了？

A: 可能原因：

- 提交信息不符合规范
- 代码未通过 ESLint 检查
- 代码格式不符合 Prettier 规则

解决方法：

```bash
# 修复代码格式
npm run lint:fix
npm run format

# 使用正确的提交格式
git commit -m "feat(editor): 添加新功能"
```

### Q: 如何跳过 Git Hooks？

A: 不推荐，但可以使用：

```bash
git commit --no-verify -m "your message"
```

### Q: VS Code 没有自动格式化？

A: 确保：

1. 已安装 Prettier 插件
2. 已启用 formatOnSave
3. 设置默认格式化器为 Prettier

### Q: 如何查看 Git Hooks？

A: 查看 `.husky/` 目录：

```bash
ls -la .husky/
```

---

## 工作流图示

```
开发代码
   ↓
保存文件（自动格式化）
   ↓
git add .
   ↓
git commit -m "type: message"
   ↓
lint-staged 检查
   ├─ ESLint ✓
   └─ Prettier ✓
   ↓
commitlint 检查
   └─ 提交格式 ✓
   ↓
提交成功 ✓
   ↓
git push
```

---

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

**享受编码的乐趣！** 🎉
