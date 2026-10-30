import Link from 'next/link'
import router from 'next/router'
import { useEffect, useState } from 'react'

const PaymentFailure = () => {
	const [message, setMessage] = useState(null)

	useEffect(() => {
		function getCookie(cookieName) {
			let cookies = document.cookie

			let tokenData = cookies
				? cookies.split('; ').find((row) => row.startsWith(cookieName))
				: ''

			return tokenData ? decodeURIComponent(tokenData.split('=')[1]) : ''
		}
		let decodeMessage = getCookie('payment_conformation')
		if (!decodeMessage) {
			router.replace('/')
		}
		decodeMessage && (decodeMessage = JSON.parse(decodeMessage))
		document.cookie =
			'payment_conformation=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/'
		setMessage(decodeMessage.message)
	}, [])

	return (
		<>
			<div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
				<div style={{ width: '100%', textAlign: 'center' }}>
					{/*<img src="/processing-loder/loader.gif"/>*/}
					<h1>OOPS !!!</h1>
					<h3>{message}</h3>
					<Link legacyBehavior href={'/user/order-info'}>
						<a style={{ color: '#23527c', textDecoration: 'none' }}>
							← Back to Your Order List
						</a>
					</Link>
					<br />
				</div>
			</div>
		</>
	)
}

export default PaymentFailure
