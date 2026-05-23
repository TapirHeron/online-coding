'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultEditorConfig = void 0;
exports.deepClone = deepClone;
exports.debounce = debounce;
exports.throttle = throttle;
__exportStar(require('./types'), exports);
// 默认编辑器配置
exports.defaultEditorConfig = {
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: 14,
  minimap: false,
  wordWrap: 'on',
  tabSize: 2
};
// 工具函数：深拷贝
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
// 工具函数：防抖
function debounce(func, wait) {
  let timeout = null;
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
// 工具函数：节流
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
