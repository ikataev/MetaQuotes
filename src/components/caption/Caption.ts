export const Caption = (text: string): HTMLHeadingElement => {
    const caption = document.createElement('h1')

    caption.innerText = text

    return caption
}
