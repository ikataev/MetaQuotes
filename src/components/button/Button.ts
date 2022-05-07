import * as Style from './Button.less'

export type ButtonClicked = (event: MouseEvent) => void

export const Button = (title: string, onClick: ButtonClicked): HTMLButtonElement => {
    const button = document.createElement('button')

    button.type = 'button'
    button.innerText = title
    button.className = Style.button
    button.addEventListener('click', (event: MouseEvent) => onClick(event))

    return button
}
