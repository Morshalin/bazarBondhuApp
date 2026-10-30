import React from 'react';
import {connect} from "react-redux";
import {
    SET_PURCHASE_ITEM,
    SET_PURCHASE_RETURN_ERRORS,
    SET_PURCHASE_RETURN_TYPE
} from "../../../../store/admin/actions/purchase/purchaseListAction";
import PurchaseActions from "./PurchaseActions";
import PurchaseReturnModal from "./PurchaseReturnModal";
import Link from 'next/link'

const PurchaseDetails = (props) => {

    let grandTotal = props?.purchaseListStore?.purchase?.product_purchases?.reduce((sum, {sub_total}) => sum += parseFloat(sub_total), 0);

    return (
        <>
            {/*<div className="custom-card-box mb-3">*/}
            {/*    <div className="custom-card-box-header border-bottom-0">*/}
            {/*        <div className="row">*/}
            {/*            <div className="col-lg-12">*/}
            {/*                <ul className="nav global-nav">*/}
            {/*                    <li className="nav-item">*/}
            {/*                        <Link href={`/admin/purchase/edit/${props.purchaseListStore.purchase.id}`}>*/}
            {/*                            <a className="nav-link">*/}
            {/*                                <i className="icon-edit-solid mr-1"></i>*/}
            {/*                                <span>Edit Purchase</span>*/}
            {/*                            </a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                </ul>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="custom-card-box mb-3">
                <div className="custom-card-box-header">
                    <div className="fbh-title ">
                        <i className="icon-eye-regular"/>
                        <h2>Purchase Details <span>#{props.purchaseListStore.purchase.invoice_number}</span></h2>
                    </div>
                </div>
                <div className="custom-card-box-content p-md-3 p-2">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-responsive custom-table custom-hight-320">
                                <table className="table table-bordered table-hover mb-3 table-order-details">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">SL</th>
                                        <th scope="col">Img</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Qty.</th>
                                        <th scope="col">Purchase Price</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        ((props.purchaseListStore.purchase)
                                            && (props.purchaseListStore.purchase.product_purchases)
                                            && (props.purchaseListStore.purchase.product_purchases.length > 0))
                                            ? (props.purchaseListStore.purchase.product_purchases.map((item, index) =>
                                                (
                                                    <tr
                                                        key={item.id}
                                                        className={`text-center ${(props.purchaseListStore.purchaseItem && props.purchaseListStore.purchaseItem.product_purchase_id === item.id) && `bg-selected`}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            props.setPurchaseItem(item);
                                                        }}>
                                                        <td scope="row">
                                                            {++index}
                                                        </td>

                                                        <td className="text-center">
                                                            <img src={item?.product?.feature_image} alt="Product Img"/>
                                                        </td>
                                                        <td className="text-center">
                                                            <h6 className="text-875 mb-1">{item?.product?.name}</h6>
                                                        </td>
                                                        <td className="text-center text-nowrap">
                                                            {item.purchase_quantity}
                                                        </td>
                                                        <td className="text-center text-nowrap">
                                                            ৳ {item.net_unit_cost}
                                                        </td>
                                                        <td className="text-center text-nowrap">
                                                            ৳ {item.sub_total}
                                                        </td>

                                                        <td className="text-center text-nowrap">
                                                            <PurchaseActions
                                                                item={item}
                                                                setPurchaseReturnType={props.setPurchaseReturnType}
                                                                setErrors={props.setPurchaseReturnErrors}
                                                            />
                                                        </td>

                                                    </tr>
                                                )
                                            )) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center">No Purchase Details Found</td>
                                                </tr>
                                            )
                                    }
                                    {
                                        grandTotal && (
                                            <tr>
                                                <td colSpan="5" className="text-center font-weight-bold">
                                                    Grand Total
                                                </td>
                                                <td colSpan="2" className="text-left font-weight-bold">
                                                    ৳ {grandTotal}
                                                </td>
                                            </tr>
                                        )

                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PurchaseReturnModal/>

        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPurchaseItem: (purchaseItem) => dispatch({type: SET_PURCHASE_ITEM, payload: {purchaseItem}}),
        setPurchaseReturnType: (return_type) => dispatch({type: SET_PURCHASE_RETURN_TYPE, payload: {return_type}}),
        setPurchaseReturnErrors: (errors) => dispatch({type: SET_PURCHASE_RETURN_ERRORS, payload: {errors}}),
    }
}


const mapStateToProps = (store) => {
    let {purchaseListStore} = store;
    return {purchaseListStore}

}


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseDetails);
