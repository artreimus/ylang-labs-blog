'use client'

import { Card } from '@/components/ui/card'

interface Message {
  type: 'human' | 'ai' | 'system'
  content: string
}

interface AgentMemoryProps {
  messages?: Message[]
  storeBlocks?: number
}

export default function AgentMemory({
  messages = [
    { type: 'system', content: 'You are a helpful assistant.' },
    { type: 'human', content: 'Human message' },
    { type: 'ai', content: 'AI message' },
    { type: 'human', content: 'Human message' },
    { type: 'ai', content: 'AI message' },
    { type: 'human', content: 'Human message' },
  ],
  storeBlocks = 16,
}: AgentMemoryProps) {
  return (
    <div className="relative mx-auto w-full max-w-5xl p-4 sm:p-8">
      <div className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex-1">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-gray-700">
              Short-term memory
            </h2>
            <Card className="border border-gray-200 bg-white p-4 shadow-lg sm:p-6">
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-2 transition-all duration-200 hover:scale-[1.02] sm:p-3 ${
                      message.type === 'human'
                        ? 'border border-primary-200 bg-primary-50 text-primary-700'
                        : 'border border-secondary-200 bg-secondary-50 text-secondary-700'
                    }`}
                  >
                    <p className="text-sm font-medium">{message.content}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-medium text-primary-700 shadow-sm">
                  Prompt
                </span>
              </div>
            </Card>
          </div>

          <div className="flex items-center">
            <div className="h-px w-full bg-gray-200 lg:h-full lg:w-px" />
          </div>

          <div className="flex-1">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-gray-700">
              Long-term memory
            </h2>
            <div className="space-y-6">
              <Card className="border border-gray-200 bg-white p-4 shadow-lg sm:p-6">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: storeBlocks }).map((_, index) => (
                    <div
                      key={index}
                      className="h-6 rounded border border-secondary-200 bg-secondary-50 shadow-sm 
                        transition-all duration-200 hover:scale-105 hover:shadow-md sm:h-8"
                    />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-medium text-primary-700 shadow-sm">
                    Persistent Store
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
