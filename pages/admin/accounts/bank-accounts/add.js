import AdminHeader from '../../../../components/Admin/Header/AdminHeader'
import Layout from '../../../../components/Admin/Layout/Layout'
import AddBankAccount from "../../../../components/Admin/Accounts/Bank/AddBankAccount";

const BankAdd = (props) => {
	return (
		<>
			<AdminHeader>Accounts Bank Add</AdminHeader>
            <Layout serverPermissions={props.serverPermissions}>
				<AddBankAccount/>
			</Layout>
		</>
	);
}
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
    if (!hasMenuPermission("bank-accounts","add")) {
      return {
        notFound: true
      }
   
    }
  
  
    return {
      props: { serverPermissions: data.data.permissions }, // will be passed to the page component as props
    }
  
  
  }
export default BankAdd;