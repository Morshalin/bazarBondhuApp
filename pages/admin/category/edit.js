import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";

const UpdateCategoryIndex = () => {
  return (
    <>
      <AdminHeader>{`Edit Category | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <h1 className="mt-5 text-center mb-5">404 - Category Not Found</h1>
      </Layout>
    </>
  );
};

export default UpdateCategoryIndex;
