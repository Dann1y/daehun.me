import { BlogPosts } from "app/components/posts";

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
        <BlogPosts />
      </div>
    </section>
  );
}
