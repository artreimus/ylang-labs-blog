import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import XllmBenchmarkCharts, {
  deepseekPdThroughput,
  qwenRelativeThroughput,
} from './XllmBenchmarkCharts'

jest.mock('recharts', () => {
  const passthrough = ({ children }: { children?: ReactNode }) => <div>{children}</div>

  return {
    Bar: passthrough,
    BarChart: passthrough,
    CartesianGrid: passthrough,
    LabelList: passthrough,
    ResponsiveContainer: passthrough,
    Tooltip: () => null,
    XAxis: passthrough,
    YAxis: passthrough,
  }
})

describe('XllmBenchmarkCharts', () => {
  it('keeps the published benchmark values and conditions visible to non-visual readers', () => {
    render(<XllmBenchmarkCharts />)

    expect(screen.getByText('Author-reported benchmark figures')).toBeInTheDocument()
    expect(
      screen.getByText(/Peaks may come from different Qwen configurations/)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('table', { name: 'Qwen-series relative throughput data' })
    ).toHaveTextContent('Ascend 910B1 times1.9 times')
    expect(screen.getByRole('table', { name: 'DeepSeek-R1 PD throughput data' })).toHaveTextContent(
      'xLLM11351.585.54'
    )
  })

  it('matches the values reported in the xLLM technical report', () => {
    expect(qwenRelativeThroughput).toEqual([
      { hardware: 'Ascend 910B', vllmAscend: 1, xllm: 1.9 },
      { hardware: 'Ascend 910C', vllmAscend: 1, xllm: 2.2 },
    ])
    expect(deepseekPdThroughput).toEqual([
      { framework: 'xLLM', throughput: 11351.58, requestRate: 5.54 },
      { framework: 'MindIE', throughput: 8476.44, requestRate: 4.14 },
    ])
  })
})
