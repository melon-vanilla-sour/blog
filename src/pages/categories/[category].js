import { buildClient } from '../../lib/contentful'
import Pagination from '../../components/Pagination'
import { Heading } from '@chakra-ui/react'

const client = buildClient()

export const getStaticPaths = async () => {
  const { items: categories } = await client.getEntries({
    content_type: 'post',
    order: '-sys.createdAt',
    select: 'fields.category',
  })
  // Since 'category' isn't a required field for post, some category entries don't have a 'fields' key
  categories.filter((category) => {
    category.fields != null
  })
  const nonDuplicateCategories = []
  categories.map((category) => {
    if (!nonDuplicateCategories.includes(category.fields.category)) {
      nonDuplicateCategories.push(category.fields.category)
    }
  })
  const paths = []
  nonDuplicateCategories.map((category) => {
    paths.push({ params: { category: category } })
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      category: params.category,
    },
  }
}

function Category({ category }) {
  return (
    <>
      <Heading my={8}>{category}</Heading>
      <Pagination></Pagination>
    </>
  )
}

export default Category
