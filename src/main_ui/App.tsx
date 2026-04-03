import { CodeEditor } from "./components/Editor";
import { onMount } from "solid-js";

export default function App() {
    onMount(() => {
        console.log("OnMount evaulated")

        // 2. И только ПОТОМ говорим Bun, что мы готовы
        window.__electrobun.rpc.send('frontendReady');
    });

    return (
        <main>
            <div class="electrobun-webkit-app-region-drag title-bar">
                {/* Window controls should NOT be draggable */}
                <div class="window-controls electrobun-webkit-app-region-no-drag">
                    <button class="win-btn" id="close"></button>
                    <button class="win-btn" id="minimize"></button>
                    <button class="win-btn" id="maximize"></button>
                </div>
                <span class="title">My App</span>
            </div>
            <div class="container">
                <div class="box icon-bar"> A </div>
                <div class="box file-explorer"> B </div>
                <div class="box box-3"> C </div>
            </div>
        </main>
    );
}