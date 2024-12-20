import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col flex-1">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        404 - Page Not Found
      </h1>
      <p className="mb-4">You might find what you are looking for in the <Link className="text-blue-500" href="https://legacy.daehun.me">legacy page</Link>.</p>
    </section>
  )
}
