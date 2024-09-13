import clsx from "clsx";
import { ReactNode } from "react";

// eslint-disable-next-line react-refresh/only-export-components
function ContentRoot({ children }: { children: ReactNode }) {
  return (
    <div
      className={`
        overflow-y-auto overflow-x-hidden
        grid 
        grid-cols-1
        md:grid-cols-[auto_300px]
        lg:grid-cols-[var(--left-bar-width)_auto_var(--right-bar-width)]
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
    <div
      className={clsx(
        "space-y-6 pb-6",
        "max-lg:first:hidden",
        "md:py-6 md:sticky md:top-0 md:h-[var(--content-height)] md:overflow-auto",
      )}
    >
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
