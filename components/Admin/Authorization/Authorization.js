// import { useRouter } from 'next/router'
// import React from 'react'
// import { connect } from 'react-redux'
// import Storage from '../../../Helpers/Auth/Storage'
// import Unauthorized from '../../../pages/Unauthorized'
// import {Permissions} from "../../../Helpers/Utils/Utils"

// const Authorization = (props) => {
// 	let permissions=Permissions();
// 	const router = useRouter()
// 	let allowed = false
// 	let path = router.pathname.split('/')

// 	if (typeof window !== 'undefined') {
// 		if (
// 			!permissions.length &&
// 			Storage.isLoggedIn() &&
// 			path[1] === 'admin' &&
// 			router.pathname !== '/auth/sly-login'
// 		) {
// 			// router.push('/')
// 		}
// 	}

// 	if (!path[3]) {
// 		path[3] = 'view'
// 	}
// 	if (router.pathname === '/auth/sly-login' || path[1] !== 'admin') {
// 		allowed = true
// 	}

// 	if (
// 		permissions &&
// 		(path[2] === 'dashboard' || router.pathname === '/admin')
// 	) {
// 		allowed = true
// 	}
// 	permissions &&
// 	permissions.map((perm, index) => {
// 			if (path[2] === perm.module && path[3] === perm.permission_type) {
// 				allowed = true
// 			}
// 		})

// 	// const ComponentToRender = allowed ? props.Component : Unauthorized
// 	const ComponentToRender = 1 ? props.Component : Unauthorized
// 	let pageProps = props.pageProps
// 	return <ComponentToRender {...pageProps} />
// }

// // export default Authorization;
// const mapStateToProps = (store) => {
// 	const { permissions } = store.authorizationStore
// 	return { permissions }
// }
// export default connect(mapStateToProps, null)(Authorization)
