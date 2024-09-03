import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "@mdxeditor/editor/style.css";
import "./styles/MDXEditor.css";
import "./styles/CodeMirrorDracula.css";
import "./styles/Markdown.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
