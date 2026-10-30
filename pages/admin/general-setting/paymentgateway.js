import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import PaymentGatewaySettingForm from "../../../components/Admin/GeneralSetting/PaymentGatewaySettingForm";

const PaymentgatewaySetting = () => {
  return (
    <>
      <AdminHeader>{`Paymentgateway Setting | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <PaymentGatewaySettingForm />
      </Layout>
    </>
  );
};

export default PaymentgatewaySetting;
