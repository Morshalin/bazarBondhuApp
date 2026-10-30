import Head from "next/head";
import React, { memo } from "react";
import { useRouter } from "next/router";

const AdminHeader = (props) => {
  const router = useRouter();
  const url = process.env.app_url + router.asPath;

  return (
    <>
      <Head>
        <title>
          {props.title ??
            `${process.env.app_name} - বাংলাদেশের প্রথম ডিজিটাল কমার্স - ডি-কমার্স`}
        </title>

        <meta
          name="keywords"
          content={
            props.keywords ??
            "bangladesh online grocery, bangladesh bazaar, best bazaar, daily bazaar, daily shop, large shop, bd shop, shop, online store,  buy, sell, home shop, Meat, Oil, Chal, Free home delivery, Fresh vegetables, formalin free, free return"
          }
        />
        <meta
          name="description"
          content={
            props.description ??
            "Order grocery and food online with same-day home delivery. Save money, save time"
          }
        />
        <meta
          property="og:title"
          content={
            props.ogTitle ??
            "bangladesh online grocery, bangladesh bazaar, best bazaar, daily bazaar, daily shop, large shop, bd shop, shop, online store,  buy, sell, home shop, Meat, Oil, Chal, Free home delivery, Fresh vegetables, formalin free, free return"
          }
        />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={props.ogType ?? "website"} />
        <meta property="og:image" content={props.ogImage} />
        <meta
          property="og:site_name"
          content={props.ogSiteName ?? process.env.app_name}
        />
        <meta
          property="og:description"
          content={
            props.ogDescription ??
            "Order grocery and food online with same-day home delivery. Save money, save time"
          }
        />
      </Head>
    </>
  );
};
export default memo(AdminHeader);
