import React, { useEffect, useRef } from 'react'
import { IshikawaNodeParams } from '../../types'
import { createSubCause, removeCause } from './IshikawaHelper'
import IshikawaSubCause from './IshikawaSubCause'
import { IconButton, Tooltip } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import { updateCauseName } from './Helpers/CauseHelpers'
import EditableComponent from './EditableComponent'

const IshikawaCause = ({
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
    <div className="causa">
      <section>
        <h3
          ref={nodeName}
          onBlur={e => updateCauseName(e, node, state, setState, nodeName)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              updateCauseName(e, node, state, setState, nodeName)
            }
          }}
        ></h3>
        <EditableComponent nodeName={nodeName} />
        <Tooltip title="Remover Causa" arrow>
          <IconButton onClick={() => removeCause(node, state, setState)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Criar Subcausa" arrow>
          <IconButton
            onClick={() =>
              createSubCause('Nova subcausa', node, state, setState)
            }
          >
            <Add />
          </IconButton>
        </Tooltip>
      </section>
      <div>
        {node.children.map((el, i) => (
          <div key={el.key}>
            <IshikawaSubCause
              node={el}
              index={i}
              state={state}
              setState={setState}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default IshikawaCause
