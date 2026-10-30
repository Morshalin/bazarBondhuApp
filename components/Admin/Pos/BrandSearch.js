import React, {useEffect, useState} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {SET_PRODUCTS} from "../../../store/pos/actions/posProductActions";
import Select from "react-select";

const BrandSearch = (props) => {

    const [brands, setBrands] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {

        let fetched = true;

        fetchBrands().then((res) => {
            if (fetched && res.success) {
                let brandFilterData = res.data.map(({ id, name }) => {
                    return {
                        value: id,
                        label: name,
                    };
                });
                setBrands(brandFilterData);
            }
        }).finally(() => {
            fetched = false;
            setIsLoading(!isLoading);
            setIsDisabled(!isDisabled)
        });

    }, [])


    const fetchBrands = async () => {

        return axios.get(`backend/brands`).then(res => res.data).catch(err => err);

    }

    const handleChange = async (brand_id) => {
        setSelectedBrand(brand_id);

        brand_id && getProductsByBrand(brand_id).then((res) => {
            res.success && props.setProducts(res.data);
        });
    }

    const getProductsByBrand = async (brand_id) => {
        return await axios.post(`backend/get-product-bybrand/`, {brand_id: brand_id})
            .then(res => res.data).catch(err => err);
    }


    return (
        <>
            <div className="col-lg-6">
                <Select
                    placeholder={"Select Brand"}
                    instanceId="brand"
                    DefaultValue={selectedBrand}
                    onChange={(selectedOption) => {
                        handleChange(selectedOption.value)
                    }}
                    options={brands}
                    autoFocus={false}
                    isClearable={false}
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                />
            </div>
        </>
    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        setProducts: (products) => dispatch({type: SET_PRODUCTS, payload: {products}}),
    }
}

export default connect(null, mapDispatchToProps)(BrandSearch);