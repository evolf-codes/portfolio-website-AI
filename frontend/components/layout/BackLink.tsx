import Link from "next/link";

type Props = {
  href?: string;
  children?: string;
};

export function BackLink({ href = "/", children = "Back to work" }: Props) {
  return (
    <Link href={href} className="text-link inline-flex text-sm font-medium">
      {children}
    </Link>
  );
}
