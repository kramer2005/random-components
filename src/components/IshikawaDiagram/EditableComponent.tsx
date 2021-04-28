import React from 'react'
import { EditableIshikawaComponentParams } from '../../types'
import { IconButton, Tooltip } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

const EditableComponent = ({
  nodeName
}: EditableIshikawaComponentParams): JSX.Element => {
  return (
    <Tooltip title="Editar" arrow>
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
  )
}

export default EditableComponent
