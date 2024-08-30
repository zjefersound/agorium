import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownPreview({ children }: { children: string }) {
  return (
    <Markdown className="overflow-hidden markdown" remarkPlugins={[remarkGfm]}>
      {children}
    </Markdown>
  );
}
