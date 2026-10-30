import axios from 'axios'
import { useEffect } from 'react'
import Storage from '../../../Helpers/Auth/Storage'

const LayoutBlank = (props) => {
	// Set global token
	useEffect(() => {
		axios.defaults.baseURL = process.env.api_url
		axios.defaults.headers.Authorization = `Bearer ${Storage.getToken()}`
	})

	return (
		<>
			<div className='wrapper-blank admin-login-form'>{props.children}</div>
		</>
	)
}

export default LayoutBlank
