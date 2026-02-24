import type { ProcessStepMeta } from '@/types'
import { Crosshair, SearchCode, Wrench, FileCheck, ShieldCheck } from 'lucide-react'

export const PROCESS_STEPS_META: ProcessStepMeta[] = [
  { num: '01', icon: Crosshair },
  { num: '02', icon: SearchCode },
  { num: '03', icon: Wrench },
  { num: '04', icon: FileCheck },
  { num: '05', icon: ShieldCheck },
]
