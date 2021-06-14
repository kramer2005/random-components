import React, { useCallback, useState } from 'react'

// interface ICircle {
//   x: number
//   y: number
//   radius: number
//   color: string
// }

interface Point {
  x: number
  y: number
}

const colors: CSSStyleDeclaration['color'][] = [
  'red',
  'green',
  'blue',
  'yellow',
  'gray',
  'purple',
  'orange',
  'black',
  'cyan',
  'magenta'
]
const degToRad = (deg: number) => (deg * Math.PI) / 180

interface ISVGCircleProps {
  index: number
  total: number
  setColor: React.Dispatch<React.SetStateAction<CSSStyleDeclaration['color']>>
}

const precision2 = (n: number) => Number(n.toFixed(2))

const SVGCircle = ({ index, total, setColor }: ISVGCircleProps) => {
  const angle = degToRad(360 / total)

  if (total === 1) {
    return (
      <circle
        r={50}
        cx={50}
        cy={50}
        fill={colors[index]}
        onMouseDown={() => {
          setColor(colors[index])
        }}
      />
    )
  }

  const startPoint: Point = {
    x: precision2(Math.cos(angle * index - Math.PI / 2) * 50),
    y: precision2(Math.sin(angle * index - Math.PI / 2) * 50)
  }

  const finalPoint: Point = {
    x: precision2(Math.cos(angle * (index + 1) - Math.PI / 2) * 50),
    y: precision2(Math.sin(angle * (index + 1) - Math.PI / 2) * 50)
  }

  const M = `M ${startPoint.x + 50} ${startPoint.y + 50}`
  const A = `A 50 50 0 0 1 ${finalPoint.x + 50} ${finalPoint.y + 50}`
  const L = 'L 50 50'

  return (
    <path
      fill={colors[index]}
      d={`
    ${M} ${A} ${L}
  `}
      onMouseDown={() => {
        setColor(colors[index])
      }}
    />
  )
}

const createCircle = (
  partitions: number,
  setColor: React.Dispatch<React.SetStateAction<CSSStyleDeclaration['color']>>
) => {
  const ret = []

  for (let i = 0; i < partitions; i++) {
    ret.push(
      <SVGCircle index={i} total={partitions} key={i} setColor={setColor} />
    )
  }

  return ret
}

interface IProps {
  setColor: React.Dispatch<React.SetStateAction<CSSStyleDeclaration['color']>>
}

const Circle = ({ setColor }: IProps): JSX.Element => {
  const [partitions, setPartitions] = useState(1)

  const addDivision = useCallback(() => setPartitions((partitions % 10) + 1), [
    partitions,
    setPartitions
  ])

  return (
    <svg
      viewBox="0 0 100 100"
      style={{
        width: '600px',
        height: '600px'
      }}
      onClick={addDivision}
    >
      {createCircle(partitions, setColor)}
    </svg>
  )
}

export default Circle
