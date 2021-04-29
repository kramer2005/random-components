import React, { useRef, useEffect } from 'react'
import setup from './setupPointCloud'

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
      <p
        ref={fps}
        style={{ position: 'absolute', top: 0, left: 0, color: 'white' }}
      ></p>
      <h1 style={{ position: 'absolute', color: 'white', margin: '0' }}>
        WebGL!
      </h1>
      <canvas
        ref={canvasElement}
        style={{ width: '100vw', height: '100vh', background: '#111' }}
      />
    </React.Fragment>
  )
}

export default WebGL
