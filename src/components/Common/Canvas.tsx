import { useRef, useEffect } from 'react'


const Canvas = props => {
  const canvasRef = useRef(null)
  const newProps = { ...props, diseases: "true" }

  const drawPolygon = (points, ctx, canvas) => {
    const margin = 5
    let minX, minY, maxX, maxY

    ctx.fillStyle = '#008eff50'
    ctx.lineWidth = 1
    ctx.strokeStyle = '#008eff'

    points.forEach((p, i) => {
      if (i === 0) { // if first point
        minX = maxX = p[0] // x is longitude
        minY = maxY = p[1] // y is latitude
      } else {
        minX = Math.min(p[0], minX)
        minY = Math.min(p[1], minY)
        maxX = Math.max(p[0], maxX)
        maxY = Math.max(p[1], maxY)
      }
    })

    // now get the map width and height in its local coords
    const mapWidth = (maxX - minX)
    const mapHeight = (maxY - minY)

    // to find the scale that will fit the canvas get the min scale to fit height or width
    const scale = Math.min((canvas.width - 2 * margin) / mapWidth, (canvas.height - 2 * margin) / mapHeight)

    // Calculate offsets to center the polygon in the canvas
    const offsetX = (canvas.width - mapWidth * scale) / 2
    const offsetY = (canvas.height - mapHeight * scale) / 2

    // Now you can draw the map centered on the canvas
    let end
    ctx.beginPath()
    if (points.length > 2) {
      points.forEach((p, i) => {
        let scaledX = (p[0] - minX) * scale + offsetX
        let scaledY = (maxY - p[1]) * scale + offsetY

        if (i === 0) {
          end = { x: scaledX, y: scaledY }
          ctx.moveTo(scaledX, scaledY)
        } else {
          ctx.lineTo(scaledX, scaledY)
        }
      })

      ctx.lineTo(end.x, end.y)
    } else {
      ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, 2 * Math.PI)
    }
    ctx.stroke()
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (props.pts && props.pts.length > 0) {
      drawPolygon(props.pts, context, canvas)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (props.pts && props.pts.length > 0) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      context.clearRect(0, 0, canvas.width, canvas.height)
      drawPolygon(props.pts, context, canvas)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pts])

  return <canvas ref={canvasRef} {...newProps} />
}

export default Canvas