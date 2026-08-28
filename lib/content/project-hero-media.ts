import { ProjectHeroMediaSchema, type ProjectHeroMedia } from '@/lib/assets/types'

export function parseProjectHeroMedia(value: unknown): ProjectHeroMedia | undefined {
  if (value == null) return undefined
  return ProjectHeroMediaSchema.parse(value)
}
