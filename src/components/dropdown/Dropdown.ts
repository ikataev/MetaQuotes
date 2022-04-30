export const Dropdown = (values: any[], selected: any) => {
	const dropdown = document.createElement('select')

	values.forEach((value) => {
		const option = document.createElement('option')

		option.value = value
		option.textContent = value
		option.selected = value === selected

		dropdown.appendChild(option)
	})

	return dropdown
}