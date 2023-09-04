import { ILoginState } from './login/types'
import { ISystemState } from '@/store/main/system/types'
import { IDashboradState } from './main/analysis/types'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboradState
}

export type IStoreType = IRootState & IRootWithModule
