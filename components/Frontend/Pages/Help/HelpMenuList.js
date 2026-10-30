import React, {useState, useEffect} from "react";
import Link from "next/link";

const HelpMenuList = (props) => {
    return (
        <>
            <div className="help-sticky">
                <div className="list-group rounded-0">
                    <Link legacyBehavior
                        href={{
                            pathname: '/help/about-us',

                        }}>
                        <a href="#" className={`list-group-item list-group-item-action ${props.slug=='about-us'?'active':''} d-flex align-items-center`}>
                            <i className="icon-question-circle mr-2"></i>
                            <span>About Us</span>
                        </a>
                    </Link>

                    <Link legacyBehavior
                        href={{
                            pathname: '/help/return-policy',

                        }}>
                        <a href="#" className={`list-group-item list-group-item-action ${props.slug==='return-policy'?'active':''} d-flex align-items-center`}>                            <i className="icon-share-alt mr-2"></i>
                            <span>Return Policy</span>
                        </a>
                    </Link>

                    <Link legacyBehavior
                        href={{
                            pathname: '/help/refund-policy',

                        }}>
                        <a href="#" className={`list-group-item list-group-item-action ${props.slug==='refund-policy'?'active':''} d-flex align-items-center`}>                            <i className="icon-investment mr-2"></i>
                            <span>Refund Policy</span>
                        </a>
                    </Link>


                    <Link legacyBehavior
                        href={{
                            pathname: '/help/how-to-use',

                        }}>
                        <a href="#" className={`list-group-item list-group-item-action ${props.slug==='how-to-use'?'active':''} d-flex align-items-center`}>                            <i className="icon-comments-alt mr-2"></i>
                            <span>How to Use</span>
                        </a>
                    </Link>
                    <Link legacyBehavior
                        href={{
                            pathname: '/help/faq',

                        }}>
                        <a href="#" className={`list-group-item list-group-item-action ${props.slug=='faq'?'active':''}  d-flex align-items-center`}>                            <i className="icon-question-circle mr-2"></i>
                            <span>FAQ</span>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )

}
export default HelpMenuList;