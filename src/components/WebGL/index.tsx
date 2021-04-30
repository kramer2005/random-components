import React, { useRef, useEffect } from 'react'
import setup, {
  aproximateCamera,
  distanceCamera,
  resize
} from './setupPointCloud'

const WebGL = (): JSX.Element => {
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const fps = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const canvas = canvasElement.current
    if (canvas === null || fps.current === null) {
      return
    }

    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') {
        aproximateCamera()
      } else if (e.key === 'ArrowDown') {
        distanceCamera()
      }
    })

    window.addEventListener('resize', () => resize(canvas))

    setup(canvas, fps.current)
    return () => {
      canvas.getContext('webgl')?.flush()
    }
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
        style={{ width: '100vw', height: '100vh', background: '#000' }}
      />
    </React.Fragment>
  )
}

export default WebGL
