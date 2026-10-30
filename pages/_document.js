import Document, { Head, Html, Main, NextScript } from "next/document";
import HeaderAsset from "../components/Admin/Header/HeaderAsset";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* css */}
          <link rel="stylesheet" href="/fonts/icomon.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <HeaderAsset />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
