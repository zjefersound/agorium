import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorProps,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  linkPlugin,
  linkDialogPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  ListsToggle,
  InsertCodeBlock,
  CodeToggle,
  codeMirrorPlugin,
  CreateLink,
  InsertTable,
} from "@mdxeditor/editor";

export function TextEditor({ ...props }: MDXEditorProps) {
  return (
    <div className="min-h-[400px] max-h-[700px] overflow-auto bg-agorium-800 ring-1 ring-agorium-700 rounded-md">
      <MDXEditor
        className="dark-theme dark-editor md h-full cm-s-dracula"
        plugins={[
          headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              css: "CSS",
              python: "Python",
              java: "Java",
              c: "C",
              csharp: "C#",
              ts: "Typescript",
            },
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <CodeToggle />
                <InsertCodeBlock />
                <CreateLink />
                <InsertTable />
              </>
            ),
          }),
          markdownShortcutPlugin(),
        ]}
        {...props}
      />
    </div>
  );
}
