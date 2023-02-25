import { Box, Icon, IconButton } from '@chakra-ui/react'
import { BsArrowUpCircle } from 'react-icons/bs'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const TopButton = () => {
  return (
    <Box onClick={scrollToTop}>
      <IconButton
        aria-label="Scroll To Top"
        icon={<BsArrowUpCircle></BsArrowUpCircle>}
        display={{ base: 'none', sm: 'flex' }}
        position="fixed"
        bottom={4}
        right={4}
        size="lg"
      ></IconButton>
    </Box>
  )
}

export default TopButton
