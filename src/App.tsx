import { Box, Flex, Button, Text } from '@chakra-ui/react'
import placeholder from './components/data.json'
import Chart from './components/chart';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export type DataStart = {
  type: 'start',
  timestamp: number,
  select: Array<string>,
  group: Array<string>
}

export type DataSpan = {
  type: 'span',
  timestamp: number,
  begin: number,
  end: number,
}

export type DataData = {
  type: 'data',
  timestamp: number,
  [key: string]: any
}

export type DataEnd = {
  type: 'end',
  timestamp: number
}

export type Data = DataStart | DataSpan | DataData | DataEnd

function App() {
  const [data, setData] = useState<Data[]>(placeholder as Data[])
  const [inputData, setInputData] = useState<Data[]>(placeholder as Data[])
  console.log(inputData)

  const handleGenerate = () => {
    setData(inputData)
  }

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Flex p={22} bg="gray.300">
        <Box fontSize="28px">Lucas Challenge</Box>
      </Flex>
      <Flex >
        <JSONInput
          id='a_unique_id'
          placeholder={placeholder}
          locale={locale}
          height='350px'
          width="100%"
          onChange={(e: any) => setInputData(e.jsObject)}
          waitAfterKeyPress={2000}
        />
      </Flex>
      <Flex p={6} h="350px">
        <ErrorBoundary resetKeys={[data]} fallback={
          <Box w="100%" h="350px" textAlign="center">
            <Text p={12} fontSize="28px"> Something went wrong while plotting your graph! Check your data! </Text>
          </Box>}
        >
          <Chart chartdata={data} />
        </ErrorBoundary>
      </Flex>
      <Flex p={6} bottom="0" w="100%" bg="gray.300" mt="auto">
        <Button onClick={handleGenerate} colorScheme="blue">GENERATE CHART</Button>
      </Flex>
    </Flex>
  )
}

export default App;
