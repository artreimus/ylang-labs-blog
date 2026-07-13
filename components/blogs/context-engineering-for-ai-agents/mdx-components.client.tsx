'use client'

import dynamic from 'next/dynamic'

export const MemoryArchitecture = dynamic(() => import('./MemoryArchitecture'))
export const ProcessFlow = dynamic(() => import('./ProcessFlow'))
