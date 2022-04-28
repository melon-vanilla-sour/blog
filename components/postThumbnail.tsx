import { Center, Heading, Box } from '@chakra-ui/react'
import Link from 'next/link'

const PostThumbnail = ({ post }) => {
  return (
    <li key={post.sys.id}>
      <Box border="1px solid" p="6" mt="6" mb="6" rounded="md">
        <Link href={`/${post.fields.slug}`}>
          <a>
            <h2>{post.fields.title}</h2>
            <p>{post.sys.createdAt}</p>
          </a>
        </Link>
      </Box>
    </li>
  )
}

export default PostThumbnail
