'use client'

import React, { useState } from 'react'
import { Brain, Cpu, Database, MessageSquare, History, Zap } from 'lucide-react'

const MemoryArchitecture = () => {
  const [activeTab, setActiveTab] = useState<'stm' | 'ltm'>('stm')

  return (
    <div className="not-prose mx-auto w-full max-w-6xl p-4 duration-700 animate-in fade-in md:p-8">
      <div className="mb-8 text-center">
        <h2 className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-3xl font-bold text-transparent">
          Neural Memory Architecture
        </h2>
        <p className="mt-2 text-gray-400">
          How LLMs leverage dual-memory systems for coherent reasoning.
        </p>
      </div>

      <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Short Term Memory (Checkpointer) */}
        <div
          className={`rounded-3xl border-2 p-6 transition-all duration-500 ${activeTab === 'stm' ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-gray-200 dark:border-gray-700'}`}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-primary-100 p-2 dark:bg-primary-500/20">
              <History className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Short-term Memory</h3>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Checkpointer
              </p>
            </div>
          </div>

          <div className="flex min-h-[300px] flex-col justify-center space-y-4">
            <div className="ml-auto max-w-[80%] rounded-2xl border border-primary-200 bg-primary-50 p-3 dark:border-primary-500/30 dark:bg-primary-500/10">
              <p className="text-sm text-gray-900 dark:text-primary-200">
                What was the last financial report summary?
              </p>
            </div>
            <div className="mr-auto max-w-[80%] rounded-2xl border border-secondary-200 bg-secondary-50 p-3 dark:border-secondary-500/30 dark:bg-secondary-500/10">
              <p className="text-sm text-gray-900 dark:text-secondary-200">
                The Q3 report showed a 15% increase in revenue...
              </p>
            </div>
            <div className="ml-auto max-w-[80%] rounded-2xl border border-primary-200 bg-primary-50 p-3 dark:border-primary-500/30 dark:bg-primary-500/10">
              <p className="text-sm text-gray-900 dark:text-primary-200">
                Who authored that report?
              </p>
            </div>
            <div className="mr-auto max-w-[80%] rounded-2xl border border-secondary-200 bg-secondary-50 p-3 dark:border-secondary-500/30 dark:bg-secondary-500/10">
              <p className="text-sm text-gray-900 dark:text-secondary-200">
                The report was authored by the Treasury team.
              </p>
            </div>
            <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-700">
              <p className="text-xs italic text-gray-500 dark:text-gray-400">
                Episodic thread stored in the Checkpointer for current session context.
              </p>
            </div>
          </div>
        </div>

        {/* Long Term Memory (Store) */}
        <div
          className={`rounded-3xl border-2 p-6 transition-all duration-500 ${activeTab === 'ltm' ? 'border-secondary-500 ring-4 ring-secondary-500/10' : 'border-gray-200 dark:border-gray-700'}`}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-secondary-100 p-2 dark:bg-secondary-500/20">
              <Database className="text-secondary-600 dark:text-secondary-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Long-term Memory</h3>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Store</p>
            </div>
          </div>

          <div className="grid min-h-[300px] grid-cols-4 content-center gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`flex h-12 cursor-help items-center justify-center rounded-lg border transition-all hover:scale-105
                  ${
                    i % 3 === 0
                      ? 'border-secondary-200 bg-secondary-50 text-secondary-600 dark:border-secondary-500/40 dark:bg-secondary-500/20 dark:text-secondary-300'
                      : i % 2 === 0
                        ? 'border-primary-200 bg-primary-50 text-primary-600 dark:border-primary-500/40 dark:bg-primary-500/20 dark:text-primary-300'
                        : 'border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-600/50 dark:bg-gray-700/50'
                  }`}
                title={`Knowledge Node ${i + 1}`}
              >
                <div className="h-2 w-2 rounded-full bg-current opacity-60"></div>
              </div>
            ))}
            <div className="col-span-4 mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <p className="text-xs italic text-gray-500 dark:text-gray-400">
                Semantic and structural knowledge persisted across all user sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Connecting Lines and LLM */}
        <div className="mt-4 flex flex-col items-center lg:col-span-2">
          <svg className="h-32 w-full overflow-visible" viewBox="0 0 800 100">
            {/* Left Flow */}
            <path
              d="M 200 0 Q 200 80 400 80"
              fill="none"
              stroke="#efc003"
              strokeWidth="3"
              className="flow-line"
            />
            {/* Right Flow */}
            <path
              d="M 600 0 Q 600 80 400 80"
              fill="none"
              stroke="#75b34a"
              strokeWidth="3"
              className="flow-line"
            />
          </svg>

          {/* LLM Node */}
          <div className="group relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 blur-xl transition duration-700 group-hover:opacity-100"></div>
            <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow-lg shadow-primary-500/5 transition-shadow duration-500 group-hover:shadow-primary-500/10 dark:border-gray-700 dark:bg-gray-900 md:h-40 md:w-40">
              <Cpu className="mb-2 text-primary-500 dark:text-primary-400" size={40} />
              <span className="text-xl font-bold tracking-tighter text-gray-900 dark:text-primary-400">
                LLM
              </span>
              <div className="mt-1 flex gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500"></span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500 delay-75"></span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500 delay-150"></span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-8 px-4 text-sm">
            <div className="text-right">
              <span className="mb-1 block font-bold text-primary-600 dark:text-primary-400">
                Session State
              </span>
              <p className="leading-tight text-gray-500 dark:text-gray-400">
                Maintains immediate conversation history and continuity.
              </p>
            </div>
            <div className="text-left">
              <span className="mb-1 block font-bold text-secondary-600 dark:text-secondary-400">
                Knowledge (Store)
              </span>
              <p className="leading-tight text-gray-500 dark:text-gray-400">
                Long-term RAG or model weights integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemoryArchitecture
