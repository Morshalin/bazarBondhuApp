import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTypeModal from './AddTypeModal';
import AddQuestionModal from './AddQuestionModal';
import EditTypeModal from './EditTypeModal';
import EditQuestionModal from './EditQuestionModal';


const Faq = () => {

    const [questions, setQuestions] = useState("");

    const [type, setType] = useState(['']);


    const handleDelete = async (option, id) => {
        console.log(id);

        const config = {
            headers: {
                'content-type': 'multipart/form-data;'
            }
        }
        const deleteForm = new FormData();
        deleteForm.append("_method", "DELETE");
        if (option === "question") {
            let response = await axios.post(`backend/faq/${id}`, deleteForm, config)
                .then((response) => response.data).catch(errors => errors);
            if (response.success) {
                window.location.reload();
            } else {
            }

        }
        if (option === "type") {
            let response = await axios.post(`backend/faq/type-delete/${id}`, deleteForm, config)
                .then((response) => response.data).catch(errors => errors);
            if (response.success) {
                window.location.reload();
            } else {
            }

        }



    }

    useEffect(() => {

        let mounted = true;
        fetchFaq().then((response) => {
            if (mounted) {
                setQuestions(response);
                // setMeta(response.meta);
                // setLoaded(true);
            }
        }).finally(() => {
            mounted = false;
        })
    }, []);

    const fetchFaq = async () => {

        let url = `backend/faq`;

        return await axios.get(url)
            .then((result) => result.data).catch((error) => error);
    }


    return (
        <>

            <section className="custom-card">
                <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        <div className="col-md-10">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title ml-4">
                                        <h2>
                                            FAQ
                                            <button
                                                className="btn btn-outline-primary m-2"
                                                data-toggle="modal"
                                                data-target="#add_type_modal">
                                                <i className="icon-plus-square-regular" />Add Section

                                            </button>
                                        </h2>
                                    </div>
                                </div>
                                <div className="custom-card-box-content">
                                    <div className="row m-4">
                                        <div className="col-lg-12">
                                            {
                                                questions && questions.map((question, index) => {
                                                    return (
                                                        <>
                                                            <h3 key={index} className="text-primary bg-warning p-2 rounded"><i className="icon-question-circle" />{question.type}

                                                                <button className="btn m-2"
                                                                    data-toggle="modal"
                                                                    data-target="#edit_type_modal"
                                                                    onClick={(event) => {
                                                                        event.preventDefault();
                                                                        setType(question)
                                                                        // handleDelete('type', question.id)
                                                                    }}

                                                                >
                                                                    <i className="icon-pencil-alt text-primary" />
                                                                </button>
                                                                
                                                                <button className="btn m-2"
                                                                    onClick={(event) => {
                                                                        event.preventDefault();
                                                                        handleDelete('type', question.id)
                                                                    }}

                                                                >
                                                                    <i className="icon-trash-alt-regular text-danger" />
                                                                </button>

                                                                <button className="btn btn-outline-primary"
                                                                    data-toggle="modal" data-target="#exampleModal"
                                                                    onClick={(event) => {
                                                                        event.preventDefault();
                                                                        setType(question)
                                                                    }}

                                                                >
                                                                    <i className="icon-plus-square-regular" /> Add question
                                                            </button></h3>
                                                            <br />
                                                            {
                                                                question.questions && question.questions.map((q, index) => {
                                                                    return (
                                                                        <>
                                                                            <h5 className="text-primary">
                                                                                {index + 1}.{q.questions}
                                                                                <button className="btn"
                                                                                    data-toggle="modal" data-target="#edit_question_modal"
                                                                                    onClick={(event) => {
                                                                                        event.preventDefault();
                                                                                        setType(q)
                                                                                        // handleDelete('question', q.id)
                                                                                    }}

                                                                                >
                                                                                    <i className="icon-pencil-alt text-primary" />
                                                                                </button>
                                                                                <button className="btn"
                                                                                    onClick={(event) => {
                                                                                        event.preventDefault();
                                                                                        handleDelete('question', q.id)
                                                                                    }}

                                                                                >
                                                                                    <i className="icon-trash-alt-regular text-danger" />
                                                                                </button>
                                                                                
                                                                            </h5>
                                                                            <p>
                                                                                <i className="icon-comments-alt mr-2" />{q.ans}
                                                                            </p>
                                                                        </>
                                                                    );

                                                                })
                                                            }
                                                            <br />
                                                        </>
                                                    );

                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <AddTypeModal />
                <AddQuestionModal type={type} />
                <EditTypeModal type={type}/>
                <EditQuestionModal type={type}/>

            </section>

        </>

    );
}


export default Faq;