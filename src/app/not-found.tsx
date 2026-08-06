import Link from "next/link";

// TODO(design): style the 404 to match the redesign.
export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <Link href="/">Return home</Link>
    </main>
  );
}
