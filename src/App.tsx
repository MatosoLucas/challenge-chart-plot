import { Box, Flex, Button } from '@chakra-ui/react'
import placeholder from './components/data.json'
import Chart from './components/chart';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// export interface Data {
//   type: string,
//   select?: Array<string>
//   group?: Array<string>
//   os?: string,
//   browser?: string,
//   min_response_time?: number,
//   max_response_time?: number,
//   begin?: number,
//   end?: number,
// }

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

  const handleGenerate = () => {
    setData(inputData)
  }

  return (
    <Box>
      <Flex p={22} bg="gray.300">
        <Box fontSize="28px">Lucas Challenge</Box>
      </Flex>
      <Flex>
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
      <Flex p={6}>
        <ErrorBoundary fallback={<p>Error</p>}>
          <Chart chartdata={data} />
        </ErrorBoundary>
      </Flex>
      <Flex p={6} bottom="0" w="100%" bg="gray.300">
        <Button onClick={handleGenerate} colorScheme="blue">GENERATE CHART</Button>
      </Flex>
    </Box>
  )
}

export default App;
