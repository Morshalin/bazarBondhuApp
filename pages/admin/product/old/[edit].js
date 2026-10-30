import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../components/Admin/Layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import process from "../../../../next.config";
import EditProduct from "../../../../components/Admin/Product/Edit/EditProduct";

const UpdateProduct = () => {
  const { asPath, route, query } = useRouter();
  const [productEditData, setProductEditData] = useState("");

  const productAPiDataFetching = async (productId) => {
    return await axios
      .get(`${process.env.api_backend_url}/products/${productId}`)
      .then((responseApi) => responseApi.data)
      .catch((errors) => errors);
  };

  useEffect(() => {
    let mounted = true;
    if (asPath !== route) {
      productAPiDataFetching(query.edit).then((product) => {
        if (mounted) {
          setProductEditData(product.data ?? "");
        }
      });
    }
    return () => (mounted = false);
  }, [asPath, route, query]);

  return (
    <>
      <AdminHeader>Edit Product | Minimart</AdminHeader>
      <Layout>
        {productEditData ? (
          <EditProduct productEditData={productEditData} />
        ) : (
          ""
        )}
      </Layout>
    </>
  );
};

export default UpdateProduct;
