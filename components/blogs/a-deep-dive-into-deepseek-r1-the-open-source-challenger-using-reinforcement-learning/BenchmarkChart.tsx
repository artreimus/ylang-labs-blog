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

interface BenchmarkChartProps {
  figureNumber?: number
  subtitle?: string
}

export default function BenchmarkChart({ figureNumber, subtitle }: BenchmarkChartProps) {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-lg md:text-xl">
            Benchmark Performance of DeepSeek-R1
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-full" style={{ width: '100%', minWidth: '500px' }}>
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
                className="h-[320px] w-full md:h-[460px]"
              >
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 10,
                    left: 10,
                    bottom: 60,
                  }}
                  barSize={28}
                >
                  <XAxis
                    dataKey="benchmark"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    tick={({ x, y, payload }) => (
                      <g transform={`translate(${x},${y})`}>
                        <text
                          x={0}
                          y={0}
                          dy={16}
                          textAnchor="end"
                          fill="currentColor"
                          transform="rotate(-35)"
                          className="text-[12px] md:text-[14px]"
                        >
                          {payload.value}
                        </text>
                        <text className="hidden text-[10px] opacity-70 md:inline">
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
                    className="text-xs md:text-sm"
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload) return null
                      return (
                        <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                          <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
                            {payload.map((entry) => (
                              <div key={entry.name} className="flex items-center gap-2">
                                <div
                                  className="h-3 w-3 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-xs font-medium dark:text-gray-200 md:text-sm">
                                  {entry.name}:
                                </span>
                                <span className="text-xs dark:text-gray-300 md:text-sm">
                                  {entry.value}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }}
                  />
                  {[
                    'DeepSeek-R1',
                    'OpenAI-o1-1217',
                    'DeepSeek-R1-32B',
                    'OpenAI-o1-mini',
                    'DeepSeek-V3',
                  ].map((model) => (
                    <Bar
                      key={model}
                      dataKey={model}
                      fill={`var(--color-${model})`}
                      radius={[4, 4, 0, 0]}
                    >
                      <LabelList
                        dataKey={model}
                        position="top"
                        formatter={(value) => `${value}%`}
                        className="hidden fill-current text-[10px] font-medium md:inline md:text-[9px]"
                        offset={12}
                      />
                    </Bar>
                  ))}
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 md:gap-4">
            {Object.entries({
              'DeepSeek-R1': 'hsl(230, 80%, 70%)',
              'OpenAI-o1-1217': 'hsl(0, 0%, 80%)',
              'DeepSeek-R1-32B': 'hsl(230, 80%, 85%)',
              'OpenAI-o1-mini': 'hsl(0, 0%, 90%)',
              'DeepSeek-V3': 'hsl(230, 80%, 95%)',
            }).map(([model, color]) => (
              <div key={model} className="flex items-center gap-1 md:gap-2">
                <div
                  className="h-2 w-2 rounded-full md:h-3 md:w-3"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-medium md:text-sm">{model}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <DiagramSubtitle figureNumber={figureNumber}>{subtitle}</DiagramSubtitle>
    </>
  )
}
