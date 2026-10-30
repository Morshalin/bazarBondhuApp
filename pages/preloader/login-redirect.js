import router from 'next/router'
import { useEffect, useState } from 'react'
import Storage from '../../Helpers/Auth/Storage'

const LoginRedirect = () => {
	const [message, setMessage] = useState(null)

	useEffect(() => {
		let replaceRoute = sessionStorage.getItem('login_path') ?? '/'
		let clearWindowTimeout = window.setTimeout(function () {
			sessionStorage.removeItem('login_path')
			router.replace(replaceRoute)
		}, 5000)
		function getCookie(cookieName) {
			let cookies = document.cookie

			let tokenData = cookies
				? cookies.split('; ').find((row) => row.startsWith(cookieName))
				: ''

			return tokenData ? decodeURIComponent(tokenData.split('=')[1]) : ''
		}

		let decodeMessage = getCookie('login_confirmation')
		decodeMessage && (decodeMessage = JSON.parse(decodeMessage))
		if (decodeMessage.success) {
			decodeMessage && Storage.store(JSON.stringify(decodeMessage.data))
		}
		document.cookie =
			'login_confirmation=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/'
		decodeMessage && setMessage(decodeMessage.message)

		return () => {
			clearTimeout(clearWindowTimeout)
		}
	}, [])

	return (
		<>
			<div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
				<div style={{ width: '100%', textAlign: 'center' }}>
					<img src='/processing-loder/loader.gif' />
					<h3>{message ?? 'Opps login not success please try again'}</h3>
					<p> System will redirect, within 5 seconds..</p>
					<br />
					<br />
				</div>
			</div>
		</>
	)
}

export default LoginRedirect
