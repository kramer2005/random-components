import React, { useEffect, useRef, useState } from 'react'
import { IshikawaRoot } from '../../types'
import { createTopic } from './IshikawaHelper'
import IshikawaTopic from './IshikawaTopic'
import { IconButton, Tooltip } from '@material-ui/core'
import { Add, Edit } from '@material-ui/icons'
import defaultState from './DefaultDiagram'

const IshikawaDiagram = (): JSX.Element => {
  const [state, setState] = useState<IshikawaRoot>(defaultState)

  const nodeName = useRef<HTMLHeadingElement>(null)
  const updateNodeName = (
    e:
      | React.FocusEvent<HTMLHeadingElement>
      | React.KeyboardEvent<HTMLHeadingElement>
  ) => {
    setState({ ...state, value: (e.target as HTMLHeadingElement).innerHTML })
    if (nodeName.current) {
      nodeName.current.contentEditable = 'false'
    }
  }

  useEffect(() => {
    createTopic('Método', state, setState)
    createTopic('Máquina', state, setState)
    createTopic('Medida', state, setState)
    createTopic('Meio Ambiente', state, setState)
    createTopic('Mão de Obra', state, setState)
    createTopic('Material', state, setState)
  }, [])

  useEffect(() => {
    if (nodeName.current) {
      nodeName.current.innerHTML = state.value
    }
  }, [nodeName.current])

  return (
    <div>
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
        {state.children.length < 6 ? (
          <Tooltip title="Criar tópico" arrow>
            <IconButton
              onClick={() => createTopic('Novo tópico', state, setState)}
            >
              <Add />
            </IconButton>
          </Tooltip>
        ) : null}
      </section>
      {state?.children?.map(el => (
        <div key={el.key}>
          <IshikawaTopic node={el} state={state} setState={setState} />
        </div>
      ))}
    </div>
  )
}

export default IshikawaDiagram
