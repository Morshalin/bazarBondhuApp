import React, {useState, useEffect} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {SET_PRODUCTS} from "../../../store/pos/actions/posProductActions";

const WarehouseSearch = (props) => {

    const api_url = process.env.mode === 'development' ? process.env.api_url_dev : process.env.api_url;

    const [warehouses, setWarehouses] = useState([]);

    const [selectedWarehouse, setSelectedWarehouse] = useState('');


    useEffect(() => { (async () => {
        await getAllWarehouses();
    })(); }, []);


    const getAllWarehouses = async () => {
        let response = await axios.get(`${api_url}/warehouses`)
            .then((result) => {
                return result.data;
            }).catch((error) => {
                return error;
            });

        if (response.success) {
            setWarehouses(response.data);
            // console.log(response.data);
        } else {
            // error logic
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        let warehouse = e.target.value;
        setSelectedWarehouse(warehouse);

        warehouse && getProductsByWarehouse(warehouse).then(response => {
            if (response.success) {
                props.setProducts(response.data);
            }
        }).catch(err => {
            console.log(err);
        })
    }


    const getProductsByWarehouse = async (slug) => {
        return await axios.get(`${api_url}/get-products-by-warehouse/${slug}`)
            .then((result) => {
                return result.data;
            }).catch((error) => {
                return error;
            });
    }


    return (
        <>
            <div className="col-lg-4">
                <div className="input-group">
                    <select
                        className="custom-select"
                        id="warehouse"
                        defaultValue={selectedWarehouse}
                        onChange={handleChange}
                        aria-label="Warehouse Select">
                        <option value="">Select Warehouse</option>
                        {
                            warehouses.length && warehouses.map((warehouse, index) => (
                                <option value={warehouse.slug} key={++index}>{warehouse.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProducts: (products) => dispatch({type: SET_PRODUCTS, payload: {products}})
    }
}

export default connect(null, mapDispatchToProps)(WarehouseSearch);