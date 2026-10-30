import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../components/Admin/Layout/Layout";
import EditBrand from "../../../../components/Admin/Brand/Edit/EditBrand";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const UpdateBrand = () => {
  const { asPath, route, query } = useRouter();
  const [brandEditData, setBrandEditData] = useState("");
  useEffect(() => {
    let isMounted = true;

    const getBrand = async (brandId) => {
      const apiResponses = await axios.get(
        `${process.env.api_backend_url}/brands/${brandId}`
      );
      return await apiResponses.data;
    };

    if (asPath !== route) {
      getBrand(query.edit)
        .then((brand) => {
          if (brand.success) {
            isMounted && setBrandEditData(brand);
          } else {
            throw "something goes wrong on server";
          }
        })
        .catch((errors) => {
          // console.error(errors);
        });
    }

    return () => (isMounted = false);
  }, [asPath, route, query]);

  return (
    <>
      <AdminHeader>Edit Brand | Minimart</AdminHeader>
      <Layout>
        {brandEditData.success ? (
          <EditBrand brandEditData={brandEditData.data} />
        ) : (
          ""
        )}
      </Layout>
    </>
  );
};

export default UpdateBrand;
