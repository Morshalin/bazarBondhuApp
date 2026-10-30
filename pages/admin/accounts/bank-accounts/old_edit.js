import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import EdiBankAccount from "../../../../components/Admin/Accounts/Bank/EdiBankAccount";
import Layout from "../../../../components/Admin/Layout/Layout";

const BankEdit = () => {
  return (
    <>
      <AdminHeader>Accounts Bank Edit</AdminHeader>
      <Layout>
        <EdiBankAccount />
      </Layout>
    </>
  );
};
export default BankEdit;
