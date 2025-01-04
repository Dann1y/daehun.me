import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section className="flex flex-col flex-1">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Who I am
      </h1>
      <ul className="mb-4">
        <li>{`👨🏻‍💻 Solving problems, working as a Product Manager.`}</li>
        <li>{`🏍️ Contributing to a shared mobility service, THE SWING.`}</li>
        <li>{`🧠 Think, Act, Learn, Repeat.`}</li>
      </ul>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
