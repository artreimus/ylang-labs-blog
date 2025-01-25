'use client'

import { Bar, BarChart, XAxis, YAxis, LabelList } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import DiagramSubtitle from '@/components/DiagramSubtitle'

const data = [
  {
    benchmark: 'AIME 2024',
    'DeepSeek-R1': 79.8,
    'OpenAI-o1-1217': 79.2,
    'DeepSeek-R1-32B': 72.6,
    'OpenAI-o1-mini': 63.6,
    'DeepSeek-V3': 39.2,
    note: '(Pass@1)',
  },
  {
    benchmark: 'Codeforces',
    'DeepSeek-R1': 96.3,
    'OpenAI-o1-1217': 96.6,
    'DeepSeek-R1-32B': 90.6,
    'OpenAI-o1-mini': 93.4,
    'DeepSeek-V3': 58.7,
    note: '(Percentile)',
  },
  {
    benchmark: 'GPQA Diamond',
    'DeepSeek-R1': 71.5,
    'OpenAI-o1-1217': 75.7,
    'DeepSeek-R1-32B': 62.1,
    'OpenAI-o1-mini': 60.0,
    'DeepSeek-V3': 59.1,
    note: '(Pass@1)',
  },
  {
    benchmark: 'MATH-500',
    'DeepSeek-R1': 97.3,
    'OpenAI-o1-1217': 96.4,
    'DeepSeek-R1-32B': 94.3,
    'OpenAI-o1-mini': 90.0,
    'DeepSeek-V3': 90.2,
    note: '(Pass@1)',
  },
  {
    benchmark: 'MMLU',
    'DeepSeek-R1': 90.8,
    'OpenAI-o1-1217': 91.8,
    'DeepSeek-R1-32B': 87.4,
    'OpenAI-o1-mini': 85.2,
    'DeepSeek-V3': 88.5,
    note: '(Pass@1)',
  },
  {
    benchmark: 'SWE-bench Verified',
    'DeepSeek-R1': 49.2,
    'OpenAI-o1-1217': 48.9,
    'DeepSeek-R1-32B': 36.8,
    'OpenAI-o1-mini': 41.6,
    'DeepSeek-V3': 42.0,
    note: '(Resolved)',
  },
]

export default function BenchmarkChart() {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">Benchmark Performance of DeepSeek-R1</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <div className="min-w-full" style={{ width: '100%', minWidth: '800px' }}>
              <ChartContainer
                config={{
                  'DeepSeek-R1': {
                    label: 'DeepSeek-R1',
                    color: 'hsl(230, 80%, 70%)',
                  },
                  'OpenAI-o1-1217': {
                    label: 'OpenAI-o1-1217',
                    color: 'hsl(0, 0%, 80%)',
                  },
                  'DeepSeek-R1-32B': {
                    label: 'DeepSeek-R1-32B',
                    color: 'hsl(230, 80%, 85%)',
                  },
                  'OpenAI-o1-mini': {
                    label: 'OpenAI-o1-mini',
                    color: 'hsl(0, 0%, 90%)',
                  },
                  'DeepSeek-V3': {
                    label: 'DeepSeek-V3',
                    color: 'hsl(230, 80%, 95%)',
                  },
                }}
                className="h-[500px] w-full"
              >
                <BarChart
                  data={data}
                  margin={{
                    top: 60,
                    right: 0,
                    left: 0,
                    bottom: 100,
                  }}
                >
                  <XAxis
                    dataKey="benchmark"
                    tickLine={false}
                    axisLine={false}
                    tick={({ x, y, payload }) => (
                      <g transform={`translate(${x},${y})`}>
                        <text
                          x={0}
                          y={0}
                          dy={16}
                          textAnchor="end"
                          fill="currentColor"
                          transform="rotate(-45)"
                        >
                          {payload.value}
                        </text>
                        <text
                          x={0}
                          y={15}
                          dy={16}
                          textAnchor="end"
                          fill="currentColor"
                          transform="rotate(-45)"
                          className="text-xs opacity-70"
                        >
                          {data.find((item) => item.benchmark === payload.value)?.note}
                        </text>
                      </g>
                    )}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 100]}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload) return null
                      return (
                        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                          <div className="grid grid-cols-2 gap-2">
                            {payload.map((entry) => (
                              <div key={entry.name} className="flex items-center gap-2">
                                <div
                                  className="h-3 w-3 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-sm font-medium dark:text-gray-200">
                                  {entry.name}:
                                </span>
                                <span className="text-sm dark:text-gray-300">{entry.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }}
                  />
                  <Bar dataKey="DeepSeek-R1" fill="var(--color-DeepSeek-R1)" radius={[4, 4, 0, 0]}>
                    <LabelList
                      dataKey="DeepSeek-R1"
                      position="top"
                      formatter={(value) => `${value}%`}
                      className="fill-current text-[8px] font-medium"
                      offset={10}
                    />
                  </Bar>
                  <Bar
                    dataKey="OpenAI-o1-1217"
                    fill="var(--color-OpenAI-o1-1217)"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList
                      dataKey="OpenAI-o1-1217"
                      position="top"
                      formatter={(value) => `${value}%`}
                      className="fill-current text-[8px] font-medium"
                      offset={10}
                    />
                  </Bar>
                  <Bar
                    dataKey="DeepSeek-R1-32B"
                    fill="var(--color-DeepSeek-R1-32B)"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList
                      dataKey="DeepSeek-R1-32B"
                      position="top"
                      formatter={(value) => `${value}%`}
                      className="fill-current text-[8px] font-medium"
                      offset={10}
                    />
                  </Bar>
                  <Bar
                    dataKey="OpenAI-o1-mini"
                    fill="var(--color-OpenAI-o1-mini)"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList
                      dataKey="OpenAI-o1-mini"
                      position="top"
                      formatter={(value) => `${value}%`}
                      className="fill-current text-[8px] font-medium"
                      offset={10}
                    />
                  </Bar>
                  <Bar dataKey="DeepSeek-V3" fill="var(--color-DeepSeek-V3)" radius={[4, 4, 0, 0]}>
                    <LabelList
                      dataKey="DeepSeek-V3"
                      position="top"
                      formatter={(value) => `${value}%`}
                      className="fill-current text-[8px] font-medium"
                      offset={10}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {Object.entries({
              'DeepSeek-R1': 'hsl(230, 80%, 70%)',
              'OpenAI-o1-1217': 'hsl(0, 0%, 80%)',
              'DeepSeek-R1-32B': 'hsl(230, 80%, 85%)',
              'OpenAI-o1-mini': 'hsl(0, 0%, 90%)',
              'DeepSeek-V3': 'hsl(230, 80%, 95%)',
            }).map(([model, color]) => (
              <div key={model} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-sm font-medium">{model}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <DiagramSubtitle>
        Figure: Comparison of model performance across different benchmarks. Higher scores indicate
        better performance.
      </DiagramSubtitle>
    </>
  )
}
