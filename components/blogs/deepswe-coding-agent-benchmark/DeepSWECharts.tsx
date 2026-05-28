import type { ReactNode } from 'react'

type BarDatum = {
  label: string
  value: number
  display: string
  highlight?: boolean
}

type CorpusMetric = {
  title: string
  unit: string
  max: number
  rows: BarDatum[]
}

const corpusMetrics: CorpusMetric[] = [
  {
    title: 'Mean prompt length',
    unit: 'characters',
    max: 7500,
    rows: [
      { label: 'SWE-Bench Verified', value: 1700, display: '1,700' },
      { label: 'SWE-Bench Pro', value: 4614, display: '4,614' },
      { label: 'DeepSWE', value: 2158, display: '2,158', highlight: true },
    ],
  },
  {
    title: 'Mean reference solution size',
    unit: 'lines added',
    max: 750,
    rows: [
      { label: 'SWE-Bench Verified', value: 10, display: '10' },
      { label: 'SWE-Bench Pro', value: 120, display: '120' },
      { label: 'DeepSWE', value: 668, display: '668', highlight: true },
    ],
  },
  {
    title: 'Mean files edited',
    unit: 'files',
    max: 10,
    rows: [
      { label: 'SWE-Bench Verified', value: 1.25, display: '1.25' },
      { label: 'SWE-Bench Pro', value: 5.07, display: '5.07' },
      { label: 'DeepSWE', value: 7.41, display: '7.41', highlight: true },
    ],
  },
]

const languageRows = [
  { label: 'TypeScript', value: 35, color: '#3178c6' },
  { label: 'Go', value: 34, color: '#00add8' },
  { label: 'Python', value: 34, color: '#75b34a' },
  { label: 'JavaScript', value: 5, color: '#efc003' },
  { label: 'Rust', value: 5, color: '#b45309' },
]

const verifierMetrics = [
  {
    title: 'False positives',
    subtitle: 'Verifier accepted a wrong implementation',
    max: 10,
    rows: [
      { label: 'SWE-Bench Pro', value: 8.5, display: '8.5%' },
      { label: 'DeepSWE', value: 0.3, display: '0.3%', highlight: true },
    ],
  },
  {
    title: 'False negatives',
    subtitle: 'Verifier rejected a correct implementation',
    max: 30,
    rows: [
      { label: 'SWE-Bench Pro', value: 24.0, display: '24.0%' },
      { label: 'DeepSWE', value: 1.1, display: '1.1%', highlight: true },
    ],
  },
]

const selfTestingRows = [
  { model: 'gpt-5.4', sweBenchPro: 18, deepSWE: 85 },
  { model: 'claude-opus-4.7', sweBenchPro: 28, deepSWE: 83 },
  { model: 'claude-sonnet-4.6', sweBenchPro: 12, deepSWE: 68 },
  { model: 'gpt-5.5', sweBenchPro: 23, deepSWE: 67 },
  { model: 'claude-opus-4.6', sweBenchPro: 11, deepSWE: 66 },
  { model: 'gpt-5.4-mini', sweBenchPro: 17, deepSWE: 51 },
  { model: 'gemini-3-flash', sweBenchPro: 14, deepSWE: 34 },
  { model: 'gemini-3.1-pro', sweBenchPro: 6, deepSWE: 24 },
]

const spreadRows = [
  { model: 'gpt-5.5', family: 'openai', sweBenchPro: 59, deepSWE: 70 },
  { model: 'claude-opus-4.7', family: 'anthropic', sweBenchPro: 64, deepSWE: 54 },
  { model: 'gpt-5.4', family: 'openai', sweBenchPro: 58, deepSWE: 56 },
  { model: 'claude-sonnet-4.6', family: 'anthropic', sweBenchPro: 54, deepSWE: 32 },
  { model: 'gpt-5.4-mini', family: 'openai', sweBenchPro: 54, deepSWE: 24 },
  { model: 'gemini-3.1-pro', family: 'google', sweBenchPro: 46, deepSWE: 10 },
  { model: 'gemini-3-flash', family: 'google', sweBenchPro: 35, deepSWE: 5 },
  { model: 'claude-haiku-4.5', family: 'anthropic', sweBenchPro: 39, deepSWE: 0 },
]

const familyColors: Record<string, string> = {
  openai: '#27965a',
  anthropic: '#d66b1d',
  google: '#2b7ddc',
}

function percent(value: number, max: number) {
  return `${Math.min(100, Math.max(0, (value / max) * 100))}%`
}

function ChartFrame({
  title,
  subtitle,
  children,
  caption,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  caption?: string
}) {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="border-b border-gray-200 px-4 py-4 dark:border-gray-800 sm:px-5">
        <h3 className="text-base font-semibold leading-snug text-gray-950 dark:text-gray-50">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-1 text-sm leading-snug text-gray-500 dark:text-gray-400">{subtitle}</p>
        ) : null}
      </div>
      <div className="px-4 py-5 sm:px-5">{children}</div>
      {caption ? (
        <figcaption className="border-t border-gray-200 px-4 py-3 text-xs leading-relaxed text-gray-500 dark:border-gray-800 dark:text-gray-400 sm:px-5">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function MetricBars({ metric }: { metric: CorpusMetric }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-gray-950 dark:text-gray-50">{metric.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{metric.unit}</p>
      </div>
      <div className="space-y-2.5">
        {metric.rows.map((row) => (
          <div
            key={`${metric.title}-${row.label}`}
            className="grid grid-cols-[7.25rem_minmax(0,1fr)_3.75rem] items-center gap-2 text-xs sm:grid-cols-[9rem_minmax(0,1fr)_4.25rem]"
          >
            <div
              className={
                row.highlight
                  ? 'truncate text-right font-semibold text-gray-950 dark:text-gray-50'
                  : 'truncate text-right text-gray-500 dark:text-gray-400'
              }
              title={row.label}
            >
              {row.label}
            </div>
            <div className="relative h-4 bg-gray-100 dark:bg-gray-900">
              <div
                className={
                  row.highlight
                    ? 'absolute inset-y-0 left-0 bg-gray-950 dark:bg-gray-50'
                    : 'absolute inset-y-0 left-0'
                }
                style={
                  row.highlight
                    ? { width: percent(row.value, metric.max) }
                    : {
                        width: percent(row.value, metric.max),
                        backgroundColor: 'rgb(107 114 128 / 0.45)',
                      }
                }
              />
            </div>
            <div
              className={
                row.highlight
                  ? 'font-semibold tabular-nums text-gray-950 dark:text-gray-50'
                  : 'tabular-nums text-gray-500 dark:text-gray-400'
              }
            >
              {row.display}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DeepSWECorpusStats() {
  const totalLanguages = languageRows.reduce((sum, row) => sum + row.value, 0)

  return (
    <ChartFrame
      title="DeepSWE asks for more engineering from less prompt"
      subtitle="The reference solutions are much larger even though the instructions are shorter than SWE-Bench Pro."
      caption="Source: Datacurve corpus statistics artifact and DeepSWE blog, accessed May 28, 2026."
    >
      <div className="space-y-6">
        {corpusMetrics.map((metric) => (
          <MetricBars key={metric.title} metric={metric} />
        ))}
        <div className="border-t border-gray-200 pt-5 dark:border-gray-800">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <p className="text-sm font-semibold text-gray-950 dark:text-gray-50">
              Task language mix
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">113 tasks</p>
          </div>
          <div className="flex h-7 overflow-hidden border border-gray-200 dark:border-gray-800">
            {languageRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-center overflow-hidden text-[11px] font-semibold tabular-nums text-gray-950"
                style={{ width: percent(row.value, totalLanguages), backgroundColor: row.color }}
                title={`${row.label}: ${row.value} tasks`}
              >
                {row.value >= 30 ? <span className="truncate px-2">{row.label}</span> : null}
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500 dark:text-gray-400">
            {languageRows.map((row) => (
              <span key={row.label} className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5"
                  style={{ backgroundColor: row.color }}
                />
                <span className="font-medium text-gray-800 dark:text-gray-200">{row.label}</span>
                <span className="tabular-nums">{row.value}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </ChartFrame>
  )
}

export function DeepSWEVerifierAudit() {
  return (
    <ChartFrame
      title="Verifier quality changes the meaning of a leaderboard"
      subtitle="False positives inflate scores. False negatives hide valid solutions."
      caption="Datacurve reports 735 reviewed DeepSWE rollouts and 789 reviewed SWE-Bench Pro rollouts in the verifier audit."
    >
      <div className="space-y-6">
        {verifierMetrics.map((metric) => (
          <div key={metric.title}>
            <div className="mb-2">
              <p className="text-sm font-semibold text-gray-950 dark:text-gray-50">
                {metric.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{metric.subtitle}</p>
            </div>
            <div className="space-y-2.5">
              {metric.rows.map((row) => (
                <div
                  key={`${metric.title}-${row.label}`}
                  className="grid grid-cols-[7.25rem_minmax(0,1fr)_3.75rem] items-center gap-2 text-xs sm:grid-cols-[9rem_minmax(0,1fr)_4.25rem]"
                >
                  <div
                    className={
                      row.highlight
                        ? 'truncate text-right font-semibold text-gray-950 dark:text-gray-50'
                        : 'truncate text-right text-gray-500 dark:text-gray-400'
                    }
                  >
                    {row.label}
                  </div>
                  <div className="relative h-4 bg-gray-100 dark:bg-gray-900">
                    <div
                      className={
                        row.highlight
                          ? 'absolute inset-y-0 left-0 bg-gray-950 dark:bg-gray-50'
                          : 'absolute inset-y-0 left-0 bg-gray-500/45'
                      }
                      style={{ width: percent(row.value, metric.max) }}
                    />
                  </div>
                  <div
                    className={
                      row.highlight
                        ? 'font-semibold tabular-nums text-gray-950 dark:text-gray-50'
                        : 'tabular-nums text-gray-500 dark:text-gray-400'
                    }
                  >
                    {row.display}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ChartFrame>
  )
}

export function DeepSWESelfTestingChart() {
  return (
    <ChartFrame
      title="DeepSWE lets strong agents self-test"
      subtitle="Share of trajectories where the agent wrote and ran new tests in the repository's own test framework."
      caption="Source: Datacurve verification behavior artifact. The full artifact covers 5,685 classified trajectories."
    >
      <div className="space-y-3">
        {selfTestingRows.map((row) => (
          <div
            key={row.model}
            className="grid grid-cols-[8.5rem_minmax(0,1fr)_4.5rem] items-center gap-3 text-xs sm:grid-cols-[10.5rem_minmax(0,1fr)_5rem]"
          >
            <div className="truncate font-medium text-gray-950 dark:text-gray-50" title={row.model}>
              {row.model}
            </div>
            <div className="relative h-4">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gray-200 dark:bg-gray-800" />
              <div
                className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-gray-950/35 dark:bg-gray-50/35"
                style={{
                  left: `${Math.min(row.sweBenchPro, row.deepSWE)}%`,
                  width: `${Math.abs(row.deepSWE - row.sweBenchPro)}%`,
                }}
              />
              <span
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-950 bg-white dark:border-gray-50 dark:bg-gray-950"
                style={{ left: `${row.sweBenchPro}%` }}
                title={`SWE-Bench Pro: ${row.sweBenchPro}%`}
              />
              <span
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-950 dark:bg-gray-50"
                style={{ left: `${row.deepSWE}%` }}
                title={`DeepSWE: ${row.deepSWE}%`}
              />
            </div>
            <div className="text-right tabular-nums text-gray-500 dark:text-gray-400">
              {row.sweBenchPro}% to{' '}
              <span className="font-semibold text-gray-950 dark:text-gray-50">{row.deepSWE}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[11px] tabular-nums text-gray-500 dark:text-gray-400">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full border border-gray-950 bg-white dark:border-gray-50 dark:bg-gray-950" />
          SWE-Bench Pro
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-950 dark:bg-gray-50" />
          DeepSWE
        </span>
      </div>
    </ChartFrame>
  )
}

function yForScore(score: number) {
  const top = 42
  const bottom = 354
  return bottom - (score / 80) * (bottom - top)
}

export function DeepSWECrossBenchmarkSpread() {
  return (
    <ChartFrame
      title="DeepSWE spreads out models that SWE-Bench Pro clusters together"
      subtitle="Pass rates on SWE-Bench Pro compress many frontier agents into the same band. DeepSWE makes the gaps visible."
      caption="Source: Datacurve DeepSWE blog. The chart compares DeepSWE pass rates with publicly reported SWE-Bench Pro scores for the same model configurations where available."
    >
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 720 420"
          width="100%"
          role="img"
          aria-label="SWE-Bench Pro versus DeepSWE pass-rate spread by model"
          className="min-w-[640px]"
        >
          <text x="225" y="22" textAnchor="middle" fontSize="13" className="fill-gray-500">
            SWE-Bench Pro
          </text>
          <text x="495" y="22" textAnchor="middle" fontSize="13" className="fill-gray-500">
            DeepSWE
          </text>
          <line x1="225" x2="225" y1="36" y2="366" stroke="currentColor" opacity="0.2" />
          <line x1="495" x2="495" y1="36" y2="366" stroke="currentColor" opacity="0.2" />
          {[0, 20, 40, 60, 80].map((tick) => {
            const y = yForScore(tick)
            return (
              <g key={tick}>
                <line
                  x1="210"
                  x2="510"
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  opacity={tick === 0 ? 0.22 : 0.1}
                />
                <text x="196" y={y + 4} textAnchor="end" fontSize="11" className="fill-gray-500">
                  {tick}%
                </text>
              </g>
            )
          })}
          {spreadRows.map((row) => {
            const color = familyColors[row.family]
            const yLeft = yForScore(row.sweBenchPro)
            const yRight = yForScore(row.deepSWE)
            return (
              <g key={row.model}>
                <line
                  x1="225"
                  x2="495"
                  y1={yLeft}
                  y2={yRight}
                  stroke={color}
                  strokeWidth="1.5"
                  opacity="0.85"
                />
                <circle cx="225" cy={yLeft} r="3.5" fill={color} />
                <circle cx="495" cy={yRight} r="3.5" fill={color} />
              </g>
            )
          })}
          {spreadRows.map((row, index) => {
            const color = familyColors[row.family]
            const leftLabelY = 58 + index * 28
            const rightLabelY = yForScore(row.deepSWE) + (index === 1 ? 18 : 4)
            return (
              <g key={`${row.model}-labels`}>
                <text
                  x="205"
                  y={leftLabelY}
                  textAnchor="end"
                  fontSize="12"
                  fontWeight="600"
                  fill={color}
                >
                  {row.model} {row.sweBenchPro}%
                </text>
                <text x="515" y={rightLabelY} fontSize="12" fontWeight="600" fill={color}>
                  {row.deepSWE}% {row.model}
                </text>
              </g>
            )
          })}
          <text x="360" y="404" textAnchor="middle" fontSize="12" className="fill-gray-500">
            DeepSWE range: 70 points. SWE-Bench Pro range: 30 points.
          </text>
        </svg>
      </div>
    </ChartFrame>
  )
}
