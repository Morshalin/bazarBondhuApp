import React from 'react';

const SaleActions = (props) => {
    return (
        <>
            <div className="dropdown action-btn-group">

                <button
                    className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id={`action_button_${props?.item?.id}`}>
                    Actions
                </button>

                <div className="dropdown-menu">
                    <button
                        className="dropdown-item"
                        onClick={(event) => {
                            event.preventDefault();
                            props.setErrors('');
                            $(`#saleReturnModal`).modal({show: true});
                        }}>
                        <i className="fas fa-undo-alt text-warning"/>
                        Sale Return
                    </button>
                </div>
            </div>
        </>
    );
};

export default SaleActions;
