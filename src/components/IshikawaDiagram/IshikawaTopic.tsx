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
  setState,
  index
}: IshikawaNodeParams): JSX.Element => {
  const nodeName = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (nodeName.current) {
      nodeName.current.innerHTML = node.value
    }
  }, [nodeName.current])

  return (
    <div
      className="topico"
      style={{
        position: 'absolute',
        top: index % 2 === 0 ? '0' : 'auto',
        bottom: index % 2 === 1 ? '0' : 'auto',
        left: ((index - (index % 2)) / 2 - 1) * 300
      }}
    >
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
        {node.children.map((el, i) => (
          <div key={el.key}>
            <IshikawaCause
              index={i}
              node={el}
              state={state}
              setState={setState}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default IshikawaTopic
