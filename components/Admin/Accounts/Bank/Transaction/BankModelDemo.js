import React from "react";

const BankModelDemo = (props) => {
    return (
        <>
            <div className="modal fade" id="singleSupplierModal" tabIndex="-1"
                 aria-labelledby="singleSupplierModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="singleSupplierModalLabel">Supplier</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped table-hover">
                                            <tbody>

                                            <tr className="text-center">
                                                <td colSpan="3">
                                                    <h4>Basic Information</h4>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Name</td>
                                                {/*<td colSpan="2">{props.supplier.name ?? '-'}</td>*/}
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                {/*<td colSpan="2">{props.supplier.address ?? '-'}</td>*/}
                                            </tr>
                                            <tr>
                                                <td>Telephone Number</td>
                                                {/*<td colSpan="2">{props.supplier.telephone_number ?? '-'}</td>*/}
                                            </tr>
                                            <tr>
                                                <td>Mobile Number</td>
                                                {/*<td colSpan="2">{props.supplier.mobile_number}</td>*/}
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                {/*<td colSpan="2">{props.supplier.email ?? '-'}</td>*/}
                                            </tr>

                                            <tr>
                                                <td>Supplier Products</td>
                                                {/*<td colSpan="2">{props.supplier.products ?? '-'}</td>*/}
                                            </tr>

                                            <tr>
                                                <td>Web</td>
                                                {/*<td colSpan="2">{props.supplier.web ?? '-'}</td>*/}
                                            </tr>

                                            <tr className="text-center">
                                                <td colSpan="3">
                                                    <h4>Contact Information</h4>
                                                </td>
                                            </tr>

                                            {/*
                                                (props.supplier.contacts && props.supplier.contacts.length > 0)
                                                && props.supplier.contacts.map((contact) => {
                                                    return (contact.name && contact.mobile) && (
                                                        <tr key={contact.id}>
                                                            <td>{contact.name ?? '-'}</td>
                                                            <td>{contact.designation ?? '-'}</td>
                                                            <td>{contact.mobile ?? '-'}</td>
                                                        </tr>
                                                    )
                                                })
                                            */}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            {/*<button*/}
                            {/*    onClick={(e) => {*/}
                            {/*        e.preventDefault();*/}
                            {/*        // Set Supplier Data to supplierData for update supplier inside*/}
                            {/*        props.editSupplier(props.supplier);*/}

                            {/*        // Add Supplier Id for edit*/}
                            {/*        props.setSupplierId(props.supplier.id);*/}
                            {/*        $(`#add_supplier_modal`).modal({show: true});*/}
                            {/*        $('#singleSupplierModal').modal('hide');*/}

                            {/*    }}*/}
                            {/*    type="button"*/}
                            {/*    className={`btn btn-primary ${!props.formPurchase ? `d-none` : ``}`}>*/}
                            {/*    Edit*/}
                            {/*</button>*/}
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BankModelDemo;