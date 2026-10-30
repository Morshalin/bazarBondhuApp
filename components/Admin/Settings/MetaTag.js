import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Success from "../Notification/Success";
import Error from "../Notification/Error";
import {connect} from "react-redux";

import {ERROR, getActions, saveFileAction, SUCCESS, updateFileAction} from "../../../Helpers/Utils/Utils";
import {useRouter} from "next/router";

const MetaTag = (props) => {

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const {id} = router.query;

    return (
        <>
            <section className="custom-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title">
                                        <i className="fas fa-code"></i>
                                        <h2>Meta Tags</h2>
                                    </div>
                                    <div className="fbh-info">
                                        <p>Please fill in the information below.
                                            The field labels marked with
                                            <span className="text-danger"> * </span>
                                            are required input fields.</p>
                                    </div>
                                </div>

                                <div className="custom-card-box-content">

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <form>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <fieldset disabled={loading}>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="phone">
                                                                                    Meta Tag Keyword
                                                                                </label>

                                                                                <textarea id="w3review" name="w3review" className={`form-control`} rows="4" cols="50">
                                                                                                </textarea>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="phone">
                                                                                    Meta Title
                                                                                </label>

                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="phone"
                                                                                    className={`form-control`}
                                                                                    id="phone"
                                                                                    name="phone"
                                                                                    placeholder="Meta Title"
                                                                                    value=""/>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="phone">
                                                                                    Open Graph Type (OG Type)
                                                                                </label>

                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="phone"
                                                                                    className={`form-control`}
                                                                                    id="phone"
                                                                                    name="phone"
                                                                                    placeholder="OG Type"
                                                                                    value=""/>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="phone">
                                                                                    Open Graph Image Width (OG Image Width)
                                                                                </label>

                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="phone"
                                                                                    className={`form-control`}
                                                                                    id="phone"
                                                                                    name="phone"
                                                                                    placeholder="OG Image Width"
                                                                                    value=""/>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="phone">
                                                                                    Open Graph Image Height (OG Image Height)
                                                                                </label>

                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="phone"
                                                                                    className={`form-control`}
                                                                                    id="phone"
                                                                                    name="phone"
                                                                                    placeholder="OG Image Height"
                                                                                    value=""/>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="phone">
                                                                                    Open Graph Description (OG Description)
                                                                                </label>

                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="phone"
                                                                                    className={`form-control`}
                                                                                    id="phone"
                                                                                    name="phone"
                                                                                    placeholder="OG Description"
                                                                                    value=""/>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="phone">
                                                                                    Open Graph Site Name (OG Site Name)
                                                                                </label>

                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="phone"
                                                                                    className={`form-control`}
                                                                                    id="phone"
                                                                                    name="phone"
                                                                                    placeholder="OG Site Name"
                                                                                    value=""/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-6">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="phone">
                                                                                    Meta Tag Description
                                                                                </label>

                                                                                <textarea id="w3review" name="w3review" className={`form-control`} rows="4" cols="50">
                                                                                </textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="phone">
                                                                                    Open Graph Title (OG Title)
                                                                                </label>

                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="phone"
                                                                                    className={`form-control`}
                                                                                    id="phone"
                                                                                    name="phone"
                                                                                    placeholder="OG Title"
                                                                                    value=""/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="phone">
                                                                                    Open Graph URL (OG URL)
                                                                                </label>

                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="phone"
                                                                                    className={`form-control`}
                                                                                    id="phone"
                                                                                    name="phone"
                                                                                    placeholder="OG URL"
                                                                                    value=""/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12">
                                                                            <div className="card mb-3">

                                                                                <div className="card-header">
                                                                                    <div className="fbh-title">
                                                                                        <h6>Open Graph Image (OG Image)</h6>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="card-body">
                                                                                    <div className="form-group mt-1">
                                                                                        <div className="custom-file">

                                                                                            <input
                                                                                                type="file"
                                                                                                onChange={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    props.changeAvatarImage(e.target.files[0]);
                                                                                                }}

                                                                                                name={`avatar`}
                                                                                                id="avatar"
                                                                                            />

                                                                                            <label
                                                                                                id="profile_image"
                                                                                                className="custom-file-label cfl-left-align"
                                                                                                htmlFor="avatar">
                                                                                                Choose Image
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="container border"
                                                                                         style={{height: '180px'}}>
                                                                                    </div>

                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-6">
                                                                    <div className="row">

                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 offset-lg-6 text-right">
                                                                    <div className="form-group">

                                                                        <Link legacyBehavior href={'/admin/settings'}>
                                                                            <a className="btn btn-info mr-2">
                                                                                <i className="icon-arrow-left-solid mr-1 mr-1"/>
                                                                                Back
                                                                            </a>
                                                                        </Link>

                                                                        <button
                                                                            type="submit"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                            }}
                                                                            className="btn btn-danger mr-2">
                                                                            <i className="icon-reset mr-1"/>
                                                                            Reset
                                                                        </button>

                                                                        <button
                                                                            type="submit"
                                                                            className={`btn btn-success ${loading ? 'disabled' : ''}`}>
                                                                            <i className={loading ? `spinner-border spinner-border-sm mr-1` : `icon-save-regular mr-1`}/>
                                                                            {loading ? `Saving..` : `Save`}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}

export default MetaTag;