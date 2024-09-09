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
import { memo } from "react";

function TextEditor({ ...props }: MDXEditorProps) {
  return (
    <MDXEditor
      className="markdown dark-theme dark-editor h-full w-full cm-s-dracula"
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
            ts: "Typescript",
            css: "CSS",
            html: "HTML",
            php: "PHP",
            python: "Python",
            java: "Java",
            c: "C",
            csharp: "C#",
            bash: "Bash",
            shell: "Shell",
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
  );
}

const MemoizedTextEditor = memo(TextEditor);
export { MemoizedTextEditor as TextEditor };
