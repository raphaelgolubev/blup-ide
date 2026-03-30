/// <reference types="vite/client" />

/*
Это необходимо для импортов вроде:
"import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';"

мы говорим тайп скрипту, что все импорты, которые имеют суффик ?worker должны вернуть конструктор
*/

declare module '*?worker' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}
