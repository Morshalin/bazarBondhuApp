import React, { useState } from 'react';
import axios from "axios";




const EditQuestionModal = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    let [questionData, setQuestionData] = useState({
        question: '',
        ans: '',
        sort_order: ''
    });

    const handleData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setQuestionData({ ...questionData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let formData = new FormData();
        formData.append("_method", "PUT");
        formData.append('questions', questionData.question);
        formData.append('ans', questionData.ans);
        formData.append('sort_order', questionData.sort_order);

        const config = {
            headers: {
                'content-type': 'multipart/form-data;'
            }
        }

        let response = await axios.post(`backend/faq/${props.type.id}`, formData, config)
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
        $('#edit_question_modal').modal('hide');
    }


    return (
        <>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="edit_question_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-warning text-primary">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Question & Ans. {props.type.type}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Question:</label>
                                    <input
                                        onChange={handleData}
                                        name="question"
                                        defaultValue={props.type.questions}
                                        type="text" class="form-control" id="recipient-name"
                                        required
                                    />
                                    <span className="text-danger">{error['questions'] ? error['questions'][0] : ''}</span>
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Ans:</label>
                                    <textarea
                                        class="form-control" id="message-text"
                                        defaultValue={props.type.ans}
                                        onChange={handleData}
                                        name="ans">
                                    </textarea>
                                    <span className="text-danger">{error['ans'] ? error['ans'][0] : ''}</span>
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
                                        name="sort_order"
                                        onChange={handleData}
                                        placeholder="serial" />

                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                            <button
                                onClick={
                                    handleSubmit
                                }
                                type="button" class="btn btn-primary"
                            >
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


export default EditQuestionModal;