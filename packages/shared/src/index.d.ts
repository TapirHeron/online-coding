export * from './types';
export declare const defaultEditorConfig: {
  language: 'javascript';
  theme: 'vs-dark';
  fontSize: number;
  minimap: boolean;
  wordWrap: 'on';
  tabSize: number;
};
export declare function deepClone<T>(obj: T): T;
export declare function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void;
export declare function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void;
