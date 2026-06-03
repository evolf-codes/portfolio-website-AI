import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="text-sm font-semibold text-neutral-500">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-black">Page not found</h1>
      <p className="mt-3 text-sm text-neutral-600">
        The page you requested does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex text-sm font-medium text-black underline"
      >
        Go to work
      </Link>
    </div>
  );
}
