import React, { useEffect, useState } from 'react'

const Success = (props) => {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const timer = () =>
			setTimeout(() => {
				setShow(false)
				props.resetSuccesMessage()
			}, 10000)
		const timerId = timer()
		return () => {
			clearTimeout(timerId)
		}
	}, [show])

	const handleCloseButton = (event) => {
		event.preventDefault()
		props.resetSuccesMessage()
		setShow(!show)
	}

	return (
		<>
			<div className={`body-notification shadow-lg border border-success ${show ? 'd-none' : ''}`}>
				<div className='body-notification-wrap text-success'>
					<i className='icon-clipboard-check-solid' />
					<p className='text-success'>{props.message}</p>
					<button
						onClick={handleCloseButton}
						type='button'
						className='close body-notification-close'
					>
						<span aria-hidden='true'>&times;</span>
					</button>
				</div>
			</div>
		</>
	)
}

export default Success
