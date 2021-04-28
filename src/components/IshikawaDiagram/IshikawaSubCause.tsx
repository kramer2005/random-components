import React, { useEffect, useRef } from 'react'
import { IshikawaNodeParams } from '../../types'
import { removeSubCause, updateSubCause } from './IshikawaHelper'
import { IconButton, Tooltip } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'

const IshikawaSubCause = ({
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
    updateSubCause(
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
    <div className="subcausa">
      <section>
        <h3
          ref={nodeName}
          onBlur={e => updateNodeName(e)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              updateNodeName(e)
            }
          }}
        ></h3>
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
        <Tooltip title="Remover subcausa" arrow>
          <IconButton onClick={() => removeSubCause(node, state, setState)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </section>
    </div>
  )
}

export default IshikawaSubCause
