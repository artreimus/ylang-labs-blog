type LeaderboardRow = {
  model: string
  effort?: string
  family: string
  initials: string
  score: number
  margin: number
  color: string
}

const rows: LeaderboardRow[] = [
  {
    model: 'gpt-5.5',
    effort: 'xhigh',
    family: 'OpenAI',
    initials: 'OA',
    score: 70,
    margin: 4,
    color: '#27965a',
  },
  {
    model: 'gpt-5.4',
    effort: 'xhigh',
    family: 'OpenAI',
    initials: 'OA',
    score: 56,
    margin: 5,
    color: '#27965a',
  },
  {
    model: 'claude-opus-4.7',
    effort: 'max',
    family: 'Anthropic',
    initials: 'A',
    score: 54,
    margin: 5,
    color: '#d66b1d',
  },
  {
    model: 'claude-sonnet-4.6',
    effort: 'high',
    family: 'Anthropic',
    initials: 'A',
    score: 32,
    margin: 4,
    color: '#d66b1d',
  },
  {
    model: 'gemini-3.5-flash',
    effort: 'medium',
    family: 'Google',
    initials: 'G',
    score: 28,
    margin: 4,
    color: '#2b7ddc',
  },
  {
    model: 'gpt-5.4-mini',
    effort: 'xhigh',
    family: 'OpenAI',
    initials: 'OA',
    score: 24,
    margin: 4,
    color: '#27965a',
  },
  {
    model: 'kimi-k2.6',
    family: 'Moonshot',
    initials: 'K',
    score: 24,
    margin: 4,
    color: '#d94353',
  },
  {
    model: 'mimo-v2.5-pro',
    family: 'Xiaomi',
    initials: 'MI',
    score: 19,
    margin: 4,
    color: '#b79d12',
  },
  {
    model: 'glm-5.1',
    family: 'Zhipu',
    initials: 'Z',
    score: 18,
    margin: 4,
    color: '#0fa3a1',
  },
  {
    model: 'gemini-3.1-pro',
    family: 'Google',
    initials: 'G',
    score: 10,
    margin: 3,
    color: '#2b7ddc',
  },
  {
    model: 'deepseek-v4-pro',
    family: 'DeepSeek',
    initials: 'DS',
    score: 8,
    margin: 2,
    color: '#7f52d1',
  },
  {
    model: 'gemini-3-flash',
    family: 'Google',
    initials: 'G',
    score: 5,
    margin: 2,
    color: '#2b7ddc',
  },
]

const ticks = [0, 25, 50, 75, 100]

function boundPercent(value: number) {
  return Math.min(100, Math.max(0, value))
}

export default function DeepSWELeaderboard() {
  return (
    <figure className="not-prose my-10 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
            DeepSWE leaderboard
          </p>
          <h3 className="mt-1 text-2xl font-bold text-gray-950 dark:text-gray-50">
            Pass rate by model
          </h3>
        </div>
        <div className="w-fit rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
          Models <span className="text-gray-500 dark:text-gray-400">(12/16)</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[840px] px-4 py-5 sm:px-6">
          <div className="grid grid-cols-[280px_minmax(420px,1fr)_108px] gap-x-5">
            {rows.map((row) => {
              const low = boundPercent(row.score - row.margin)
              const high = boundPercent(row.score + row.margin)

              return (
                <div
                  key={row.model}
                  className="contents"
                  aria-label={`${row.model}, ${row.family}, ${row.score}% plus or minus ${row.margin}%`}
                >
                  <div className="flex h-14 items-center gap-3 border-t border-gray-100 text-gray-950 dark:border-gray-900 dark:text-gray-50">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white"
                      style={{ backgroundColor: row.color }}
                      aria-hidden="true"
                    >
                      {row.initials}
                    </span>
                    <span className="truncate text-base font-semibold">{row.model}</span>
                    {row.effort ? (
                      <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
                        [{row.effort}]
                      </span>
                    ) : null}
                  </div>

                  <div className="relative h-14 border-t border-gray-100 dark:border-gray-900">
                    {ticks.map((tick) => (
                      <span
                        key={tick}
                        className="absolute top-0 h-full w-px bg-gray-100 dark:bg-gray-900"
                        style={{ left: `${tick}%` }}
                        aria-hidden="true"
                      />
                    ))}
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-100 dark:bg-gray-900" />
                    <div
                      className="absolute top-1/2 h-3 -translate-y-1/2 rounded-sm"
                      style={{ width: `${row.score}%`, backgroundColor: row.color }}
                    />
                    <div
                      className="absolute top-1/2 h-px -translate-y-1/2 bg-gray-700 dark:bg-gray-300"
                      style={{ left: `${low}%`, width: `${high - low}%` }}
                      aria-hidden="true"
                    />
                    {[low, row.score, high].map((value, index) => (
                      <span
                        key={`${row.model}-${value}-${index}`}
                        className="absolute top-1/2 w-px -translate-y-1/2 bg-gray-800 dark:bg-gray-200"
                        style={{
                          left: `${value}%`,
                          height: index === 1 ? '24px' : '18px',
                        }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <div className="flex h-14 items-center justify-end gap-1 border-t border-gray-100 text-right dark:border-gray-900">
                    <span className="text-xl font-bold text-gray-950 dark:text-gray-50">
                      {row.score}%
                    </span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      +/-{row.margin}%
                    </span>
                  </div>
                </div>
              )
            })}

            <div className="col-start-2 mt-3 grid grid-cols-5 text-xs font-medium text-gray-500 dark:text-gray-400">
              {ticks.map((tick) => (
                <span
                  key={tick}
                  className={tick === 0 ? 'text-left' : tick === 100 ? 'text-right' : 'text-center'}
                >
                  {tick}%
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="border-t border-gray-200 px-4 py-3 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400 sm:px-6">
        Values are from Datacurve's DeepSWE leaderboard, accessed May 28, 2026. Every listed model
        was run through mini-swe-agent; bars show pass rate and reported uncertainty.
      </figcaption>
    </figure>
  )
}
