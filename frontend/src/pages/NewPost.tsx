import { TextInput } from "../components/form/TextInput";
import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { Card } from "../components/ui/Card";
import {
  MDXEditor,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  SandpackConfig,
  ShowSandpackInfo,
  codeBlockPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";

const defaultSnippetContent = `
export default function App() {
return (
<div className="App">
<h1>Hello CodeSandbox</h1>
<h2>Start editing to see some magic happen!</h2>
</div>
);
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

export function NewPost() {
  return (
    <Content.Root>
      <Content.Sidebar>
        <NavigationCard />
        <PopularItemCard
          title="Popular tags"
          path="/tags"
          items={[
            { id: 1, label: "#biology", totalPosts: 53 },
            { id: 7, label: "#math", totalPosts: 43 },
            { id: 8, label: "#science", totalPosts: 41 },
            { id: 9, label: "#englsih", totalPosts: 31 },
            { id: 10, label: "#history", totalPosts: 12 },
          ]}
        />
        <PopularItemCard
          title="Popular categories"
          path="/categories"
          items={[
            { id: 2, label: "Issue", totalPosts: 286 },
            { id: 3, label: "Discussion", totalPosts: 233 },
            { id: 4, label: "Feedback", totalPosts: 211 },
            { id: 5, label: "Debate", totalPosts: 173 },
            { id: 6, label: "Tutorials", totalPosts: 163 },
          ]}
        />
      </Content.Sidebar>
      <Content.Main>
        <TextInput.Root className="h-[500px] ">
          <MDXEditor
            className="dark-theme dark-editor"
            markdown="hello world"
            plugins={[
              codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
              sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
              codeMirrorPlugin({
                codeBlockLanguages: { js: "JavaScript", css: "CSS" },
              }),
              toolbarPlugin({
                toolbarContents: () => (
                  <ConditionalContents
                    options={[
                      {
                        when: (editor) => editor?.editorType === "codeblock",
                        contents: () => <ChangeCodeMirrorLanguage />,
                      },
                      {
                        when: (editor) => editor?.editorType === "sandpack",
                        contents: () => <ShowSandpackInfo />,
                      },
                      {
                        fallback: () => (
                          <>
                            <InsertCodeBlock />
                            <InsertSandpack />
                          </>
                        ),
                      },
                    ]}
                  />
                ),
              }),
            ]}
          />
        </TextInput.Root>
      </Content.Main>
      <Content.Sidebar>
        <Card>Anything</Card>
      </Content.Sidebar>
    </Content.Root>
  );
}
