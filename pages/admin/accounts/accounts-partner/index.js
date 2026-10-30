import AdminHeader from '../../../../components/Admin/Header/AdminHeader'
import Layout from '../../../../components/Admin/Layout/Layout'
import PartnerList from '../../../../components/Admin/Accounts/Partner/PartnerList'

const AccountsPartner = () => {
	return (
		<>
			<AdminHeader>Partner List</AdminHeader>
			<Layout>
				<PartnerList/>
			</Layout>
		</>
	);
}

export default AccountsPartner;