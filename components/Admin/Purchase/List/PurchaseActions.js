import React from 'react';

const PurchaseActions = (props) => {
    return (
        <>
            <div className="dropdown action-btn-group">

                <button
                    className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id={`action_button_${props.item.id}`}>
                    Actions
                </button>

                <div className="dropdown-menu">
                    <button
                        className="dropdown-item"
                        onClick={(event) => {
                            event.preventDefault();
                            props.setPurchaseReturnType("Purchase Return");
                            props.setErrors('');
                            $(`#purchaseReturnModal`).modal({show: true});
                        }}>
                        <i className="fas fa-undo-alt text-warning"/>
                        Return Purchase
                    </button>

                    <button
                        className="dropdown-item"
                        onClick={(event) => {
                            event.preventDefault();
                            props.setPurchaseReturnType("Damage Product");
                            props.setErrors('');
                            $(`#purchaseReturnModal`).modal({show: true});
                        }}>
                        <i className="fas fa-minus-circle text-danger"/>
                        Damage Product
                    </button>

                    <button
                        className="dropdown-item"
                        onClick={(event) => {
                            event.preventDefault();
                            props.setPurchaseReturnType("Use or Gift");
                            props.setErrors('');
                            $(`#purchaseReturnModal`).modal({show: true});
                        }}>
                        <i className="fas fa-gift text-primary"/>
                        Use or Gift
                    </button>

                </div>
            </div>
        </>
    );
};

export default PurchaseActions;
