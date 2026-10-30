import React, {useEffect, useState} from 'react';
import ProductQuickView from "../../Modals/ProductQuickView";
import {connect} from "react-redux";
import {SET_MODAL_PRODUCT} from "../../../../store/frontend/actions/productAction";
import SingleProduct from "../Home/SingleProduct";
import axios from "axios";
import {useRouter} from "next/router";
import InfiniteScroll from 'react-infinite-scroll-component';


const ProductList = (props) => {

    const router = useRouter();
    const {slug} = router.query;
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext] = useState('');

    useEffect(() => {
        setPage(1);
    }, [slug]);

    useEffect(() => {

        let mounted = true;
        mounted && getProductsByCategory().then(res => {
            if (res.success) {
                if (page === 1) {
                    setProducts(res.data.data);
                } else {
                    setProducts([...products, ...res.data.data]);
                }

                setNext(res.data.links.next);
            }

        }).finally(() => {
            mounted = false;
        });

    }, [slug, page]);


    const getProductsByCategory = async () => {

        return await axios.post(`${process.env.api_url}/filter/productByCategory?page=${page}`, {slug: slug}).then(res => res.data).catch(err => err);
    }


    const singleProduct = async (slug) => {
        let response = await axios.get(`${process.env.api_url}/products/${slug}`).then((result) => {
            return result.data;
        }).catch((error) => {
            return error;
        });

        if (response.success) {
            props.setModalProduct(response.data);
        }
    }

    return (
        <>
            <section className="product-block">
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-md-12">
                            <h3>Products for category: {slug}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">


                            <InfiniteScroll
                                dataLength={products.length}
                                next={() => {
                                    setPage(page + 1);
                                }}
                                loader={next && (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}
                                hasMore={true}
                                className="product-showcase-wrap">
                                {products.map((product, index) => (
                                        <SingleProduct product={product} key={index}/>
                                    )
                                )}
                            </InfiniteScroll>
                            {/*Juyel */}

                        </div>
                    </div>
                </div>
            </section>

            <ProductQuickView product={props.modalProduct}/>
        </>
    );
};

const mapStateToProps = (store) => {
    const {modalProduct} = store.productStore;
    return {modalProduct};
}


const mapDispatchToProps = (dispatch) => {

    return {
        setModalProduct: (modalProduct) => dispatch({type: SET_MODAL_PRODUCT, payload: {modalProduct}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)