import Select from 'react-select'

const Input = (props) => {
	const {
		inputType,
		label,
		placeHolder,
		inputId,
		inputName,
		inputedValue,
		onChnageInput,
		required,
		selectedOptions,
		inputReadOnly,
		errorMessage,
		formClass,
		defaultInputChecked,
		textareaRow,
	} = props

	const isError = `form-control ${errorMessage ? 'is-invalid' : ''}`

	switch (inputType) {
		case 'checkbox':
			return (
				<div className='custom-control custom-checkbox'>
					<input
						type='checkbox'
						className='custom-control-input'
						defaultChecked={inputedValue ? true : false}
						name={inputName}
						onChange={onChnageInput}
						id={inputId ?? inputName}
					/>
					<label className='custom-control-label' htmlFor={inputId ?? inputName}>
						{label}
					</label>
				</div>
			)

		case 'radio':
			return (
				<>
					<div className='custom-control custom-radio'>
						<input
							type='radio'
							className='custom-control-input'
							id={inputId ?? inputName}
							name={inputName ?? ''}
							value={inputedValue ?? ''}
							checked={defaultInputChecked}
							onChange={(event) => {
								event.preventDefault()
								onChnageInput(event.target.name, event.target.value)
							}}
						/>
						<label className='custom-control-label' htmlFor={inputId ?? inputName}>
							{label}
						</label>
					</div>
				</>
			)

		case 'textarea':
			return (
				<div className={`form-group ${formClass ?? ''}`}>
					<label htmlFor={inputId ?? inputName}>
						{label}
						{required ? <span className='text-danger'>*</span> : ''}
					</label>
					<textarea
						className={isError}
						rows={textareaRow ?? `6`}
						placeholder={placeHolder ?? ''}
						id={inputId ?? inputName}
						name={inputName ?? ''}
						value={inputedValue ?? ''}
						onChange={(event) => {
							event.preventDefault()
							onChnageInput(event.target.name, event.target.value)
						}}
					/>
					{errorMessage && <div className='invalid-feedback'>{errorMessage}</div>}
				</div>
			)

		case 'select-plugin':
			return (
				<div className={`form-group ${formClass ?? ''}`}>
					<label htmlFor={inputId ?? inputName}>
						{label}
						{required ? <span className='text-danger'>*</span> : ''}
					</label>
					<Select
						instanceId={inputId}
						value={selectedOptions}
						isClearable={true}
						onChange={(selectedOption) => {
							onChnageInput(
								inputName,
								selectedOption?.value ?? null,
								null,
								selectedOption?.label ?? null
							)
						}}
						options={inputedValue}
						autoFocus={false}
						theme={(theme) => ({
							...theme,
							borderRadius: 0,
						})}
					/>
					{errorMessage && <div className='invalid-feedback'>{errorMessage}</div>}
				</div>
			)

		default:
			return (
				<div className={`form-group ${formClass ?? ''}`}>
					<label htmlFor={inputId ?? inputName}>
						{label}
						{required ? <span className='text-danger'>*</span> : ''}
					</label>
					<input
						type={inputType}
						className={isError}
						placeholder={placeHolder ?? ''}
						id={inputId ?? inputName}
						name={inputName ?? ''}
						value={inputedValue ?? ''}
						onChange={(event) => {
							event.preventDefault()
							onChnageInput(event.target.name, event.target.value)
						}}
						required={required ? 'required' : ''}
						readOnly={inputReadOnly}
					/>
					{errorMessage && <div className='invalid-feedback'>{errorMessage}</div>}
				</div>
			)
	}
}

export default Input
