import React from 'react';
import {connect} from "react-redux";
import Link from "next/link";

const Category = (props) => {

    return (
        <>
            <section className="product-category">
                <div className="container-fluid text-center">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Find your needs from wide range of product categories</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">

                            {props.homeCategories.map(category =>
                                <div className="product-category-wrap" title={category.name} key={category.id}>
                                    <Link legacyBehavior
                                        href={{
                                            pathname: '/category/[slug]',
                                            query: { slug: category.slug },
                                        }}>

                                        <a>
                                            <img src={category.home_icon} height={80} width={80} alt={category.name} />
                                            <h5>{category.name}</h5>
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const mapStateToProps = (store) => {

    const { homeCategories } = store.menuStore;

    return { homeCategories };
}

export default connect(mapStateToProps, null)(Category);

