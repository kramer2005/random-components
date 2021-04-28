import React, { useEffect, useRef } from 'react'
import { IshikawaNodeParams } from '../../types'
import { createSubCause, removeCause, updateCause } from './IshikawaHelper'
import IshikawaSubCause from './IshikawaSubCause'
import { IconButton, Tooltip } from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'

const IshikawaCause = ({
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
    updateCause(
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
    <div className="causa">
      <section>
        <h2
          ref={nodeName}
          onBlur={e => updateNodeName(e)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              updateNodeName(e)
            }
          }}
        ></h2>
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
        <Tooltip title="Remover Causa" arrow>
          <IconButton onClick={() => removeCause(node, state, setState)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Criar Subcausa" arrow>
          <IconButton
            onClick={() =>
              createSubCause(Math.random().toString(), node, state, setState)
            }
          >
            <Add />
          </IconButton>
        </Tooltip>
      </section>
      <div>
        {node.children.map(el => (
          <div key={el.key}>
            <IshikawaSubCause node={el} state={state} setState={setState} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default IshikawaCause
