import React from 'react';

const ProductReview = () => {

    return (
        <>
            <div className="modal fade" id="signin_modal" tabIndex="-1" aria-labelledby="signInModalLevel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="signInModalLevel">Sign In</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">

                                <div className="col-12">

                                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                                         aria-orientation="vertical">

                                        <a className="nav-link active"
                                           id="v-pills-email-login-tab"
                                           data-toggle="pill"
                                           href="#v-pills-email-login"
                                           role="tab"
                                           aria-controls="v-pills-email-login"
                                           aria-selected="true">
                                            <i className="icon-envelope-regular mr-2 pt-1"/>Login
                                            with <strong>Email</strong>

                                        </a>

                                        <a className="nav-link"
                                           id="v-pills-phone-login-tab"
                                           data-toggle="pill"
                                           href="#v-pills-phone-login"
                                           role="tab"
                                           aria-controls="v-pills-phone-login"
                                           aria-selected="false">
                                            <i className="icon-phone mr-2"/> Login with <strong>Phone Number</strong>
                                        </a>

                                    </div>

                                </div>

                                <div className="col-12 mt-4">

                                    <div className="tab-content" id="v-pills-tabContent">

                                        <div
                                            className="tab-pane fade show active"
                                            id="v-pills-email-login"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-email-login-tab">

                                            <div className="login-form">
                                                <form>

                                                    <div className="form-group">

                                                        <label
                                                            className="sr-only"
                                                            htmlFor="email">
                                                            User ID
                                                        </label>

                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    <i className="icon-user-regular"/>
                                                                </div>
                                                            </div>

                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                id="email"
                                                                placeholder="Username or Email"/>
                                                        </div>
                                                    </div>


                                                    <div className="form-group">

                                                        <label
                                                            className="sr-only"
                                                            htmlFor="password">
                                                            Password
                                                        </label>

                                                        <div className="input-group">

                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    <i className="icon-key"/>
                                                                </div>
                                                            </div>

                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                id="password"
                                                                placeholder="Password"/>
                                                        </div>
                                                    </div>

                                                </form>

                                            </div>

                                        </div>

                                        <div
                                            className="tab-pane fade"
                                            id="v-pills-phone-login"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-phone-login-tab">


                                            <div className="login-form">

                                                <form>

                                                    <div className="form-group">

                                                        <label
                                                            className="sr-only"
                                                            htmlFor="phone">
                                                            Phone
                                                        </label>

                                                        <div className="input-group">

                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    <i className="icon-phone"/>
                                                                </div>
                                                            </div>

                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="phone"
                                                                placeholder="Phone"/>
                                                        </div>
                                                    </div>

                                                </form>

                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-warning btn-lg btn-block">Login <i
                                className="fas fa-sign-in-alt"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductReview;