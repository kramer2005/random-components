import React, { useEffect, useRef } from 'react'
import { IshikawaNodeParams } from '../../types'
import { createCause, removeTopic, updateTopic } from './IshikawaHelper'
import IshikawaCause from './IshikawaCause'
import { IconButton, Tooltip } from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'

const IshikawaTopic = ({
  node,
  state,
  setState
}: IshikawaNodeParams): JSX.Element => {
  const nodeName = useRef<HTMLHeadingElement>(null)
  const updateNodeName = (
    e:
      | React.FocusEvent<HTMLHeadingElement>
      | React.KeyboardEvent<HTMLHeadingElement>
  ) => {
    updateTopic(
      node,
      (e.target as HTMLHeadingElement).innerHTML,
      state,
      setState
    )
    if (nodeName.current) {
      nodeName.current.contentEditable = 'false'
    }
  }

  useEffect(() => {
    if (nodeName.current) {
      nodeName.current.innerHTML = node.value
    }
  }, [nodeName.current])
  return (
    <div className="topico">
      <section>
        <h1
          ref={nodeName}
          onBlur={e => updateNodeName(e)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              updateNodeName(e)
            }
          }}
        ></h1>
        <Tooltip title="Editar subcausa" arrow>
          <IconButton
            onClick={() => {
              if (nodeName.current) {
                nodeName.current.contentEditable = 'true'
                nodeName.current.innerHTML = ''
                nodeName.current.focus()
              }
            }}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remover tópico" arrow>
          <IconButton onClick={() => removeTopic(node, state, setState)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Criar causa" arrow>
          <IconButton
            onClick={() =>
              createCause(Math.random().toString(), node, state, setState)
            }
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
