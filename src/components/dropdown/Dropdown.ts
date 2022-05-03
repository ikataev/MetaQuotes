import * as Style from "./Dropdown.less"

export const Dropdown = (onChange: (value: number) => void, values?: Array<number>, selected?: number) => {
	const dropdown = document.createElement('select')
	const setValues = (_values: Array<string | number>, _selected: string | number) => {
		dropdown.innerHTML = ''

		_values.forEach((value, index) => {
			// if (index > 100) {
			// 	return
			// }

			const option = document.createElement('option')

			option.value = value as string
			option.textContent = value as string
			option.selected = value === _selected

			dropdown.appendChild(option)
		})
	}

	dropdown.className = Style.dropdown
	dropdown.addEventListener('change', () => {
		onChange(parseInt(dropdown.value))
	})

	// dropdown.addEventListener('scroll', (event) => {
	// 	console.log('scroll', event)
	// })

	if (values?.length) {
		setValues(values, selected)
	}

	return {component: dropdown, setValues}
}