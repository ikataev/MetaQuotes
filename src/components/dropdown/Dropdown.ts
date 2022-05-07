import * as Style from './Dropdown.less'

export type DropdownValueChanged = (value: number) => void
export type DropdownSetValuesCallback = (values: number[], selected: number) => void

export type DropdownResponse = {
    component: HTMLSelectElement
    setValues: DropdownSetValuesCallback
}

export const Dropdown = (onChange: DropdownValueChanged, values?: number[], selected?: number): DropdownResponse => {
    const dropdown = document.createElement('select')
    const setValues = (_values: number[], _selected: number) => {
        dropdown.innerHTML = ''

        _values.forEach((value, index) => {
            const option = document.createElement('option')

            option.value = value.toString()
            option.textContent = value.toString()
            option.selected = value === _selected

            dropdown.appendChild(option)
        })
    }

    dropdown.className = Style.dropdown
    dropdown.addEventListener('change', () => {
        onChange(parseInt(dropdown.value))
    })

    if (values?.length) {
        setValues(values, selected)
    }

    return {component: dropdown, setValues}
}
