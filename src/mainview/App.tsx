import { CodeEditor } from "./components/Editor";

export default function App() {
    return (
        <main>
            <div class="electrobun-webkit-app-region-drag title-bar"></div>
            <div style="display: flex; height: 100vh; flex-direction: column;">
                <header style="background: #333; color: white; padding: 10px;">My IDE</header>
                <div style="flex: 1;">
                    <CodeEditor />
                </div>
            </div>
        </main>
    );
}