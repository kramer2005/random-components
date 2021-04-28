import React, { useState } from 'react'
import { IshikawaRoot } from '../../types'
import { createTopic } from './IshikawaHelper'
import IshikawaTopic from './IshikawaTopic'
import { IconButton, Tooltip } from '@material-ui/core'
import { Add } from '@material-ui/icons'

const IshikawaDiagram = (): JSX.Element => {
  const [state, setState] = useState<IshikawaRoot>({
    key: 0,
    children: [],
    parent: null,
    value: '0',
    actualId: 1
  })

  return (
    <div>
      <Tooltip title="Criar tópico" arrow>
        <IconButton
          onClick={() => createTopic(Math.random().toString(), state, setState)}
        >
          <Add />
        </IconButton>
      </Tooltip>
      {state?.children?.map(el => (
        <div key={el.key}>
          <IshikawaTopic node={el} state={state} setState={setState} />
        </div>
      ))}
    </div>
  )
}

export default IshikawaDiagram
