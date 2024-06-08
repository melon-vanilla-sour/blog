import { Grid } from '@chakra-ui/react'

import MediumCard from '../components/MediumCard'

function Projects() {
  return (
    <Grid my={8} templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={6}>
      <MediumCard
        link="/post/holoview"
        imgSrc="projects/holoview-thumbnail.png?fm=webp&h=600"
        name="Holoview"
        description="A page to watch Hololive VTubers"
        stack={['React', 'Chakra UI', 'Vercel']}
      ></MediumCard>
      <MediumCard
        link="/post/nextjs-contentful-blog"
        imgSrc="projects/blog-thumbnail.png"
        name="Blog"
        description="A static generated blog"
        stack={['Next.js', 'Chakra UI', 'Contentful', 'Vercel']}
      ></MediumCard>
      <MediumCard
        link="/post/idol-sort"
        imgSrc="https://d2pdw9m8ako0ty.cloudfront.net/20240531-idolsort.jpeg"
        name="Idol Sort"
        description="An app that sorts and ranks Idols"
        stack={['Next.js', 'Docker', 'AWS', 'Chakra UI']}
      ></MediumCard>
    </Grid>
  )
}

export default Projects
