import { Box, Flex, Button} from '@chakra-ui/react'
import Chart from './components/chart';

function App() {
  return (
    <Box>
      <Flex p={22} bg="gray.300">
        <Box fontSize="28px">Lucas Challenge</Box>
      </Flex>
      <Flex>
        <textarea style={{width: '100%', fontSize: '120px'}}></textarea>
      </Flex>
      <Flex>
        <Chart />
      </Flex>
      <Flex p={6} bottom="0" w="100%" bg="gray.300">
        <Button colorScheme="blue">GENERATE CHART</Button>
      </Flex>
    </Box>
  )
}

export default App;
