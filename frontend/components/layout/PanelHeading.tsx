import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function PanelHeading({ children }: Props) {
  return <h2 className="type-panel-title">{children}</h2>;
}
