import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../../components/Admin/Header/AdminHeader'
import Layout from '../../../../components/Admin/Layout/Layout'
import EditUnit from '../../../../components/Admin/Unit/EditUnit'
import Unauthorized from "../../../Unauthorized";

const UpdateUnit = (props) => {
	const { asPath, route, query } = useRouter()
	const [unitEditData, setUnitEditData] = useState('')
	useEffect(() => {
		let isMounted = true

		const getUnit = async (unitId) => {
			const apiResponses = await axios.get(
				`${process.env.api_backend_url}/units/${unitId}`
			)
			return await apiResponses.data
		}

		if (asPath !== route) {
			getUnit(query.edit)
				.then((unit) => {
					if (unit.success) {
						isMounted && setUnitEditData(unit)
					} else {
						throw 'something goes wrong on server'
					}
				})
				.catch((errors) => {
					console.error(errors)
				})
		}

		return () => (isMounted = false)
	}, [asPath, route, query])

	return  (
		<>
			<AdminHeader>Edit Unit | Minimart</AdminHeader>
			<Layout serverPermissions={props.serverPermissions}>
				{unitEditData.success ? (
					<EditUnit unitEditData={unitEditData.data} />
				) : (
					''
				)}
			</Layout>
		</>
	)
}

// export const getServerSideProps = async (context) => {
//   const { req, res } = context;
//   if (!req.headers.cookie) {
//     res.writeHead(302, { Location: "/auth/login" });
//     res.end();
//   }
//   const cookieValue = req.headers.cookie
//     .split("; ")
//     .find((row) => row.startsWith("token"))
//     .split("=")[1];

//   const config = {
//     headers: {
//       authorization: `bearer ${cookieValue}`,
//     },
//   };

//   const unitId = context.query.edit ?? "";
//   const unitApiUrl = `${process.env.api_backend_url}/units/${unitId}`;
//   const unitData = await axios
//     .get(unitApiUrl, config)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return null;
//     });

//   return {
//     props: {
//       unitEditData: unitData ?? "",
//     },
//   };
// };

export async function getServerSideProps({ req, res }) {
	if (!req.headers.cookie) {
	  res.writeHead(302, { Location: "/auth/sly-login" });
	  res.end();
	}
	const token = req.headers.cookie
	  ?.split("; ")
	  ?.find((row) => row.startsWith("token"))
	  ?.split("=")[1];
  
  
	if (!token) {
	  return {
		redirect: {
		  destination: '/auth/sly-login',
		  permanent: false,
		},
	  }
	}
  
	const config = {
	  headers: {
		authorization: `bearer ${token}`,
	  },
	};
  
	const resp = await fetch(`${process.env.api_backend_url}/get-site-info`, {
	  method: 'GET',
	  headers: {
		Authorization: `bearer ${token}`,
		'Content-Type': 'application/json',
	  },
  
	})
	const data = await resp.json();
	let hasMenuPermission = (module, permission_type) => {
	  let isExists = false;
	  data.data.permissions &&
	  data.data.permissions.map((perm, index) => {
		  if (
			perm.module === module &&
			perm.permission_type === permission_type
		  ) {
			isExists = true;
		  }
		});
  
	  return isExists;
	};
	if (!hasMenuPermission("unit","edit")) {
	  return {
		notFound: true
	  }
   
	}
  
  
	return {
	  props: { serverPermissions: data.data.permissions }, // will be passed to the page component as props
	}
  
  
  }

export default UpdateUnit
