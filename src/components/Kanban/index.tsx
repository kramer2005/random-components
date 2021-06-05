import React from 'react'
import Column from './Column'
import { KanbanDisplay } from './styled'
const Kanban = (): JSX.Element => {
  return (
    <KanbanDisplay>
      <Column title="TODO" />
      <Column title="Started" />
      <Column title="Complete" />
    </KanbanDisplay>
  )
}

export default Kanban
