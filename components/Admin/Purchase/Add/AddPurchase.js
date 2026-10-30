import React, {useEffect, useState} from 'react';
import SupplierProductSearch from "../Add/SupplierProductSearch";
import SubmitPurchase from "../Add/SubmitPurchase";
import PurchaseInfo from "./PurchaseInfo";
import ItemList from "../Add/ItemList";
import PurchaseCalculation from "./PurchaseCalculation";
import Link from "next/link";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {
    EDIT_PURCHASE_PRODUCTS,
    RESET_PURCHASE_DATA
} from "../../../../store/admin/actions/purchase/uPurchaseCartActions";
import {showActions} from "../../../../Helpers/Utils/Utils";

const AddPurchase = (props) => {

    const [isChecked, setIsChecked] = useState(false);

    const router = useRouter();

    const {id} = router.query;

    useEffect(() => {
        props.resetPurchaseData();

        let mounted = true;

        (mounted && id) && showActions(`backend/purchases/${id}`)
            .then((res) => {
                res.success && props.editPurchase(res.data);
            }).finally(() => mounted = false);
    }, [id]);


    return (
        <>
            <section className="custom-card add-purchase">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title">
                                        <i className="icon-plus-square-regular"/>
                                        <h2>{props.mode === "edit" ? 'Edit' : 'Add'} Purchase</h2>

                                        <Link legacyBehavior href={`/admin/purchase`}>
                                            <a className="fbh-btn" title="Purchase List">
                                                <i className="icon-list2"></i>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="fbh-info">
                                        <p>Please fill in the information below. The field labels marked with <span
                                            className="text-danger"> * </span> are
                                            required input fields.
                                        </p>
                                    </div>
                                </div>
                                <div className="custom-card-box-content">
                                    <div className="purchase-details shadow-sm">

                                        <PurchaseInfo/>

                                        <SupplierProductSearch/>

                                        <ItemList
                                            mode={props.mode}
                                            isChecked={isChecked}
                                            setIsChecked={setIsChecked}/>

                                        <PurchaseCalculation/>

                                        <SubmitPurchase
                                            mode={props.mode}
                                            id={id}
                                            isChecked={isChecked}
                                            setIsChecked={setIsChecked}/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetPurchaseData: () => dispatch({type: RESET_PURCHASE_DATA}),
        editPurchase: (purchase) => dispatch({type: EDIT_PURCHASE_PRODUCTS, payload: {purchase}})
    }
}

export default connect(null, mapDispatchToProps)(AddPurchase);