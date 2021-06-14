import React, { useState } from 'react'
import Circle from './Circle'
import { Typography } from '@material-ui/core'

const DIvidedCircle = (): JSX.Element => {
  const [color, setColor] = useState<CSSStyleDeclaration['color']>('')
  return (
    <div style={{ flexDirection: 'column' }}>
      <Typography style={{ textAlign: 'center' }} variant="h3">
        Escolha uma cor
      </Typography>
      <Circle setColor={setColor} />
      <Typography style={{ textAlign: 'center' }} variant="h5">
        {color}
      </Typography>
    </div>
  )
}

export default DIvidedCircle
