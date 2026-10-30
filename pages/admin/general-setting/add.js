import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import ShopSettingForm from "../../../components/Admin/ShopSetting/Add/ShopSettingForm";

const AddShopSetting = () => {
  return (
    <>
      <AdminHeader>{`Add Shop Setting | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <ShopSettingForm />
      </Layout>
    </>
  );
};

export default AddShopSetting;
