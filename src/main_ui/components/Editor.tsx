import { onMount, onCleanup } from "solid-js";
import * as monaco from "monaco-editor";

// Настройка воркеров для Vite
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label == "json") return new jsonWorker();
        if (label == "typescript" || label == "javascript") return new tsWorker();
        return new editorWorker();
    }
};

export const CodeEditor = () => {
    let parentRef: HTMLDivElement | undefined;
    let editor: monaco.editor.IStandaloneCodeEditor;

    onMount(() => {
        if (parentRef) {
            editor = monaco.editor.create(parentRef, {
                value: 'console.log("Hello Solid + Electrobun!");',
                language: 'typescript',
                theme: 'vs-dark',
                automaticLayout: true, // Важно для изменения размера в IDE
                fontSize: 14,
                minimap: { enabled: true }
            });
        }
    });

    onCleanup(() => editor?.dispose());

    return (
        <div
            ref={parentRef}
            style="height: 100%; width: 100%; min-height: 500px;"
        />
    )
};