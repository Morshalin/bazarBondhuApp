import React, {useEffect} from "react";
import MultiCategory from "./MultiCategory";
import {useRouter} from "next/router";
import Link from 'next/link';
import axios from "axios";
import {SET_MENU_CATEGORIES} from "../../../store/frontend/actions/menuActions";
import {connect} from "react-redux";

const ProductCategory = (props) => {

    const router = useRouter();
    const cat_slug = router.query.slug;

    const hasSubmenu = 'has-sub-menu';
    const menuCollapsed = ' collapsed';

    useEffect(() => {
        let mounted = true;

        getMenuCategories().then(res => {
            res.success && props.setMenuCategories(res.data);
        }).finally(() => {
            mounted = false;
        });

    }, []);

    const getMenuCategories = async () => {
        return await axios.get(`${process.env.api_url}/getAllCategoryWithChild/menuShow`).then(res => res.data).catch(err => err);
    }


    const hasChild = (parent) => {
        let flag = false;

        if (parent.child_categories.length > 0) {
            parent.child_categories.map((cat) => {
                if (cat.slug === cat_slug) {
                    flag = true;
                }

                if (cat.child_categories.length > 0) {
                    cat.child_categories.map((child_cat) => {
                        if (child_cat.slug === cat_slug) {
                            flag = true;
                        }
                    })
                }
            });

        }

        return flag;

    }

    return (
        <div className="accordion" id="sidebarMainMenu">
            <span className="section-tag">Product Category</span>
            {
                props.menuCategories.map((parent) => {
                    return (

                        <div
                            className="card" key={parent.id}>
                            <div className={`card-header ${parent.slug === cat_slug ? `menu_active` : ``}`}
                                 id={`singleLevelHeading${parent.id}`}>

                                <h2 className="mb-0">

                                    <Link legacyBehavior
                                        href={{
                                            pathname: '/category/[slug]',
                                            query: {slug: parent.slug},
                                        }}>

                                        <a
                                            className={`nav-link ${(parent.child_categories.length > 0) ? cat_slug === parent.slug ? hasSubmenu : hasChild(parent) ? hasSubmenu : hasSubmenu + menuCollapsed : ''}`}
                                            data-toggle={parent.child_categories.length ? `collapse` : ``}
                                            data-target={parent.child_categories.length ? `#singleLevelMenu${parent.id}` : ``}
                                            aria-expanded={cat_slug === parent.slug ? true : hasChild(parent) ? true : false}
                                            aria-controls={parent.child_categories.length ? `singleLevelMenu${parent.id}` : ``}>
                                            <img src={parent.menu_icon} alt={parent.name}/>
                                            <span>{parent.name}</span>
                                        </a>
                                    </Link>

                                </h2>
                            </div>

                            {
                                parent.child_categories.length ? parent.child_categories.map((children_cat) => {

                                    return (
                                        <div
                                            id={`singleLevelMenu${parent.id}`}
                                            className={hasChild(parent) ? `collapse show` : `collapse`}
                                            aria-labelledby={`singleLevelHeading${parent.id}`}
                                            data-parent="#sidebarMainMenu" key={children_cat.id}>

                                            <div className="card-body">

                                                <div className="accordion sl-accordian"
                                                     id={`multiLevel${children_cat.id}`}>

                                                    <div className="card">


                                                        <div
                                                            className={children_cat.slug === cat_slug ? `menu_active` : ``}
                                                            id={`multiLevelMenu${children_cat.id}`}>
                                                            <h2 className="mb-0">

                                                                <Link legacyBehavior
                                                                    href={{
                                                                        pathname: '/category/[slug]',
                                                                        query: {slug: children_cat.slug},
                                                                    }}>
                                                                    <a
                                                                        className={`nav-link ${children_cat.child_categories.length ? cat_slug === children_cat.slug ? `has-sub-menu` : hasChild(children_cat) ? `has-sub-menu` : `has-sub-menu collapsed` : ``}`}
                                                                        data-toggle={children_cat.child_categories.length ? `collapse` : ``}
                                                                        data-target={`#multiLevelItem${children_cat.id}`}
                                                                        aria-expanded={cat_slug === children_cat.slug ? true : false}
                                                                        aria-controls={`multiLevelItem${children_cat.id}`}>

                                                                        {children_cat.name}

                                                                    </a>
                                                                </Link>


                                                            </h2>
                                                        </div>


                                                        {
                                                            children_cat.child_categories.length ?

                                                                <MultiCategory category={children_cat}/> : ''
                                                        }


                                                    </div>


                                                </div>
                                            </div>


                                        </div>
                                    )

                                }) : ''
                            }


                        </div>

                    )
                })
            }
            {/* <div className="sd-support-policy">
                        <span className="section-tag">Help & Support</span>
                        <div className="sdsp-info">
                            <a href="tel:+8801718659502" className="sdsp-info-box">
                                <img src="/img/help-line.png" alt="Hotline"/>
                                <p>
                                    <span className="sdsp-title">Hotline Number</span>
                                    <span className="sdsp-details">+880 1913 800 800</span>
                                </p>
                            </a>
                            <a href="mailto:info@onushorit.com" className="sdsp-info-box">
                                <img src="/img/email.png" alt="Hotline"/>
                                <p>
                                    <span className="sdsp-title">Email Us</span>
                                    <span className="sdsp-details">support@desktopit.com.bd</span>
                                </p>
                            </a>
                            <a href="#" className="sdsp-info-box">
                                <img src="/img/power1.png" alt="DESKTOP IT"/>
                                <p>
                                    <span className="sdsp-title">Powered By</span>
                                    <span className="sdsp-details">desktopit.com.bd</span>
                                </p>
                            </a>
                        </div>
                        <div className="sdsp-link">
                            <span className="section-tag">Help & Support</span>
                            <p>
                                <a href="#">About us</a>,
                                <a href="#">Contact us</a>,
                                <a href="#">Privacy policy</a>,
                                <a href="#">Purchase policy</a>,
                                <a href="#">Cookie policy</a>,
                                <a href="#">Terms & conditions</a>,
                                <a href="#">Returns policy</a>
                            </p>
                        </div>
                        <div className="sdsp-copyright">
                            <p><i className="far fa-copyright"></i> Deskto Shop 2020</p>
                        </div>
                    </div> */}


        </div>

    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        setMenuCategories: (menu_categories) => dispatch({type: SET_MENU_CATEGORIES, payload: {menu_categories}}),
    }
}

const mapStateToProps = (store) => {

    const {menuCategories} = store.menuStore;

    return {menuCategories};
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory);

// export default ProductCategory;