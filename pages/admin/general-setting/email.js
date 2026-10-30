import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import EmailSettingForm from "../../../components/Admin/GeneralSetting/EmailSettingForm";

const EmailSetting = () => {
  return (
    <>
      <AdminHeader>{`Email Setting | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <EmailSettingForm />
      </Layout>
    </>
  );
};

export default EmailSetting;
