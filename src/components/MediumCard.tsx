import { Box, Heading, Flex, GridItem, Icon, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { BiWrench } from 'react-icons/bi'

import { CardTextContainer } from '../components/Card'

function MediumCard({ link, imgSrc, name, description, stack }) {
  return (
    <GridItem>
      <Link href={link}>
        <a>
          <Box className="card tab-focus-outline">
            <Flex direction="column">
              <Box
                as={Image}
                src={imgSrc}
                alt="Post Thumbnail"
                position="relative"
                filter={'saturate(130%) brightness(110%)'}
                w="420px"
                h="240px"
                objectFit="cover"
                className="tab-focus-outline"
              ></Box>
              <CardTextContainer>
                <Heading
                  fontSize={{ base: 'md', md: 'lg' }}
                  textAlign="start"
                  // Don't want to cause height shift within 2 lines, somehow isn't 2.4em (1.2 * 2)
                  // minH="2.6em"
                  noOfLines={2}
                >
                  {name}
                </Heading>
                <Flex alignItems="center">{description}</Flex>
                <Flex alignItems="center">
                  <Icon as={BiWrench} marginEnd={2} />
                  {stack.join(', ')}
                </Flex>
              </CardTextContainer>
            </Flex>
          </Box>
        </a>
      </Link>
    </GridItem>
  )
}

export default MediumCard
