import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import SmsSettingForm from "../../../components/Admin/GeneralSetting/SmsSettingForm";

const SmsSetting = () => {
  return (
    <>
      <AdminHeader>{`Sms Setting | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <SmsSettingForm />
      </Layout>
    </>
  );
};

export default SmsSetting;
