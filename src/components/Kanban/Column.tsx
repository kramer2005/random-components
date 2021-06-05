import React, {
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { ColumnStyles, ColumnTitle } from './styled'
import Card, { Item } from './Card'

interface IProps {
  title: string
}

type Items = Array<Item>

const initialState: Items = []

const Column = ({ title }: IProps): JSX.Element => {
  const [items, setItems] = useState<Items>(initialState)
  const columnRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const randomNumber = Math.round(Math.random() * 100)
    setItems([
      {
        id: Math.round(Math.random() * 100),
        title: `${randomNumber}`,
        text: 'Descrição'
      }
    ])
  }, [])

  const dragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      const id = Number(e.dataTransfer.types[0])
      const has = items.findIndex(it => it.id === id)
      if (has === -1) {
        const newItems = [...items]
        newItems.push({
          id: id,
          title: e.dataTransfer.types[1],
          text: e.dataTransfer.types[2]
        })
        setItems(newItems)
      }
    },
    [items]
  )

  const dragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      const target = e.relatedTarget as HTMLDivElement
      if (!target) {
        return
      }
      if (
        !(
          target === columnRef.current ||
          target.parentNode === columnRef.current ||
          target.parentNode?.parentNode === columnRef.current
        )
      ) {
        const id = Number(e.dataTransfer.types[0])
        const newItems = items.filter(it => it.id !== id)
        setItems(newItems)
      }
    },
    [items]
  )

  return (
    <ColumnStyles
      ref={columnRef}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      <ColumnTitle>{title}</ColumnTitle>
      {items.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </ColumnStyles>
  )
}

export default Column
