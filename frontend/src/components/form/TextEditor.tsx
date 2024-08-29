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
} from "@mdxeditor/editor";

export function TextEditor({ ...props }: MDXEditorProps) {
  return (
    <MDXEditor
      className="dark-theme dark-editor md"
      plugins={[
        headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
        markdownShortcutPlugin(),
        listsPlugin(),
        // quotePlugin(),
        // linkPlugin(),
        // linkDialogPlugin(),
        // imagePlugin(),
        // tablePlugin(),
        // thematicBreakPlugin(),
        // frontmatterPlugin(),
        // codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
            </>
          ),
        }),
      ]}
      {...props}
    />
  );
}
