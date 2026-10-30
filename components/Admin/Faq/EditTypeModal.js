import React, {useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";


const EditTypeModal = (props) => {
    console.log('uzzal',props);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [typeData, setTypeData] = useState({
        type: '',
        sort_order: ''
    });

    const handleData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setTypeData({ ...typeData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let formData = new FormData();
        formData.append('type', typeData.type);
        formData.append('sort_order', typeData.sort_order);

        const config = {
            headers: {
                'content-type': 'multipart/form-data;'
            }
        }

        let response = await axios.post(`backend/faq/type-update/${props.type.id}`, formData, config)
            .then((response) => response.data).catch(errors => errors);

        if (response.success) {
            setLoading(false);
            hideModal();
            window.location.reload();
        } else {
            setError(response.message)
            setLoading(false);
        }

    }

    const hideModal = () => {
        $('#add_type_modal').modal('hide');
    }



    return (
        <>
            <div className="modal fade" id="edit_type_modal" tabIndex="-1"
                 aria-labelledby="signInModalLevel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="signInModalLevel">Edit Section</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">

                                <div className="col-12 mt-4">

                                    <form>

                                        <div className="form-group">

                                            <label
                                                className="sr-only"
                                                htmlFor="type">
                                                Type
                                            </label>

                                            <div className="input-group mb-4">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                    <i className="icon-question-circle" />
                                                    </div>
                                                </div>

                                                <input
                                                    type="text"
                                                    className={`form-control ${error ? error['type'] ? 'is-invalid' : '' : ''}`}
                                                    id="type"
                                                    name="type"
                                                    defaultValue={props.type.type}
                                                    onChange={handleData}
                                                    placeholder="section type"/>

                                                <div id="email"
                                                    className={error ? error['type'] ? `invalid-feedback` : 'd-none' : `d-none`}>
                                                    {error ? error['type'] ? error['type'][0] : '' : ''}
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                    <i className="icon-question-circle" />
                                                    </div>
                                                </div>

                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="serial"
                                                    name="serial"
                                                    onChange={handleData}
                                                    placeholder="serial"/>

                                            </div>
                                                {/* <div className="input-group m-4">
                                                    <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    defaultChecked={false}
                                                    name="promotional_active"
                                                    // onChange={handleProductData}
                                                    id="promotional_active"
                                                    />
                                                    <label
                                                    className="custom-control-label"
                                                    htmlFor="promotional_active"
                                                    >
                                                    Is Active
                                                    </label>
                                                </div> */}
                                            
                                        </div>

                                    </form>

                                </div>

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="btn btn-warning btn-lg btn-block">
                                {loading ? 'Please Wait' : 'Save'}
                                <i className={`mb-1 ml-2 ${loading ? 'spinner-border spinner-border-sm' : 'icon-sign-in-alt-solid'}`}/>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};


export default EditTypeModal;