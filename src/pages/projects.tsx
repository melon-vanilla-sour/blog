import MediumCard from '../components/MediumCard'

function Projects() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <MediumCard
        link="/post/holoview"
        imgSrc="projects/holoview-thumbnail.png?fm=webp&h=600"
        name="Holoview"
        description="A page to watch Hololive VTubers"
        stack={['React', 'Chakra UI', 'Vercel']}
      />
      <MediumCard
        link="/post/nextjs-contentful-blog"
        imgSrc="projects/blog-thumbnail.png"
        name="Blog"
        description="A static generated blog"
        stack={['Next.js', 'Chakra UI', 'Contentful', 'Vercel']}
      />
      <MediumCard
        link="/post/idol-sort"
        imgSrc="https://d2pdw9m8ako0ty.cloudfront.net/20240531-idolsort.jpeg"
        name="Idol Sort"
        description="An app that sorts and ranks Idols"
        stack={['Next.js', 'Docker', 'AWS', 'Chakra UI']}
      />
    </div>
  )
}

export default Projects
