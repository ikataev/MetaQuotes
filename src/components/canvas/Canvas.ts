import * as Style from './Canvas.less'

export const Canvas = (id: string, width: number, height: number): HTMLCanvasElement => {
    const canvas = document.createElement('canvas')
    const dpi = window.devicePixelRatio

    canvas.id = id
    canvas.width = width * dpi
    canvas.height = height * dpi
    canvas.className = Style.canvas
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    return canvas
}
