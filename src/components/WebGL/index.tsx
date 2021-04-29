import React, { useRef, useEffect } from 'react'
import setup from './setup'

const WebGL = (): JSX.Element => {
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const fps = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const canvas = canvasElement.current
    if (canvas === null || fps.current === null) {
      return
    }

    setup(canvas, fps.current)
  }, [canvasElement.current])

  return (
    <React.Fragment>
      <p ref={fps} style={{ position: 'absolute', top: 0, left: 0 }}></p>
      <canvas ref={canvasElement} style={{ width: '100vw', height: '100vh' }} />
    </React.Fragment>
  )
}

export default WebGL
