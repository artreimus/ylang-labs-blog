'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import DiagramSubtitle from '@/components/DiagramSubtitle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'

export const qwenRelativeThroughput = [
  { hardware: 'Ascend 910B', vllmAscend: 1, xllm: 1.9 },
  { hardware: 'Ascend 910C', vllmAscend: 1, xllm: 2.2 },
]

export const deepseekPdThroughput = [
  { framework: 'xLLM', throughput: 11351.58, requestRate: 5.54 },
  { framework: 'MindIE', throughput: 8476.44, requestRate: 4.14 },
]

const relativeConfig = {
  vllmAscend: {
    label: 'vLLM-Ascend baseline',
    theme: { light: '#6b7280', dark: '#9ca3af' },
  },
  xllm: {
    label: 'xLLM reported maximum',
    theme: { light: '#efc003', dark: '#ffd702' },
  },
} satisfies ChartConfig

const pdConfig = {
  throughput: {
    label: 'Output throughput (tokens/s)',
    theme: { light: '#507f31', dark: '#75b34a' },
  },
} satisfies ChartConfig

function formatMultiplier(value: number) {
  return `${value.toFixed(1)}×`
}

function formatTokens(value: number) {
  return Math.round(value).toLocaleString('en-US')
}

export default function XllmBenchmarkCharts() {
  return (
    <section aria-labelledby="xllm-benchmark-figures" className="my-10 min-w-0 space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary-700 dark:text-primary-400">
          Author-reported benchmark figures
        </p>
        <h3
          id="xllm-benchmark-figures"
          className="text-xl font-bold tracking-tight text-gray-950 dark:text-gray-50"
        >
          Two useful results, with different comparison boundaries
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          The Qwen chart normalizes vLLM-Ascend to 1× and shows the largest ratio reported across
          the tested model configurations. The DeepSeek-R1 chart shows one absolute PD result.
        </p>
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-2">
        <Card className="min-w-0 overflow-hidden border-gray-200 shadow-none dark:border-gray-800">
          <CardHeader className="space-y-2 pb-3">
            <CardTitle className="text-lg">Qwen-series peak relative throughput</CardTitle>
            <CardDescription>
              2,048 input and output tokens, TPOT capped at 50 ms. Peaks may come from different
              Qwen configurations.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-5">
            <ChartContainer
              config={relativeConfig}
              className="aspect-auto h-[240px] w-full min-w-0 sm:h-[280px]"
              role="img"
              aria-label="Grouped bar chart. Relative to a vLLM-Ascend baseline of one times, xLLM reports peaks of 1.9 times on Ascend 910B and 2.2 times on Ascend 910C."
            >
              <BarChart data={qwenRelativeThroughput} margin={{ top: 24, right: 8, left: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="hardware" tickLine={false} axisLine={false} />
                <YAxis
                  domain={[0, 2.5]}
                  ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
                  tickFormatter={formatMultiplier}
                  tickLine={false}
                  axisLine={false}
                  width={38}
                />
                <ChartTooltip
                  cursor={{ fill: 'rgb(var(--color-primary) / 0.08)' }}
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => (
                        <div className="flex min-w-[12rem] items-center justify-between gap-3">
                          <span className="text-muted-foreground">
                            {relativeConfig[name as keyof typeof relativeConfig]?.label}
                          </span>
                          <span className="font-mono font-medium tabular-nums text-foreground">
                            {formatMultiplier(Number(value))}
                          </span>
                        </div>
                      )}
                    />
                  }
                />
                <Bar dataKey="vllmAscend" fill="var(--color-vllmAscend)" radius={[4, 4, 0, 0]}>
                  <LabelList
                    dataKey="vllmAscend"
                    position="top"
                    formatter={(value) => formatMultiplier(Number(value))}
                    className="fill-gray-600 text-[11px] dark:fill-gray-300"
                  />
                </Bar>
                <Bar dataKey="xllm" fill="var(--color-xllm)" radius={[4, 4, 0, 0]}>
                  <LabelList
                    dataKey="xllm"
                    position="top"
                    formatter={(value) => formatMultiplier(Number(value))}
                    className="fill-gray-950 text-[11px] font-semibold dark:fill-gray-50"
                  />
                </Bar>
              </BarChart>
            </ChartContainer>

            <div className="sr-only overflow-hidden">
              <table aria-label="Qwen-series relative throughput data">
                <thead>
                  <tr>
                    <th>Hardware</th>
                    <th>vLLM-Ascend baseline</th>
                    <th>xLLM reported maximum</th>
                  </tr>
                </thead>
                <tbody>
                  {qwenRelativeThroughput.map((row) => (
                    <tr key={row.hardware}>
                      <td>{row.hardware}</td>
                      <td>{row.vllmAscend} times</td>
                      <td>{row.xllm} times</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 overflow-hidden border-gray-200 shadow-none dark:border-gray-800">
          <CardHeader className="space-y-2 pb-3">
            <CardTitle className="text-lg">DeepSeek-R1 PD throughput</CardTitle>
            <CardDescription>
              2,048 input and output tokens, TPOT capped at 100 ms. xLLM reports 33.9% more output
              tokens per second than MindIE.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-5">
            <ChartContainer
              config={pdConfig}
              className="aspect-auto h-[240px] w-full min-w-0 sm:h-[280px]"
              role="img"
              aria-label="Bar chart. In the reported DeepSeek-R1 prefill-decode test, xLLM reaches 11,351.58 tokens per second and MindIE reaches 8,476.44 tokens per second."
            >
              <BarChart data={deepseekPdThroughput} margin={{ top: 24, right: 8, left: 4 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="framework" tickLine={false} axisLine={false} />
                <YAxis
                  domain={[0, 12000]}
                  ticks={[0, 3000, 6000, 9000, 12000]}
                  tickFormatter={(value) => `${Number(value) / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                  width={38}
                />
                <ChartTooltip
                  cursor={{ fill: 'rgb(var(--color-secondary) / 0.08)' }}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      formatter={(value, _name, item) => (
                        <div className="grid min-w-[12rem] gap-1">
                          <span className="font-medium text-foreground">
                            {item.payload.framework}
                          </span>
                          <span className="flex justify-between gap-3 text-muted-foreground">
                            Output throughput
                            <strong className="font-mono text-foreground">
                              {Number(value).toLocaleString('en-US')} tokens/s
                            </strong>
                          </span>
                          <span className="flex justify-between gap-3 text-muted-foreground">
                            Request rate
                            <strong className="font-mono text-foreground">
                              {item.payload.requestRate} req/s
                            </strong>
                          </span>
                        </div>
                      )}
                    />
                  }
                />
                <Bar dataKey="throughput" fill="var(--color-throughput)" radius={[4, 4, 0, 0]}>
                  <LabelList
                    dataKey="throughput"
                    position="top"
                    formatter={(value) => formatTokens(Number(value))}
                    className="fill-gray-950 text-[11px] font-semibold dark:fill-gray-50"
                  />
                </Bar>
              </BarChart>
            </ChartContainer>

            <div className="sr-only overflow-hidden">
              <table aria-label="DeepSeek-R1 PD throughput data">
                <thead>
                  <tr>
                    <th>Framework</th>
                    <th>Output throughput in tokens per second</th>
                    <th>Request rate in requests per second</th>
                  </tr>
                </thead>
                <tbody>
                  {deepseekPdThroughput.map((row) => (
                    <tr key={row.framework}>
                      <td>{row.framework}</td>
                      <td>{row.throughput}</td>
                      <td>{row.requestRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <DiagramSubtitle>
        xLLM Technical Report, author-reported results. Qwen bars show reported maxima across tested
        configurations, while the DeepSeek-R1 bars show one PD configuration. These charts are not a
        cross-hardware ranking.
      </DiagramSubtitle>
    </section>
  )
}
