'use client'

import dynamic from 'next/dynamic'

export const BenchmarkChart = dynamic(() => import('./BenchmarkChart'))
export const HighLevelArchitectureDiagram = dynamic(() => import('./HighLevelArchitectureDiagram'))
export const TrainingPipelineDiagram = dynamic(() => import('./TrainingPipelineDiagram'))
