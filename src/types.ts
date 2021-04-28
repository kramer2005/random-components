export interface IshikawaNode {
  key: number
  value: string
  parent: IshikawaNode | null
  children: IshikawaNode[]
}

export interface IshikawaRoot extends IshikawaNode {
  key: number
  value: string
  parent: IshikawaNode | null
  children: IshikawaNode[]
  actualId: number
}

export interface IshikawaNodeParams {
  node: IshikawaNode
  state: IshikawaRoot
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>
}
