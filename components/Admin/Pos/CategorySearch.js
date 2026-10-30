import React, {useEffect, useState} from 'react';
import axios from "axios";
import {SET_PRODUCTS} from "../../../store/pos/actions/posProductActions";
import {connect} from "react-redux";
import Select from "react-select";

const CategorySearch = (props) => {

    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {

        let fetched = true;

        fetchCategories().then((res) => {

            if(fetched && res.success){
                let categoryFilterData = res.data.map(({ id, name }) => {
                    return {
                        value: id,
                        label: name,
                    };
                });
                setCategories(categoryFilterData);
            }

        }).finally(() => {
            fetched = false;
            setIsLoading(!isLoading);
            setIsDisabled(!isDisabled)
        });

    }, []);


    const fetchCategories = async () => {
        return axios.get(`backend/categories`).then(res => res.data).catch(err => err);
    }


    const handleChange = (category) => {

        setSelectedCategory(category);

        category && getProductsByCategory(category)
            .then((res) => {
                res.success && props.setProducts(res.data);
            });
    }


    const getProductsByCategory = async (category_id) => {

        return await axios.post(`backend/get-product-bycatagory`, {category_id: category_id})
            .then(res => res.data).catch(err => err);
    }

    return (
        <>
            <div className="col-lg-6">

                <Select
                    instanceId="category"
                    placeholder={"Select Category"}
                    DefaultValue={selectedCategory}
                    isClearable={false}
                    onChange={(selectedOption) => {
                        handleChange(selectedOption.value)
                    }}
                    options={categories}
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

export default connect(null, mapDispatchToProps)(CategorySearch);