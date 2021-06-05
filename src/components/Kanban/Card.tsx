import React, { DragEvent, useCallback } from 'react'
import { CardStyles } from './styled'

export interface Item {
  id: number
  title: string
  text: string
}

interface IProps {
  item: Item
}

const Card = ({ item }: IProps): JSX.Element => {
  const dragStart = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData()
    e.dataTransfer.items.add('text', item.text)
    e.dataTransfer.items.add('title', item.title)
    e.dataTransfer.items.add('id', item.id.toString())
  }, [])

  return (
    <CardStyles draggable onDragStart={dragStart}>
      <h2>{item.title}</h2>
      <p>{item.text}</p>
    </CardStyles>
  )
}

export default Card
