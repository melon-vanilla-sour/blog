import {
  Box,
  Flex,
  Grid,
  Heading,
  useColorModeValue,
  Text,
  Image,
  GridItem,
} from '@chakra-ui/react'
import React from 'react'

interface TechIconProps {
  site?: string
  image: string
  name: string
}

const TechIcon = ({ site, image, name }: TechIconProps) => {
  return (
    <Flex flexDir="column">
      <a href={site}>
        <img src={image} />
      </a>
      <Text fontSize="sm" textAlign="center" marginTop={4}>
        {name}
      </Text>
    </Flex>
  )
}

// const colors = ['#faa89a', '#f7a9b6', '#c1bcc2', '#cbd3c4', '#fbd79b']
// const colors = ['#5C4B51', ' #8CBEB2', ' #F2EBBF', ' #F3B562', '#F06060']
// const techStack = ['Js', 'Ruby', 'Php', 'Bash', 'Rust']

function HomePage({ posts }) {
  return (
    <>
      <Box my={8}>
        <Flex flexDir="column" alignItems="center">
          <Text>Hi I'm a Web Developer in Tokyo</Text>
          <Text>Contact me at melonvanillasour[at]gmail.com</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Grid
            className="iconGrid"
            my={{ base: 4, sm: 6 }}
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)' }}
          >
            <svg viewBox="0 0 128 128" width="100%">
              <path
                fill={useColorModeValue('#000', '#fff')}
                d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23 23 0 0180 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1h21.81z"
              ></path>
            </svg>

            <svg viewBox="0 0 128 128" width="100%">
              <path
                fill={useColorModeValue('#000', '#fff')}
                d="M82.518 54.655c-12.92 8.326-25.722 16.577-38.862 25.043l58.715 8.016-19.853-33.059zm25.409-36.843c-1.735 2.604-3.473 5.207-5.205 7.813A46257.18 46257.18 0 0084.881 52.48c-.331.5-.76.896-.294 1.664 5.744 9.483 11.441 18.996 17.152 28.498.901 1.501 1.813 2.996 2.979 4.436l3.463-69.191-.254-.075zM29.529 47.38c.269.255.94.402 1.251.249 5.509-2.708 11.053-5.355 16.442-8.286 1.756-.954 3.106-2.667 4.621-4.055a9782.293 9782.293 0 0015.021-13.812c.307-.283.668-.556.852-.913 1.797-3.513 3.562-7.042 5.391-10.675-2.181-.817-4.248-1.62-6.34-2.35-.284-.099-.73.098-1.04.27-4.843 2.706-9.777 5.267-14.467 8.218-2.347 1.476-4.259 3.651-6.337 5.547-3.347 3.056-6.692 6.119-9.992 9.229a17.14 17.14 0 00-2.355 2.76c-2.258 3.286-4.446 6.619-6.737 10.048 1.282 1.326 2.445 2.592 3.69 3.77zm20.133-4.493c-2.739 11.577-5.465 23.088-8.279 34.978L80.284 52.8l-30.622-9.913zm21.837-19.441l11.22 27.292c7.324-11.001 14.502-21.785 21.843-32.815l-33.063 5.523zM50.122 40.519l30.012 9.743c-3.761-9.163-7.393-18.005-11.101-27.035L50.122 40.519zM29.944 54.131L19.44 79.24l20.005-.591-9.501-24.518zm9.739 18.695l.248-.054c2.401-9.988 4.838-19.907 7.291-30.284l-16.05 8.341c2.735 7.112 5.653 14.612 8.511 21.997zm60.842-56.522c-3.195-.846-6.387-1.696-9.585-2.536-4.593-1.207-9.19-2.401-13.781-3.62-.573-.152-.989-.251-1.326.44-1.622 3.324-3.296 6.624-4.944 9.935-.051.103-.041.237-.08.492l29.71-4.502.006-.209zM81.993 8.742l26.037 7.203-4.302-12.258-21.696 4.811-.039.244zM89.875 88.1l-21.361-2.916c-8.873-1.211-17.73-2.544-26.623-3.569-3.225-.371-6.536-.029-9.806.026-2.687.046-5.374.148-8.06.233-.277.008-.553.064-.828.361 22.21 2.054 44.422 4.107 66.631 6.162l.047-.297zM19.878 71.576c2.864-6.641 5.712-13.287 8.586-19.922.288-.667.267-1.118-.296-1.653-1.203-1.145-2.319-2.378-3.634-3.744l-5.241 25.871.193.092c.133-.214.294-.414.392-.644zM76.29 6.989c4.827-1.246 9.724-2.218 14.592-3.305.314-.071.622-.175.932-.264l-.047-.238-20.916 2.813c1.965.859 3.478 1.5 5.439.994zM30.975 109.422v8.547h-4.724V95.692h6.491c3.026 0 5.266.551 6.719 1.653s2.18 2.776 2.18 5.02c0 1.311-.361 2.477-1.083 3.497-.721 1.021-1.741 1.822-3.063 2.401l6.553 9.705h-5.242l-5.317-8.547h-2.514zm0-3.84h1.524c1.492 0 2.595-.25 3.306-.747.71-.498 1.066-1.28 1.066-2.346 0-1.057-.363-1.808-1.09-2.255-.726-.447-1.851-.671-3.374-.671h-1.433v6.019zm27.578 12.387l-.624-2.179h-.244c-.498.793-1.204 1.404-2.117 1.836-.915.432-1.957.647-3.124.647-2.002 0-3.51-.535-4.526-1.607s-1.523-2.613-1.523-4.624v-11.108h4.647v9.95c0 1.229.219 2.151.656 2.766.436.615 1.131.921 2.086.921 1.301 0 2.24-.435 2.819-1.302.579-.869.869-2.308.869-4.319v-8.015h4.647v17.035h-3.566zm17.919-17.356c2.011 0 3.586.786 4.725 2.355 1.137 1.569 1.705 3.72 1.705 6.453 0 2.813-.587 4.992-1.759 6.535-1.174 1.545-2.771 2.316-4.793 2.316-2.001 0-3.57-.727-4.708-2.18h-.32l-.776 1.875h-3.551V94.26h4.647v5.516c0 .701-.062 1.823-.184 3.368h.184c1.086-1.686 2.697-2.531 4.83-2.531zm-1.494 3.719c-1.147 0-1.985.353-2.513 1.059-.528.707-.804 1.872-.823 3.498v.502c0 1.829.271 3.139.814 3.932.544.792 1.405 1.188 2.584 1.188.954 0 1.713-.44 2.277-1.318s.846-2.156.846-3.832c0-1.676-.285-2.934-.854-3.772-.568-.838-1.345-1.257-2.331-1.257zm9.021-3.398h5.089l3.215 9.584c.274.833.463 1.818.563 2.956h.092c.111-1.046.329-2.032.654-2.956l3.154-9.584h4.982l-7.207 19.214c-.66 1.777-1.602 3.108-2.825 3.992-1.225.884-2.654 1.325-4.29 1.325-.803 0-1.59-.086-2.361-.259v-3.687a8.004 8.004 0 001.828.197c.822 0 1.541-.251 2.156-.754.615-.502 1.095-1.261 1.439-2.277l.274-.839-6.763-16.912z"
              ></path>
            </svg>

            <svg viewBox="0 0 128 128" width="100%">
              <path
                fill={useColorModeValue('#000', '#fff')}
                d="M64 33.039C30.26 33.039 2.906 46.901 2.906 64S30.26 94.961 64 94.961 125.094 81.099 125.094 64 97.74 33.039 64 33.039zM48.103 70.032c-1.458 1.364-3.077 1.927-4.86 2.507-1.783.581-4.052.461-6.811.461h-6.253l-1.733 10h-7.301l6.515-34H41.7c4.224 0 7.305 1.215 9.242 3.432 1.937 2.217 2.519 5.364 1.747 9.337-.319 1.637-.856 3.159-1.614 4.515a15.118 15.118 0 01-2.972 3.748zM69.414 73l2.881-14.42c.328-1.688.208-2.942-.361-3.555-.57-.614-1.782-1.025-3.635-1.025h-5.79l-3.731 19h-7.244l6.515-33h7.244l-1.732 9h6.453c4.061 0 6.861.815 8.402 2.231s2.003 3.356 1.387 6.528L76.772 73h-7.358zm40.259-11.178c-.318 1.637-.856 3.133-1.613 4.488-.758 1.357-1.748 2.598-2.971 3.722-1.458 1.364-3.078 1.927-4.86 2.507-1.782.581-4.053.461-6.812.461h-6.253l-1.732 10h-7.301l6.514-34h14.041c4.224 0 7.305 1.215 9.241 3.432 1.935 2.217 2.518 5.418 1.746 9.39zM95.919 54h-5.001l-2.727 14h4.442c2.942 0 5.136-.29 6.576-1.4 1.442-1.108 2.413-2.828 2.918-5.421.484-2.491.264-4.434-.66-5.458-.925-1.024-2.774-1.721-5.548-1.721zm-56.985 0h-5.002l-2.727 14h4.441c2.943 0 5.136-.29 6.577-1.4 1.441-1.108 2.413-2.828 2.917-5.421.484-2.491.264-4.434-.66-5.458S41.708 54 38.934 54z"
              ></path>
            </svg>

            <svg viewBox="0 0 128 128" width="100%">
              <path fill="none" d="M4.24 4.24h119.53v119.53H4.24z"></path>
              <path
                fill={useColorModeValue('#000', '#fff')}
                d="M109.01 28.64L71.28 6.24c-2.25-1.33-4.77-2-7.28-2s-5.03.67-7.28 2.01l-37.74 22.4c-4.5 2.67-7.28 7.61-7.28 12.96v44.8c0 5.35 2.77 10.29 7.28 12.96l37.73 22.4c2.25 1.34 4.76 2 7.28 2 2.51 0 5.03-.67 7.28-2l37.74-22.4c4.5-2.67 7.28-7.62 7.28-12.96V41.6c0-5.34-2.77-10.29-7.28-12.96zM79.79 98.59l.06 3.22c0 .39-.25.83-.55.99l-1.91 1.1c-.3.15-.56-.03-.56-.42l-.03-3.17c-1.63.68-3.29.84-4.34.42-.2-.08-.29-.37-.21-.71l.69-2.91c.06-.23.18-.46.34-.6.06-.06.12-.1.18-.13.11-.06.22-.07.31-.03 1.14.38 2.59.2 3.99-.5 1.78-.9 2.97-2.72 2.95-4.52-.02-1.64-.9-2.31-3.05-2.33-2.74.01-5.3-.53-5.34-4.57-.03-3.32 1.69-6.78 4.43-8.96l-.03-3.25c0-.4.24-.84.55-1l1.85-1.18c.3-.15.56.04.56.43l.03 3.25c1.36-.54 2.54-.69 3.61-.44.23.06.34.38.24.75l-.72 2.88c-.06.22-.18.44-.33.58a.77.77 0 01-.19.14c-.1.05-.19.06-.28.05-.49-.11-1.65-.36-3.48.56-1.92.97-2.59 2.64-2.58 3.88.02 1.48.77 1.93 3.39 1.97 3.49.06 4.99 1.58 5.03 5.09.05 3.44-1.79 7.15-4.61 9.41zm26.34-60.5l-35.7 22.05c-4.45 2.6-7.73 5.52-7.74 10.89v43.99c0 3.21 1.3 5.29 3.29 5.9-.65.11-1.32.19-1.98.19-2.09 0-4.15-.57-5.96-1.64l-37.73-22.4c-3.69-2.19-5.98-6.28-5.98-10.67V41.6c0-4.39 2.29-8.48 5.98-10.67l37.74-22.4c1.81-1.07 3.87-1.64 5.96-1.64s4.15.57 5.96 1.64l37.74 22.4c3.11 1.85 5.21 5.04 5.8 8.63-1.27-2.67-4.09-3.39-7.38-1.47z"
              ></path>
              <path
                fill={useColorModeValue('#fff', '#000')}
                d="M99.12 90.73l-9.4 5.62c-.25.15-.43.31-.43.61v2.46c0 .3.2.43.45.28l9.54-5.8c.25-.15.29-.42.29-.72v-2.17c0-.3-.2-.42-.45-.28z"
              ></path>
            </svg>

            <svg viewBox="0 0 128 128" width="100%">
              <path
                fill={useColorModeValue('#000', '#fff')}
                d="M62.271 10.88c-.189.11-.982 1.248-1.763 2.529-1.96 3.217-1.982 3.219-4.615.448-1.713-1.802-2.127-2.132-2.679-2.128-.359.002-.812.124-1.008.271-.195.147-.748 1.317-1.228 2.6-1.099 2.939-1.152 3.034-1.761 3.151-.375.071-1.097-.331-2.828-1.574-1.278-.919-2.532-1.67-2.786-1.67-1.054 0-1.351.576-1.853 3.593-.638 3.836-.616 3.823-4.074 2.252-1.396-.633-2.72-1.152-2.943-1.152-.223 0-.646.24-.939.533-.532.533-.533.535-.388 3.468l.146 2.936-.555.297c-.492.263-.831.231-3.009-.284-2.843-.671-3.443-.653-4.019.122l-.421.566.565 2.421c.31 1.331.609 2.613.665 2.848.055.234-.04.609-.212.832-.284.367-.586.4-3.217.36-4.453-.07-4.706.312-2.866 4.328.585 1.275 1.064 2.433 1.064 2.572 0 .734-.585 1.001-3.098 1.411-1.406.229-2.628.417-2.716.417-.088 0-.352.192-.586.426-.765.765-.548 1.483 1.187 3.932 2.161 3.05 2.157 3.061-1.413 4.427-4.06 1.553-4.142 1.936-1.051 4.868 2.879 2.73 2.882 2.69-.377 4.739-2.469 1.551-2.507 1.588-2.57 2.429-.076 1.023-.058 1.041 2.89 2.842 2.915 1.78 2.915 1.834.054 4.541-3.077 2.91-2.982 3.335 1.081 4.868 3.55 1.339 3.555 1.355 1.39 4.405-1.227 1.729-1.618 2.449-1.618 2.983 0 .999.52 1.254 3.627 1.776 2.617.441 3.2.7 3.2 1.422 0 .148-.48 1.316-1.067 2.594-1.826 3.977-1.618 4.308 2.704 4.308 4.025 0 3.918-.123 3.051 3.507-.654 2.736-.664 3.26-.072 3.851.453.454 1.307.403 3.978-.236 2.04-.487 2.398-.521 2.871-.268l.54.289-.146 2.935c-.145 2.934-.144 2.936.388 3.469.293.293.722.533.952.533.23 0 1.554-.516 2.943-1.147 3.447-1.565 3.425-1.578 4.061 2.246.504 3.031.798 3.594 1.874 3.594.267 0 1.494-.72 2.728-1.6 2.167-1.546 2.729-1.788 3.306-1.421.149.094.727 1.364 1.284 2.822.819 2.144 1.119 2.702 1.575 2.92.868.416 1.405.082 3.445-2.14 2.463-2.683 2.564-2.67 4.575.589 2.221 3.598 2.796 3.59 5.073-.073 1.962-3.156 1.939-3.154 4.591-.384 1.761 1.838 2.136 2.131 2.73 2.131.379 0 .832-.142 1.005-.316.174-.174.75-1.459 1.28-2.855.53-1.397 1.079-2.613 1.221-2.703.561-.357 1.142-.106 3.306 1.43 1.274.905 2.473 1.6 2.758 1.6 1.058 0 1.44-.751 1.88-3.703.376-2.517.452-2.758.947-3.009.487-.247.779-.164 3.063.873 1.389.63 2.713 1.146 2.943 1.146.23 0 .666-.247.967-.549l.549-.548-.151-2.815c-.144-2.688-.131-2.832.298-3.22.441-.399.486-.397 2.952.166 2.986.682 3.543.7 4.104.139.548-.548.542-.668-.208-3.831-.841-3.548-.954-3.422 3.088-3.422 2.755 0 3.062-.039 3.413-.426.586-.648.447-1.39-.732-3.903-.595-1.266-1.078-2.418-1.074-2.56.02-.747.607-1.002 3.32-1.443 1.66-.269 2.902-.581 3.127-.784.754-.681.477-1.567-1.244-3.98-2.157-3.024-2.148-3.053 1.306-4.326 4.136-1.524 4.254-2.032 1.159-4.973-2.867-2.724-2.868-2.709.272-4.637 3.796-2.33 3.802-2.855.067-5.173-3.212-1.993-3.21-1.965-.331-4.699 3.088-2.934 3.004-3.318-1.057-4.871-3.584-1.371-3.595-1.405-1.417-4.394 1.297-1.78 1.618-2.371 1.618-2.981 0-1.066-.478-1.305-3.622-1.813-2.627-.424-3.205-.682-3.205-1.429 0-.142.48-1.285 1.067-2.542 1.149-2.461 1.31-3.446.66-4.035-.349-.316-.817-.361-3.321-.32-2.62.044-2.955.007-3.318-.358-.397-.399-.393-.455.227-3.042.76-3.17.763-3.247.138-3.834-.634-.596-1.03-.586-3.941.099-2.121.5-2.472.533-2.954.275l-.547-.293.151-2.926.152-2.925-.547-.547c-.301-.301-.728-.547-.95-.547-.221 0-1.538.523-2.926 1.161-2.318 1.067-2.567 1.138-3.068.876-.5-.262-.583-.52-1.01-3.127-.493-3.016-.798-3.603-1.869-3.603-.254 0-1.513.755-2.798 1.678-2.11 1.516-2.393 1.659-2.919 1.476-.435-.152-.688-.483-.997-1.306-.229-.606-.667-1.774-.975-2.595-.622-1.656-.969-2.027-1.901-2.027-.52 0-.991.374-2.679 2.127-2.653 2.756-2.663 2.755-4.614-.445-.78-1.279-1.595-2.421-1.812-2.537-.488-.262-1.062-.261-1.511.002m2.418 9.635c2.311 1.645 1.082 5.512-1.752 5.512-2.75 0-4.135-3.313-2.171-5.194 1.108-1.062 2.697-1.191 3.923-.318m-2.906 10.214c1.515.576 2.137.23 5.596-3.104l2.599-2.506 1.1.146c3.45.458 10.312 3.472 14.255 6.261 3.623 2.564 8.438 7.786 10.49 11.377l.439.769-1.944 4.38c-1.07 2.409-1.945 4.633-1.945 4.944 0 .717.47 1.851.923 2.226.191.159 2.006 1.033 4.033 1.942l3.684 1.654.145.937c.187 1.221.212 4.22.042 5.072l-.133.666h-2.103c-2.439 0-2.251-.218-2.383 2.774-.096 2.169-.62 3.368-1.812 4.144-1.942 1.267-5.149 1.037-6.509-.466-.209-.231-.615-1.392-.903-2.581-.841-3.473-1.971-5.423-4.241-7.32-.717-.599-1.303-1.158-1.303-1.243 0-.084.788-.748 1.752-1.473 3.51-2.646 5.528-5.726 5.75-8.777.423-5.819-4.213-11.243-11.109-13.001-1.635-.417-2.333-.43-22.56-.43-11.48 0-20.873-.075-20.873-.166 0-.215 2.551-2.691 4.054-3.933 4.127-3.412 9.488-6.097 15.04-7.531l1.92-.497 2.728 2.766c1.501 1.521 2.972 2.857 3.268 2.97M27.432 48.526c1.257.823 1.772 2.891 1.03 4.134-1.148 1.924-4.056 2.005-5.205.145-1.671-2.702 1.547-6.001 4.175-4.279m74.05.105c3.288 2.005.74 6.937-2.78 5.38-2.35-1.04-2.425-4.252-.127-5.424.959-.489 2.061-.472 2.907.044M37.12 60.907v12.266H26.276l-.43-1.866c-.846-3.675-1.202-7.477-.989-10.591l.149-2.188 3.728-1.672c2.339-1.048 3.843-1.847 4.037-2.144.848-1.293.767-2.217-.423-4.845l-.556-1.227h5.328v12.267m31.22-11.733c2.322.604 3.549 1.833 3.552 3.556.002 1.265-.625 2.059-2.18 2.761-1.101.498-1.276.51-8.219.578l-7.093.068v-7.284h6.355c4.964 0 6.625.07 7.585.321m-2.396 17.602c1.151.32 2.512 1.32 3.21 2.359.733 1.092 1.162 2.512 2.178 7.216.858 3.976 1.41 5.276 2.956 6.968 1.915 2.095 1.471 2.014 11.037 2.014 4.581 0 8.328.073 8.328.163 0 .161-3.155 3.891-3.291 3.891-.039 0-1.687-.345-3.662-.767-5.577-1.191-5.778-1.051-7.058 4.926l-.823 3.84-.743.366c-1.24.612-5.27 1.872-7.359 2.302-3.452.71-7.209.95-10.511.671-5.629-.477-13.083-2.661-13.374-3.92-.062-.267-.437-1.995-.832-3.841-.396-1.846-.877-3.597-1.069-3.891-.923-1.408-1.894-1.495-6.164-.55-1.617.358-3.028.65-3.136.65-.203 0-3.204-3.47-3.204-3.704 0-.073 7.128-.158 15.84-.188l15.84-.054.057-5.627c.04-3.973-.015-5.714-.187-5.92-.192-.232-1.214-.293-4.91-.293H54.4V66.56l5.387.001c2.962.001 5.733.098 6.157.215M41.536 92.365c2.519 1.535 1.311 5.557-1.668 5.554-3.055-.002-4.187-3.987-1.584-5.575.861-.525 2.374-.515 3.252.021m46.126.168c1.235.905 1.646 2.788.881 4.042-2.009 3.295-7.033.676-5.355-2.791.825-1.703 3.018-2.317 4.474-1.251"
                fillRule="evenodd"
              ></path>
            </svg>

            {/* <TechIcon
              image="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
              name="Javascript"
            />
            <TechIcon site="https://nextjs.org/" image="icons/nextdotjs.svg" name="Next.js" />
            <TechIcon image="icons/react.svg" name="React" />
            <TechIcon image="icons/chakraui.svg" name="Chakra UI" />
            <TechIcon site="https://nodejs.org/en/" image="icons/nodedotjs.svg" name="Node.js" />
            <TechIcon image="icons/ruby.svg" name="Ruby" />
            <TechIcon image="icons/php.svg" name="PHP" /> */}
          </Grid>
        </Flex>
      </Box>
    </>
  )
}

export default HomePage
