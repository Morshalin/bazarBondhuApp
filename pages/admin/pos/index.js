import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import React from "react";
import LayoutPos from "../../../components/Admin/Layout/LayoutPos";
import SearchBar from "../../../components/Admin/Pos/SearchBar";
import Customer from "../../../components/Admin/Pos/Customer";
import CartProducts from "../../../components/Admin/Pos/CartProducts";
import CartCalculation from "../../../components/Admin/Pos/CartCalculation";
import Checkout from "../../../components/Admin/Pos/Checkout";
import PosModal from "../../../components/Admin/Pos/PosModal";

import { connect } from "react-redux";
// import { useRouter } from "next/router";
// import Unauthorized from "../../Unauthorized";
// import axios from "axios";
// import { Permissions } from "../../../Helpers/Utils/Utils";

const POS = (props) => {
  console.log("POS page");
  return (
    <>
      <AdminHeader>{`POS | ${process.env.app_name}`}</AdminHeader>
      {
        <LayoutPos serverPermissions={props.serverPermissions}>
          <section className="pos-container">
            <div className="container-fluid">
              <div className="pos-content-wrap">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="pos-content-left shadow">
                      <div className="pos-product-select">
                        <div className="prodict-filter">
                          {/*Searched by product and product code*/}
                          <SearchBar />

                          <div className="row">
                            {/*Product select by warehouse*/}
                            {/*<WarehouseSearch />*/}

                            {/*Product select by Category*/}
                            {/*<CategorySearch />*/}

                            {/*Product select by brand*/}
                            {/*<BrandSearch />*/}
                          </div>
                        </div>

                        <div className="product-showcase">
                          <CartProducts />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="pos-content-right shadow">
                      <div className="pos-sales-form">
                        <Customer />

                        {/*<CartProducts />*/}

                        <CartCalculation />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Checkout />
          <PosModal />
        </LayoutPos>
      }
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  if (!req.headers.cookie) {
    res.writeHead(302, { Location: "/auth/sly-login" });
    res.end();
  }
  const token = req.headers.cookie
    ?.split("; ")
    ?.find((row) => row.startsWith("token"))
    ?.split("=")[1];

  if (!token) {
    return {
      redirect: {
        destination: "/auth/sly-login",
        permanent: false,
      },
    };
  }

  // const config = {
  //   headers: {
  //     authorization: `bearer ${token}`,
  //   },
  // };

  const resp = await fetch(`${process.env.api_backend_url}/get-site-info`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await resp.json();

  // console.log(data.data.permissions);

  let hasMenuPermission = (module, permission_type) => {
    let isExists = false;
    data.data.permissions &&
      data.data.permissions.map((perm, index) => {
        if (
          perm.module === module &&
          perm.permission_type === permission_type
        ) {
          isExists = true;
        }
      });

    return isExists;
  };
  if (!hasMenuPermission("pos", "view")) {
    return {
      notFound: true,
    };
  }

  return {
    props: { serverPermissions: data.data.permissions }, // will be passed to the page component as props
  };
}

export default POS;
