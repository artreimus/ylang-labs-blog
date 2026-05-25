'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  ChartSpline,
  ClipboardCheck,
  Code2,
  FileText,
  GitPullRequest,
  Layers3,
  Palette,
  PanelsTopLeft,
} from 'lucide-react'

type WorkMode = {
  id: string
  label: string
  eyebrow: string
  markdown: string[]
  html: string[]
  export: string
}

const workModes: WorkMode[] = [
  {
    id: 'review',
    label: 'Review',
    eyebrow: 'Code review',
    markdown: ['Summary paragraph', 'Bullet list of risky files', 'Follow-up checklist'],
    html: ['Annotated diff map', 'Severity filters', 'Jump links by file'],
    export: 'Review comments and merge checklist',
  },
  {
    id: 'design',
    label: 'Design',
    eyebrow: 'Visual comparison',
    markdown: ['Token table', 'Component notes', 'Dark-mode caveats'],
    html: ['Swatch board', 'State contact sheet', 'Responsive previews'],
    export: 'Design decision record',
  },
  {
    id: 'report',
    label: 'Report',
    eyebrow: 'Status surface',
    markdown: ['Status bullets', 'Risk paragraph', 'Owner list'],
    html: ['Timeline', 'Risk heat', 'Grouped actions'],
    export: 'Weekly update and action queue',
  },
]

const artifactCards = [
  {
    icon: GitPullRequest,
    title: 'PR review',
    description: 'Use HTML when risk, ownership, and file flow need to be seen together.',
    output: 'annotated-review.html',
  },
  {
    icon: Palette,
    title: 'Design critique',
    description: 'Turn tokens, states, and layout choices into a contact sheet instead of prose.',
    output: 'design-options.html',
  },
  {
    icon: PanelsTopLeft,
    title: 'Prototype',
    description: 'Let the reader click through the state machine before anyone writes app code.',
    output: 'flow-prototype.html',
  },
  {
    icon: ChartSpline,
    title: 'Report',
    description: 'Give timelines, totals, and exceptions shape so the summary is inspectable.',
    output: 'status-board.html',
  },
  {
    icon: Layers3,
    title: 'Research map',
    description: 'Use tabs, glossaries, and grouped evidence when the reader needs orientation.',
    output: 'research-map.html',
  },
  {
    icon: ClipboardCheck,
    title: 'Decision queue',
    description: 'Use controls when the human needs to rank, approve, reject, or export work.',
    output: 'approval-queue.html',
  },
]

const workflowSteps = [
  ['01', 'Generate surface', 'The agent creates a self-contained HTML artifact for inspection.'],
  ['02', 'Make the choice', 'The human compares options, toggles views, and leaves fewer guesses.'],
  ['03', 'Export record', 'The final state becomes Markdown, JSON, a patch, or a checklist.'],
]

function MiniLine({ className = '' }: { className?: string }) {
  return <span className={`block h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 ${className}`} />
}

function FormatPreview({ mode }: { mode: WorkMode }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rotate-[-1deg] rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300">
          <FileText className="h-3.5 w-3.5" />
          Markdown
        </div>
        <div className="space-y-3">
          {mode.markdown.map((item, index) => (
            <div key={item} className="flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-gray-400 dark:bg-gray-600" />
              <MiniLine className={index === 1 ? 'w-4/5' : index === 2 ? 'w-2/3' : 'w-full'} />
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          Good source. Easy to edit. Harder to inspect when the work has shape.
        </p>
      </div>

      <div className="rotate-[1deg] rounded-lg border-2 border-gray-900 bg-white p-4 shadow-xl shadow-gray-900/10 dark:border-gray-100 dark:bg-gray-950 dark:shadow-black/30">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-950 dark:bg-primary-400">
            <Code2 className="h-3.5 w-3.5" />
            HTML
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-primary-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-secondary-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-900 dark:bg-gray-100" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
            <MiniLine className="mb-3 w-3/5 bg-primary-300 dark:bg-primary-500" />
            <div className="grid grid-cols-4 items-end gap-2">
              <span className="h-10 rounded-t bg-secondary-300 dark:bg-secondary-600" />
              <span className="h-16 rounded-t bg-primary-400" />
              <span className="h-12 rounded-t bg-gray-400 dark:bg-gray-600" />
              <span className="h-20 rounded-t bg-gray-900 dark:bg-gray-100" />
            </div>
          </div>
          <div className="space-y-2">
            {mode.html.map((item) => (
              <div
                key={item}
                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          Better surface. Easier to compare. Needs an export path back to source.
        </p>
      </div>
    </div>
  )
}

export default function HtmlMarkdownArtifactExperience() {
  const [activeMode, setActiveMode] = useState(workModes[0].id)

  const selectedMode = useMemo(
    () => workModes.find((mode) => mode.id === activeMode) ?? workModes[0],
    [activeMode]
  )

  return (
    <section className="not-prose my-12 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
      <div className="grid gap-8 border-b border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 md:grid-cols-[1.2fr_0.8fr] md:p-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <span className="h-px w-8 bg-primary-500" />
            Embedded artifact
          </div>
          <h2 className="m-0 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-4xl">
            When the answer needs a surface, not another document
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
            Markdown is the record. HTML is the review room. Use a browser artifact when the reader
            needs to compare, inspect, filter, or choose before the final answer becomes a committed
            file.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['source', 'surface', 'decision', 'record'].map((item, index) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
              >
                <span className="font-mono text-[10px] text-primary-700 dark:text-primary-400">
                  0{index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 items-end gap-3" aria-label="Markdown and HTML preview">
          <div className="rotate-[-2deg] rounded-lg border border-gray-300 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-950">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              .md
            </div>
            <div className="space-y-2">
              <MiniLine className="w-full" />
              <MiniLine className="w-4/5" />
              <MiniLine className="w-11/12" />
              <MiniLine className="w-2/3" />
              <MiniLine className="w-5/6" />
              <MiniLine className="w-3/5" />
            </div>
          </div>
          <div className="rotate-[2deg] rounded-lg border-2 border-gray-950 bg-white p-4 shadow-lg dark:border-gray-100 dark:bg-gray-950">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-950 dark:text-gray-100">
              .html
            </div>
            <div className="rounded-md bg-primary-100 p-3 dark:bg-primary-500/20">
              <div className="mb-3 h-16 rounded bg-white shadow-sm dark:bg-gray-900" />
              <div className="grid grid-cols-4 items-end gap-2">
                <span className="h-8 rounded-t bg-secondary-400" />
                <span className="h-12 rounded-t bg-primary-500" />
                <span className="h-10 rounded-t bg-gray-400" />
                <span className="h-14 rounded-t bg-gray-950 dark:bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap gap-2">
          {workModes.map((mode) => {
            const isActive = mode.id === selectedMode.id
            return (
              <button
                key={mode.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveMode(mode.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'border-gray-950 bg-gray-950 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-950'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-500'
                }`}
              >
                {mode.label}
              </button>
            )
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-700 dark:text-primary-400">
              {selectedMode.eyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
              Same task, different output contract
            </h3>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              The useful split is not aesthetic. Markdown keeps a durable record. HTML gives the
              human a temporary control surface for judgment.
            </p>
            <div className="mt-5 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Export target
              </p>
              <div className="mt-3 flex items-center justify-between gap-4 text-sm font-semibold text-gray-950 dark:text-gray-100">
                <span>{selectedMode.export}</span>
                <ArrowRight className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </div>
          <FormatPreview mode={selectedMode} />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {artifactCards.map((card) => {
            const Icon = card.icon
            return (
              <article
                key={card.title}
                className="rounded-lg border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-gray-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-600"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-primary-100 text-gray-950 dark:bg-primary-500 dark:text-gray-950">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-bold tracking-tight text-gray-950 dark:text-white">
                  {card.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {card.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3 font-mono text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <span>{card.output}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400" />
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 grid gap-4 border-t border-gray-200 pt-6 dark:border-gray-800 md:grid-cols-3">
          {workflowSteps.map(([number, title, description]) => (
            <div key={number} className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 font-mono text-xs font-semibold text-white dark:bg-gray-100 dark:text-gray-950">
                {number}
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wide text-gray-950 dark:text-white">
                  {title}
                </h4>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
