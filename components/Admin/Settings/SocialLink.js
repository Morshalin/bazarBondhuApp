import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import SiteSettings from "./SiteSettings";

const SocialLink = (props) => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const {id} = router.query;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">

                        <div className="row">
                            <div className="col-sm-12">
                                <div
                                    className="table-responsive custom-table">
                                    <table
                                        className="table table-bordered table-hover">
                                        <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Social Site Name</th>
                                            <th scope="col">Social Site Profile Link</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr>
                                            <td className="text-center">
                                                <input
                                                    type="text"
                                                    title="Enter Social Site Name"
                                                    className=""
                                                    value=""
                                                    name="name"
                                                    onChange={(e) => {
                                                        e.preventDefault();

                                                    }}
                                                />

                                            </td>

                                            <td className="text-center">

                                                <input
                                                    type="text"
                                                    title="Enter Social Site Profile Link"
                                                    value=""
                                                    name="designation"
                                                    onChange={(e) => {
                                                        e.preventDefault();

                                                    }}
                                                />
                                            </td>

                                            <td className="text-center">

                                                <button
                                                    className="btn btn-danger mr-2"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                    }}>
                                                    <i className="fas fa-trash"/>
                                                </button>


                                                <button
                                                    className="btn btn-primary"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                    }}>
                                                    <i className="fas fa-plus"/>
                                                </button>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

    export default SocialLink;