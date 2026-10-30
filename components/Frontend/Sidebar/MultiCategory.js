import React from 'react';
import Router, {useRouter} from "next/router";
import Link from 'next/link';

const MultiCategory = ({category}) => {

    const router = useRouter();
    const cat_slug = router.query.slug;

    const showProductByCategory = (slug) => {
        Router.push({
            pathname: '/category/[slug]',
            query: {slug: slug},
        })
    }

    const hasChild = (parent) => {
        let flag = false;
        if (parent.child_categories.length > 0) {
            parent.child_categories.map((cat) => {
                if (cat.slug === cat_slug) {
                    flag = true;
                }
            })

        }

        return flag;
    }

    return (
        <>

            <div
                id={`multiLevelItem${category.id}`}
                className={hasChild(category) ? `collapse show` : ``}
                aria-labelledby={`multiLevelMenu${category.id}`}
                data-parent={`#multiLevel${category.id}`}>

                <div className="card-body">

                    <div
                        className={category.slug === cat_slug ? `panel-collapse collapse show` : hasChild(category) ? `panel-collapse collapse show` : `panel-collapse collapse`}
                        aria-expanded={hasChild(category) ? true : false}
                        href={category.slug}>
                        <ul className="list-group pull-down">

                            {
                                category.child_categories.map((child_cat) => {
                                    return (
                                        <li className={`list-group-item ${child_cat.slug === cat_slug ? `menu_active` : ``}`}
                                            key={child_cat.id}>
                                            <Link legacyBehavior
                                                href={{
                                                    pathname: '/category/[slug]',
                                                    query: {slug: child_cat.slug},
                                                }}>

                                                <a
                                                    className="nav-link">
                                                    {child_cat.name}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>

                </div>

            </div>

        </>
    );
};

export default MultiCategory;