import React from 'react'

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
  index: number
  setState: React.Dispatch<React.SetStateAction<IshikawaRoot>>
}

export interface EditableIshikawaComponentParams {
  nodeName: React.RefObject<HTMLHeadingElement>
}
