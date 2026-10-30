import React from "react";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-copyright">
          <div className="container-fluid">
            <div className="row">
              <div className=" col-sm-6">
                <p className="fcr-text text-center">
                  <i className="far fa-copyright"></i> {process.env.app_name}{" "}
                  {new Date().getFullYear()}
                </p>
              </div>
              <div className="col-sm-6">
                <p className="fpb-text text-center">
                  Powered by{" "}
                  <a href="http://desktopit.net/" target="_blank">
                    Desktop IT
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
