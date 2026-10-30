import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Storage from '../../../Helpers/Auth/Storage'

const LoginSection = () => {
	const router = useRouter()

	const [isLogin, setIsLogin] = useState(false)

	useEffect(() => {
		if (Storage.isLoggedIn()) {
			setIsLogin(true)
		} else {
			setIsLogin(false)
		}
	})

	const logout = () => {
		sessionStorage.removeItem('login_path')
		setIsLogin(false)
		Storage.clear()
		router.reload()
	}

	return (
		<>
			<div className='btn-group'>
				{isLogin ? (
					<>
						<a
							href='#'
							onClick={(e) => {
								e.preventDefault()
							}}
							role='button'
							className='btn dropdown-toggle'
							data-toggle='dropdown'
							aria-haspopup='true'
							aria-expanded='false'
						>
							<i className='far fa-user' />
						</a>

						<div className='dropdown-menu dropdown-menu-right shadow-sm'>
							<Link legacyBehavior href='/user/user-info'>
								<a className='dropdown-item' type='button'>
									<i className='icon-user-regular' />
									<span>User Information</span>
								</a>
							</Link>
							<Link legacyBehavior href='/user/order-info'>
								<a className='dropdown-item' type='button'>
									<i className='icon-list2' />
									<span>Order Information</span>
								</a>
							</Link>
							<Link legacyBehavior href='/user/wallet'>
								<a className='dropdown-item' type='button'>
									<i className="icon-coin"></i>
									<span>Wallet Balance</span>
								</a>
							</Link>
							<Link legacyBehavior href='/user/change-password'>
								<a className='dropdown-item' type='button'>
									<i className='icon-key' />
									<span>Change Password</span>
								</a>
							</Link>

							<Link legacyBehavior href='/'>
								<a
									className='dropdown-item'
									type='button'
									onClick={() => logout()}
								>
									<i className='icon-switch' />
									<span>Logout</span>
								</a>
							</Link>
						</div>
					</>
				) : (
					// <Link href='/'>
					<button
						className='btn dropdown-toggle border text-white'
						data-toggle='modal'
						data-target='#signin_modal'
						style={{ border: '2px solid #dee2e6 !important' }}
					>
						<i className='far fa-user' />
					</button>
					// </Link>
				)}
			</div>
		</>
	)
}

export default LoginSection
