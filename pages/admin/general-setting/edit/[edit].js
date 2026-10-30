import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../components/Admin/Layout/Layout";
import ShopSettingForm from "../../../../components/Admin/ShopSetting/Edit/ShopSettingForm";

const EditHomeSlider = () => {
  return (
    <>
      <AdminHeader>{`Edit Shop Setting | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <ShopSettingForm />
      </Layout>
    </>
  );
};

export default EditHomeSlider;
