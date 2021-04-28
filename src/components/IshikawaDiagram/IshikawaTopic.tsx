import React, { useEffect, useRef } from 'react'
import { IshikawaNodeParams } from '../../types'
import { createCause, removeTopic } from './IshikawaHelper'
import IshikawaCause from './IshikawaCause'
import { IconButton, Tooltip } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import { updateTopicName } from './Helpers/TopicHelpers'
import EditableComponent from './EditableComponent'

const IshikawaTopic = ({
  node,
  state,
  setState
}: IshikawaNodeParams): JSX.Element => {
  const nodeName = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (nodeName.current) {
      nodeName.current.innerHTML = node.value
    }
  }, [nodeName.current])

  return (
    <div className="topico">
      <section>
        <h2
          ref={nodeName}
          onBlur={e => updateTopicName(e, node, state, setState, nodeName)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              updateTopicName(e, node, state, setState, nodeName)
            }
          }}
        ></h2>
        <EditableComponent nodeName={nodeName} />
        <Tooltip title="Remover tópico" arrow>
          <IconButton onClick={() => removeTopic(node, state, setState)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Criar causa" arrow>
          <IconButton
            onClick={() => createCause('Nova causa', node, state, setState)}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </section>

      <div>
        {node.children.map(el => (
          <div key={el.key}>
            <IshikawaCause node={el} state={state} setState={setState} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default IshikawaTopic
