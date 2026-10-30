import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import ShopSettingTable from "../../../components/Admin/ShopSetting/List/ShopSettingTable";

const HomeSliderIndex = () => {
  return (
    <>
      <AdminHeader>{`Shop Setting | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <ShopSettingTable />
      </Layout>
    </>
  );
};

export default HomeSliderIndex;
