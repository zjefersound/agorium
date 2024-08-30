import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "@mdxeditor/editor/style.css";
import "./styles/MDXEditor.css";
import "./styles/CodeMirror.css";
import "./styles/Markdown.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
