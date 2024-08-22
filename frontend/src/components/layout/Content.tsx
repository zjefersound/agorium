import { ReactNode } from "react";

// eslint-disable-next-line react-refresh/only-export-components
function ContentRoot({ children }: { children: ReactNode }) {
  return (
    <div
      className={`
        overflow-y-auto overflow-x-hidden
        grid 
        grid-cols-1
        md:grid-cols-[var(--left-bar-width)_auto_var(--right-bar-width)]
        px-[var(--page-padding-x)] justify-center
      `}
    >
      {children}
    </div>
  );
}
ContentRoot.displayName = "Content.Root";

// eslint-disable-next-line react-refresh/only-export-components
function ContentMain({ children }: { children: ReactNode }) {
  return (
    <main
      className={`
        py-6 px-[var(--main-content-padding-x)] space-y-6 
        w-[var(--main-content-width)] 
        max-w-[var(--main-content-max-width)] 
      `}
    >
      {children}
    </main>
  );
}
ContentMain.displayName = "Content.Main";

// eslint-disable-next-line react-refresh/only-export-components
function ContentSidebar({ children }: { children: ReactNode }) {
  return (
    <div className="hidden md:block space-y-6 py-6 sticky top-0 h-[var(--content-height)] overflow-auto">
      {children}
    </div>
  );
}
ContentMain.displayName = "Content.Sidebar";

export const Content = {
  Root: ContentRoot,
  Main: ContentMain,
  Sidebar: ContentSidebar,
};
