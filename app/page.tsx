import { BlogPosts } from "app/components/posts";
import { getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daehun Lee — Developer & Product Manager",
  description:
    "웹 개발과 프로덕트 매니지먼트 경험을 바탕으로 생각하고, 쓰고, 공유하는 블로그.",
  openGraph: {
    title: "Daehun Lee — Developer & Product Manager",
    description:
      "웹 개발과 프로덕트 매니지먼트 경험을 바탕으로 생각하고, 쓰고, 공유하는 블로그.",
    url: baseUrl,
  },
};

export default function Page() {
  return (
    <section className="flex flex-col flex-1">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Who I am</h1>
      <ul className="mb-4">
        <li>{`👨🏻‍💻 3.5 years of experience in Web Development & Product Management`}</li>
        <li>{`📊 Building a financial ecosystem`}</li>
        <li>{`🧠 Think, Act, Learn, Repeat`}</li>
      </ul>
      <div className="my-8">
        <BlogPosts posts={getBlogPosts()} />
      </div>
    </section>
  );
}
