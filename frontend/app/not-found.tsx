import Link from "next/link";
import { PageMain } from "@/components/layout/PageMain";

export default function NotFound() {
  return (
    <PageMain narrow className="text-center">
      <p className="type-eyebrow">404</p>
      <h1 className="type-section-title mt-3">Page not found</h1>
      <p className="type-body-muted mx-auto mt-4 max-w-sm">
        The page you requested does not exist.
      </p>
      <Link href="/" className="btn-secondary mt-8">
        Back to home
      </Link>
    </PageMain>
  );
}
