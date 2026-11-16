'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'

const reportUrl =
  'https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities'

// Rounded values reported in Anthropic's figure, not newly measured results.
const refusalData = [
  { model: 'GLM-5.3', released: 95, abliterated: 6 },
  { model: 'GLM-5.3-Flash', released: 95, abliterated: 14 },
]

const capabilityData = [
  { benchmark: 'GPQA-Diamond', model: 'GLM-5.3', released: 88, abliterated: 88 },
  { benchmark: 'GPQA-Diamond', model: 'GLM-5.3-Flash', released: 89, abliterated: 89 },
  { benchmark: 'CyberGym subset', model: 'GLM-5.3', released: 85, abliterated: 81 },
  { benchmark: 'CyberGym subset', model: 'GLM-5.3-Flash', released: 86, abliterated: 86 },
]

const engagementData = [
  { condition: 'Direct request', engagement: 0 },
  { condition: 'Cover story', engagement: 64 },
  { condition: 'Reasoning prefill', engagement: 92 },
  { condition: 'Abliterated', engagement: 100 },
]

const refusalConfig = {
  released: { label: 'Released', color: 'rgb(var(--color-muted-foreground))' },
  abliterated: { label: 'Abliterated', color: 'rgb(var(--color-secondary))' },
} satisfies ChartConfig

const engagementConfig = {
  engagement: { label: 'Attempted connection', color: 'rgb(var(--color-secondary))' },
} satisfies ChartConfig

const chartClassName =
  'aspect-auto h-[260px] w-full min-w-0 [&_.recharts-surface:focus-visible]:outline [&_.recharts-surface:focus-visible]:outline-2 [&_.recharts-surface:focus-visible]:outline-offset-4 [&_.recharts-surface:focus-visible]:outline-secondary-600'
const tableClassName =
  'w-full text-left text-xs tabular-nums [&_th]:px-2 [&_th]:py-2 [&_th]:font-medium [&_td]:px-2 [&_td]:py-2 [&_tbody_tr]:border-t [&_tbody_tr]:border-gray-200 dark:[&_tbody_tr]:border-gray-800'
const summaryClassName =
  'w-fit cursor-pointer rounded-sm text-xs font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-600 dark:text-gray-200 dark:decoration-gray-600'

function percent(value: number) {
  return `${value}%`
}

function ReportSource({ showDate = false }: { showDate?: boolean }) {
  return (
    <p className="text-xs text-gray-500 dark:text-gray-400">
      Source:{' '}
      <a href={reportUrl} className="underline underline-offset-4">
        Anthropic
      </a>
      {showDate ? ' · 29 Sep 2026' : null}
    </p>
  )
}

export function AbliterationRefusalChart() {
  return (
    <figure
      aria-labelledby="abliteration-refusal-title"
      className="not-prose my-10 min-w-0 space-y-4 border-y border-gray-200 py-6 font-sans dark:border-gray-800"
    >
      <figcaption className="space-y-1">
        <h3 id="abliteration-refusal-title" className="text-lg font-bold tracking-tight">
          Mean refusal rate
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          JailbreakBench · HarmBench · StrongREJECT
        </p>
      </figcaption>
      <div className="flex gap-5 text-xs text-gray-700 dark:text-gray-300" aria-hidden="true">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-gray-600 dark:bg-gray-400" />
          Released
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-secondary-600" />
          Abliterated
        </span>
      </div>
      <p className="sr-only">
        Anthropic-reported approximate percentages. Focus the chart and use left and right arrow
        keys to inspect each model, or open the data table below.
      </p>
      <ChartContainer config={refusalConfig} className={chartClassName}>
        <BarChart
          accessibilityLayer
          data={refusalData}
          title="Refusal rates before and after abliteration"
          desc="Approximate mean percentages across three benchmarks, reported by Anthropic."
          margin={{ top: 24, right: 8, left: 0, bottom: 4 }}
          barCategoryGap="28%"
          maxBarSize={52}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="model" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={percent}
            tickLine={false}
            axisLine={false}
            width={38}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <span className="flex w-full items-center justify-between gap-5">
                    <span>{refusalConfig[name as keyof typeof refusalConfig]?.label}</span>
                    <strong className="tabular-nums">≈{percent(Number(value))}</strong>
                  </span>
                )}
              />
            }
          />
          <Bar
            dataKey="released"
            fill="var(--color-released)"
            radius={[3, 3, 0, 0]}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="released"
              position="top"
              formatter={(value) => `≈${percent(Number(value))}`}
              className="fill-gray-700 text-xs dark:fill-gray-300"
            />
          </Bar>
          <Bar
            dataKey="abliterated"
            fill="var(--color-abliterated)"
            radius={[3, 3, 0, 0]}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="abliterated"
              position="top"
              formatter={(value) => `≈${percent(Number(value))}`}
              className="fill-gray-950 text-xs font-semibold dark:fill-gray-50"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <details>
        <summary className={summaryClassName}>Show refusal data</summary>
        <table className={`${tableClassName} mt-3`}>
          <caption className="sr-only">
            Approximate mean refusal percentages reported by Anthropic
          </caption>
          <thead>
            <tr>
              <th scope="col">Model</th>
              <th scope="col">Released</th>
              <th scope="col">Abliterated</th>
            </tr>
          </thead>
          <tbody>
            {refusalData.map((row) => (
              <tr key={row.model}>
                <th scope="row">{row.model}</th>
                <td>≈{percent(row.released)}</td>
                <td>≈{percent(row.abliterated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-800">
        <h4 className="text-sm font-semibold">Capability checks (%)</h4>
        <div className="overflow-x-auto">
          <table className={tableClassName}>
            <caption className="sr-only">Rounded capability scores reported by Anthropic</caption>
            <thead>
              <tr>
                <th scope="col">Benchmark</th>
                <th scope="col">Model</th>
                <th scope="col">Released</th>
                <th scope="col">Abliterated</th>
              </tr>
            </thead>
            <tbody>
              {capabilityData.map((row) => (
                <tr key={`${row.benchmark}-${row.model}`}>
                  <th scope="row">{row.benchmark}</th>
                  <td>{row.model}</td>
                  <td>{row.released}</td>
                  <td>{row.abliterated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          GPQA-Diamond: 198 questions × 4 samples. CyberGym subsets: 185 GLM-5.3 tasks; 95 Flash
          tasks. Scores are rounded. CyberGym subsets differ; compare each model with its edit.
          Source uncertainty intervals are not shown.
        </p>
      </div>
      <ReportSource showDate />
    </figure>
  )
}

function ConditionTick({
  x = 0,
  y = 0,
  payload,
}: {
  x?: number
  y?: number
  payload?: { value: string }
}) {
  const labels: Record<string, string[]> = {
    'Direct request': ['Direct', 'request'],
    'Cover story': ['Cover', 'story'],
    'Reasoning prefill': ['Reasoning', 'prefill'],
    Abliterated: ['Abliterated'],
  }
  return (
    <text
      x={x}
      y={y + 10}
      textAnchor="middle"
      className="fill-gray-600 text-[11px] dark:fill-gray-400"
    >
      {(labels[payload?.value ?? ''] ?? []).map((line, index) => (
        <tspan key={line} x={x} dy={index === 0 ? 0 : 15}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

export function AbliterationEngagementChart() {
  return (
    <figure
      aria-labelledby="abliteration-engagement-title"
      className="not-prose my-10 min-w-0 space-y-4 border-y border-gray-200 py-6 font-sans dark:border-gray-800"
    >
      <figcaption className="space-y-1">
        <h3 id="abliteration-engagement-title" className="text-lg font-bold tracking-tight">
          Attempted target connection
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          GLM-5.3 · simulation · 50 samples per condition
        </p>
      </figcaption>
      <p className="sr-only">
        Anthropic-reported simulation results, not successful attacks. Focus the chart and use left
        and right arrow keys to inspect conditions, or open the data table below.
      </p>
      <ChartContainer config={engagementConfig} className={chartClassName}>
        <BarChart
          accessibilityLayer
          data={engagementData}
          title="Attempted target connections in Anthropic's simulation"
          desc="Share of 50 samples per condition, not successful attacks."
          margin={{ top: 24, right: 8, left: 0, bottom: 4 }}
          barCategoryGap="30%"
          maxBarSize={58}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="condition"
            tick={<ConditionTick />}
            tickLine={false}
            axisLine={false}
            interval={0}
            height={42}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={percent}
            tickLine={false}
            axisLine={false}
            width={38}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value) => (
                  <span className="flex w-full items-center justify-between gap-5">
                    <span>Attempted connection</span>
                    <strong className="tabular-nums">{percent(Number(value))}</strong>
                  </span>
                )}
              />
            }
          />
          <Bar
            dataKey="engagement"
            fill="var(--color-engagement)"
            radius={[3, 3, 0, 0]}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="engagement"
              position="top"
              formatter={(value) => percent(Number(value))}
              className="fill-gray-950 text-xs font-semibold dark:fill-gray-50"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <details>
        <summary className={summaryClassName}>Show simulation data</summary>
        <table className={`${tableClassName} mt-3`}>
          <caption className="sr-only">
            GLM-5.3 attempted target connections in Anthropic's simulation
          </caption>
          <thead>
            <tr>
              <th scope="col">Condition</th>
              <th scope="col">Attempted connection</th>
            </tr>
          </thead>
          <tbody>
            {engagementData.map((row) => (
              <tr key={row.condition}>
                <th scope="row">{row.condition}</th>
                <td>{percent(row.engagement)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <ReportSource />
    </figure>
  )
}
