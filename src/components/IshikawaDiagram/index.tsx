import React, { useEffect, useRef, useState } from 'react'
import { IshikawaRoot } from '../../types'
import { createTopic } from './IshikawaHelper'
import IshikawaTopic from './IshikawaTopic'
import { IconButton, Tooltip } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import defaultState from './DefaultDiagram'
import EditableComponent from './EditableComponent'
import { updateProblema } from './Helpers/DiagramHelpers'

const IshikawaDiagram = (): JSX.Element => {
  const [state, setState] = useState<IshikawaRoot>(defaultState)

  const nodeName = useRef<HTMLHeadingElement>(null)

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
    <div style={{ position: 'relative', width: '800px', height: '300px' }}>
      <section
        style={{
          position: 'absolute',
          width: '100%',
          right: 0,
          top: 'calc(50% - 1rem)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <hr style={{ flex: '1', height: 0 }} />
        <h1
          ref={nodeName}
          onBlur={e => updateProblema(e, state, setState, nodeName)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              updateProblema(e, state, setState, nodeName)
            }
          }}
          style={{ margin: '0 0 0 5px', fontSize: '2rem' }}
        ></h1>
        <EditableComponent nodeName={nodeName} />
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
      {state?.children?.map((el, i) => (
        <div key={el.key}>
          <IshikawaTopic
            node={el}
            index={i}
            state={state}
            setState={setState}
          />
        </div>
      ))}
    </div>
  )
}

export default IshikawaDiagram
