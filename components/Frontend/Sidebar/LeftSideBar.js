import ProductCategory from "./ProductCategory";
import React, {useEffect, useState} from "react";
import Storage from "../../../Helpers/Auth/Storage";
import {useRouter} from "next/router";
import Link from "next/link";
// import {getSiteSettings} from "../../../Helpers/Utils/Utils";

const LeftSideBar = (props) => {

    const router = useRouter();

    const [user, setUser] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [shopData, setshopData] = useState('');

    useEffect(() => {
        if (Storage.isLoggedIn()) {
            setUser(Storage.getUser());
            setUserPhone(Storage.getUserPhone());
        }

    }, []);


    const logout = () => {
        Storage.clear();

        if (!Storage.isLoggedIn()) {
            router.reload();
        }
    }

    // useEffect(() => {
    //     getSiteSettings().then(response => {
    //         if(response.success) {
    //             setshopData(response.data);
    //         }
    //     });
    // }, [])

    return (
        <>
            <nav id="sidebar" className={props.toggleChange ? 'shadow-lg active' : 'shadow-lg'}>
                <div className="sidebar-wrap">

                    <div className="client-login-area">
                        <a href="#"><img src="/img/user.png" alt="User Login"/></a>
                        <div className="client-login-detail">
                            <p className="welcome-text">Welcome</p>
                            <h4 className="cla-name" title="User Profile"><Link legacyBehavior href="/user/user-info"><a>{user?user:(userPhone?userPhone:'Dear Guest')}</a></Link></h4>
                            <p
                                onClick={(event) => {
                                    event.preventDefault();
                                    logout();
                                }}
                                className="cla-log-in-out">
                                {/*<a href="#">Logout</a>*/}
                            </p>
                        </div>
                    </div>

                    <ul className="list-unstyled sale-promo">
                        <span className="section-tag">Spacial Deals</span>
                        <li>
                            <Link legacyBehavior
                                href={{
                                    pathname: '/category/[slug]',
                                    query: {slug: 'best-selling-items'},
                                }}>
                                <a href="#" className="nav-link">
                                    <img src="/img/product-category/best-price.png" alt="Top selling items"/>
                                    <span>Best selling items</span>
                                </a>
                            </Link>

                        </li>
                        <li>
                            <Link legacyBehavior
                                href={{
                                    pathname: '/category/[slug]',
                                    query: {slug: 'best-offers'},
                                }}>
                                <a href="#" className="nav-link">
                                    <img src="/img/product-category/offer.png" alt="Best Offers"/>
                                    <span>Best Offers</span>
                                </a>
                            </Link>

                        </li>
                        <li>
                            <Link legacyBehavior
                                href={{
                                    pathname: '/category/[slug]',
                                    query: {slug: 'top-rated-items'},
                                }}>
                                <a href="#" className="nav-link">
                                    <img src="/img/product-category/star.png" alt="Top rated items"/>
                                    <span>Top rated items</span>
                                </a>
                            </Link>

                        </li>
                        <li>
                            <Link legacyBehavior
                                href={{
                                    pathname: '/category/[slug]',
                                    query: {slug: 'combo-sales'},
                                }}>
                                <a href="#" className="nav-link">
                                    <img src="/img/product-category/gift.png" alt="Top rated items"/>
                                    <span>Combo sales</span>
                                </a>
                            </Link>

                        </li>
                    </ul>


                    <ProductCategory/>

                    <div className="sd-support-policy">
                        <span className="section-tag">Help & Support</span>
                        <div className="sdsp-info">
                            <a href={`tel:+88${shopData.phone}`} className="sdsp-info-box">
                                <img src="/img/help-line.png" alt="Hotline"/>
                                <p>
                                    <span className="sdsp-title">Hotline Number</span>
                                    <span className="sdsp-details">{shopData.phone}</span>
                                </p>
                            </a>
                            <a href={`mailto:${shopData.shop_email}`} className="sdsp-info-box">
                                <img src="/img/email.png" alt="Hotline"/>
                                <p>
                                    <span className="sdsp-title">Email Us</span>
                                    <span className="sdsp-details">{shopData.shop_email}</span>
                                </p>
                            </a>
                            <a href="#" className="sdsp-info-box">
                                <img src="/img/power1.png" alt="DESKTOP IT"/>
                                <p>
                                    <span className="sdsp-title">Powered By</span>
                                    <span className="sdsp-details">Desktop IT</span>
                                </p>
                            </a>
                        </div>
                        <div className="sdsp-link">
                            <span className="section-tag">Terms & policy</span>
                            <p>
                                <Link legacyBehavior
                                    href={{
                                        pathname: '/contactus',

                                    }}>
                                    <a className="nav-link">
                                        Contact Us
                                    </a>
                                </Link>
                                <Link legacyBehavior
                                    href={{
                                        pathname: '/help/return-policy',

                                    }}>
                                    <a className="nav-link">
                                        Returns policy
                                    </a>
                                </Link>
                                <Link legacyBehavior
                                    href={{
                                        pathname: '/help/refund-policy',

                                    }}>
                                    <a className="nav-link">
                                        Refund policy
                                    </a>
                                </Link>
                                <Link legacyBehavior
                                    href={{
                                        pathname: '/help/faq',

                                    }}>
                                    <a className="nav-link">
                                        FAQ.
                                    </a>
                                </Link>
                            </p>
                        </div>
                        <div className="sdsp-copyright">
                            <p><i className="far fa-copyright"></i> dorkaari {new Date().getFullYear()}</p>
                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
}


export default LeftSideBar;