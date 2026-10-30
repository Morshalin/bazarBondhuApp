import AdminHeader from "../../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../../components/Admin/Layout/Layout";
import AccountsSupplierHistory from "../../../../../components/Admin/Accounts/Supplier/AccountsSupplierHistory";

const History = () => {

    return (
        <>
            <AdminHeader>Supplier's Accounts History</AdminHeader>
            <Layout>
                <AccountsSupplierHistory/>
            </Layout>
        </>
    );
}
export default History;