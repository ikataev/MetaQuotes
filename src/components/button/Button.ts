export const Button = (title: string, onClick: (event: MouseEvent) => void): HTMLButtonElement => {
	const button = document.createElement('button')

	console.log('Button', title, onClick)

	button.type = 'button'
	button.innerText = title
	button.addEventListener('click', (event: MouseEvent) => onClick(event))

	return button
}