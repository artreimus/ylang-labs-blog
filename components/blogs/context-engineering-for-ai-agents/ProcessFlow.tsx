'use client'

import React, { useState, useEffect } from 'react'
import { Play, RotateCcw, ArrowRight, Clock, ShieldCheck, Activity } from 'lucide-react'

const Step: React.FC<{ label: string; color: string; delay?: number; active?: boolean }> = ({
  label,
  color,
  delay = 0,
  active = true,
}) => {
  return (
    <div
      className={`relative transform rounded-xl border-2 px-4 py-2 transition-all duration-700 ${active ? 'translate-x-0 scale-100 opacity-100' : '-translate-x-4 scale-95 opacity-0'} ${color}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
    </div>
  )
}

const ProcessFlow = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    let timer: any
    if (isRunning) {
      timer = setInterval(() => {
        setStep((prev) => (prev < 8 ? prev + 1 : prev))
      }, 800)
    }
    return () => clearInterval(timer)
  }, [isRunning])

  const reset = () => {
    setIsRunning(false)
    setStep(0)
  }

  const start = () => {
    setStep(1)
    setIsRunning(true)
  }

  return (
    <div className="not-prose mx-auto w-full max-w-6xl p-4 duration-700 animate-in fade-in slide-in-from-bottom-4 md:p-8">
      <div className="mb-12 text-center">
        <h2 className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-3xl font-bold text-transparent">
          Latency Optimization Strategies
        </h2>
        <p className="mt-2 text-gray-400">
          Comparing synchronous 'Hot Path' execution with asynchronous background processing.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={start}
            disabled={isRunning && step < 8}
            className="flex items-center gap-2 rounded-full bg-secondary-600 px-6 py-2 font-bold text-white shadow-lg shadow-secondary-900/20 transition-all hover:bg-secondary-500 disabled:opacity-50"
          >
            <Play size={18} /> Run Simulation
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-full bg-gray-700 px-6 py-2 font-bold text-white transition-all hover:bg-gray-600"
          >
            <RotateCcw size={18} /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Hot Path */}
        <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-lg bg-primary-100 p-2 dark:bg-primary-500/20">
              <Activity className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-primary-400">
                In the Hot Path
              </h3>
              <p className="text-xs uppercase text-gray-500">SYNCHRONOUS EXECUTION</p>
            </div>
          </div>

          <div className="flex flex-grow flex-col items-center space-y-6">
            <Step
              label="User Message"
              color="bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/40 text-primary-700 dark:text-primary-300"
              active={step >= 1}
            />
            <ArrowRight className="rotate-90 text-gray-300 dark:text-gray-600" size={20} />
            <Step
              label="Update Memory"
              color="bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/40 text-primary-700 dark:text-primary-300"
              active={step >= 2}
            />
            <ArrowRight className="rotate-90 text-gray-300 dark:text-gray-600" size={20} />
            <Step
              label="Respond to User"
              color="bg-secondary-50 dark:bg-secondary-500/10 border-secondary-200 dark:border-secondary-500/40 text-secondary-700 dark:text-secondary-300"
              active={step >= 3}
            />

            <div className="mt-8 w-full rounded-2xl border border-primary-100 bg-primary-50 p-4 dark:border-primary-500/20 dark:bg-primary-500/5">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-primary-600 dark:text-primary-300">
                  Latency Impact
                </span>
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                  HIGH
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <div className="h-full w-[90%] bg-primary-500 transition-all duration-1000"></div>
              </div>
              <p className="mt-2 text-[10px] text-gray-500">
                Wait time = Processing + Storage latency
              </p>
            </div>
          </div>
        </div>

        {/* Background Flow */}
        <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-lg bg-secondary-100 p-2 dark:bg-secondary-500/20">
              <Clock className="text-secondary-600 dark:text-secondary-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-secondary-400">
                In the Background
              </h3>
              <p className="text-xs uppercase text-gray-500">ASYNCHRONOUS DECOUPLING</p>
            </div>
          </div>

          <div className="flex flex-grow gap-8">
            {/* Process A */}
            <div className="flex flex-1 flex-col items-center space-y-4 border-r border-gray-200 pr-4 dark:border-gray-700/50">
              <span className="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500">
                Main Thread (Process A)
              </span>
              <Step
                label="User Message"
                color="bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/40 text-primary-700 dark:text-primary-300"
                active={step >= 4}
              />
              <ArrowRight className="rotate-90 text-gray-300 dark:text-gray-600" size={20} />
              <Step
                label="Respond to User"
                color="bg-secondary-50 dark:bg-secondary-500/10 border-secondary-200 dark:border-secondary-500/40 text-secondary-700 dark:text-secondary-300"
                active={step >= 5}
              />
              <div
                className={`mt-4 flex items-center gap-2 rounded-lg bg-secondary-50 p-2 text-xs text-secondary-600 transition-opacity duration-500 dark:bg-secondary-500/10 dark:text-secondary-400 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}
              >
                <ShieldCheck size={14} /> Interaction Complete
              </div>
            </div>

            {/* Process B */}
            <div className="flex flex-1 flex-col items-center">
              <span className="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500">
                Worker (Process B)
              </span>
              <div className="mt-20 flex w-full flex-col items-center">
                <div
                  className={`mb-4 flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-[10px] text-gray-500 transition-all duration-700 dark:bg-gray-700 dark:text-gray-400 ${step >= 6 ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
                >
                  <Clock size={12} /> 30 minutes later...
                </div>
                <div className="flex flex-col items-center">
                  <Step
                    label="Update Memory"
                    color="bg-secondary-50 dark:bg-secondary-500/10 border-secondary-200 dark:border-secondary-500/40 text-secondary-700 dark:text-secondary-300"
                    active={step >= 7}
                  />
                  <p
                    className={`mt-2 text-center text-[10px] text-gray-400 transition-opacity dark:text-gray-500 ${step >= 7 ? 'opacity-100' : 'opacity-0'}`}
                  >
                    Indexing facts for long-term retrieval
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full rounded-2xl border border-secondary-100 bg-secondary-50 p-4 dark:border-secondary-500/20 dark:bg-secondary-500/5">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-secondary-600 dark:text-secondary-300">
                Latency Impact
              </span>
              <span className="text-xs font-bold text-secondary-600 dark:text-secondary-400">
                LOW
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <div className="h-full w-[20%] bg-secondary-500 transition-all duration-1000"></div>
            </div>
            <p className="mt-2 text-[10px] text-gray-500">Wait time = Processing latency only</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessFlow
