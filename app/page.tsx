import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Who I am
      </h1>
      <ul className="mb-4">
        <li>{`👨🏻‍💻 3+ years of experience, working as a Frontend developer.`}</li>
        <li>{`🛴 Contributing to a shared mobility service, THE SWING.`}</li>
        <li>{`👥 The Essence of a developer is solving user's needs & business problems.`}</li>
      </ul>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
