import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
// import Authorization from "../components/Admin/Authorization/Authorization";
import store from "../store/store";
import "../styles/fontawesome/css/all.min.css";
import "../styles/theme-scss/custom.scss";

import { appWithTranslation } from "next-i18next/pages";
import nextI18NextConfig from "../next-i18next.config.js";
// import SiteHeader from "../components/Frontend/Header/SiteHeader";
// import Product from "./admin/product";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.asPath !== "/auth/sly-login" &&
      sessionStorage.setItem("login_path", router.asPath);
  }, [router]);
  return (
    <>
      <Provider store={store}>
        {/* <SiteHeader /> */}
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/favicon/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>

        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
