import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Success from "../Notification/Success";
import Error from "../Notification/Error";
import {connect} from "react-redux";
import {useRouter} from "next/router";

const GridMenu = (props) => {

    const [loading, setLoading] = useState(false);


    const router = useRouter();

    const {id} = router.query;

    return (
        <>

            <section className="custom-card mx-auto">
                <div className="container-fluid">
                    <div className="row">
                        <div className="custom-card-box">
                            <div className="custom-card-box-header">
                                <div className="fbh-title">
                                    <i className="fas fa-cogs"></i>
                                    <h2>Settings</h2>
                                    <hr />
                                </div>
                            </div>

                            <div className="custom-card-box-content">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col">
                                                <a href="#">
                                                    <i style={{display:"block"}} className="fas fa-sliders-h fa-4x fa-border"></i>
                                                    <div className="text-center"><span>Global Settings</span></div>
                                                </a>
                                            </div>

                                            <div className="col">
                                                <Link legacyBehavior href={`/admin/settings/site-settings`}>
                                                    <a className="nav-link">
                                                        <i style={{display:"block"}} className="fas fa-tools fa-4x fa-border"></i>
                                                        <div className="text-center"><span>Site Settings</span></div>
                                                    </a>
                                                </Link>
                                            </div>

                                            <div className="col">
                                                <Link legacyBehavior href={`/admin/settings/payment-gateway`}>
                                                    <a className="nav-link">
                                                        <i style={{display:"block"}} className="fas fa-wallet fa-4x fa-border"></i>
                                                        <div className="text-center"><span>Payment Gateway</span></div>
                                                    </a>
                                                </Link>
                                            </div>

                                            <div className="col">
                                                <Link legacyBehavior href={`/admin/settings/meta-tag`}>
                                                    <a className="nav-link">
                                                        <i style={{display:"block"}} className="fas fa-code fa-4x fa-border"></i>
                                                        <div className="text-center"><span>Meta Tag</span></div>
                                                    </a>
                                                </Link>
                                            </div>

                                            <div className="col">
                                                <a href="#">
                                                    <i style={{display:"block"}} className="fas fa-project-diagram fa-4x fa-border"></i>
                                                    <div className="text-center"><span>API & Services</span></div>
                                                </a>
                                            </div>

                                            <div className="col">
                                                <a href="#">
                                                    <i style={{display:"block"}} className="fas fa-envelope fa-4x fa-border"></i>
                                                    <div className="text-center"><span>Email & SMS</span></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    );
}

export default GridMenu;