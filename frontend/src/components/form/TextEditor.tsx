import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorProps,
  tablePlugin,
  imagePlugin,
  frontmatterPlugin,
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
    <div className="min-h-[400px] max-h-[700px] overflow-auto bg-agorium-800 rounded-md">
      <MDXEditor
        className="dark-theme dark-editor md h-full "
        plugins={[
          headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          linkDialogPlugin(),
          // imagePlugin(),
          tablePlugin(),
          // thematicBreakPlugin(),
          // frontmatterPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              css: "CSS",
              python: "Python",
              java: "Java",
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
