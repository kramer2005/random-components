import React, { useEffect, useRef } from 'react'
import { IshikawaNodeParams } from '../../types'
import { removeSubCause } from './IshikawaHelper'
import { IconButton, Tooltip } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { updateSubCauseName } from './Helpers/SubCauseHelpers'
import EditableComponent from './EditableComponent'

const IshikawaSubCause = ({
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
    <div className="subcausa">
      <section>
        <h4
          ref={nodeName}
          onBlur={e => updateSubCauseName(e, node, state, setState, nodeName)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              updateSubCauseName(e, node, state, setState, nodeName)
            }
          }}
        ></h4>
        <EditableComponent nodeName={nodeName} />
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
