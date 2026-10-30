import Head from "next/head";

const AdminHeader = (props) => {
  let headerText = props.children ? props.children.split("|") : [""];

  return (
    <>
      <Head>
        <title>
          {props.children
            ? headerText[0] + ` | ${process.env.app_name}`
            : `${process.env.app_name}`}
        </title>
      </Head>
    </>
  );
};
export default AdminHeader;
