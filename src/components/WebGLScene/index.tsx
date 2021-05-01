import React, { useRef, useEffect } from 'react'
import SetupScene from './SetupScene'

const WebGLScene = (): JSX.Element => {
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const fps = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (canvasElement.current && fps.current) {
      SetupScene(canvasElement.current, fps.current)
    }
  }, [canvasElement.current])

  return (
    <React.Fragment>
      <p
        ref={fps}
        style={{ position: 'absolute', top: 10, left: 10, color: 'white' }}
      ></p>
      <h1 style={{ position: 'absolute', color: 'white', margin: '0' }}>
        WebGLScene!
      </h1>
      <canvas
        ref={canvasElement}
        style={{ width: '100vw', height: '100vh', background: '#000' }}
      />
    </React.Fragment>
  )
}

export default WebGLScene
